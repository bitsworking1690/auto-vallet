import { NextRequest, NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'
import { BASE_SERVICE_PRICE_CENTS } from '@/lib/validations'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function coerceFormData(raw: Record<string, FormDataEntryValue>): Record<string, unknown> {
  return {
    firstName:        raw.firstName,
    lastName:         raw.lastName,
    phone:            raw.phone,
    pickupZip:        raw.pickupZip,
    dropoffZip:       raw.dropoffZip,
    vehicleMakeModel: raw.vehicleMakeModel,
    serviceType:      raw.serviceType,
    pickupDate:       raw.pickupDate,
    timeSlot:         raw.timeSlot,
    preferredShop:    raw.preferredShop   || undefined,
    notes:            raw.notes           || undefined,
    addTip:           raw.addTip === 'true',
    tipAmount:        raw.tipAmount !== undefined && raw.tipAmount !== '' ? Number(raw.tipAmount) : undefined,
    agreedToTerms:    raw.agreedToTerms === 'true' ? true : raw.agreedToTerms,
  }
}

const TIME_SLOT_LABELS: Record<string, string> = {
  morning:   '8:00 AM – 12:00 PM',
  afternoon: '1:00 PM – 4:00 PM',
}

const SERVICE_LABELS: Record<string, string> = {
  maintenance: 'Routine Maintenance',
  dealership:  'Dealership Visit',
  recall:      'Recall Service',
  other:       'Other',
}

// ─── Insurance doc upload ─────────────────────────────────────────────────────

async function uploadInsuranceDoc(file: File, bookingRef: string): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  try {
    const { supabaseAdmin } = await import('@/lib/supabase')
    const ext    = file.name.split('.').pop() ?? 'bin'
    const path   = `insurance/${bookingRef}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error } = await supabaseAdmin()
      .storage.from('booking-docs')
      .upload(path, buffer, { contentType: file.type, upsert: true })

    if (error) { console.error('[AutoValet] Storage upload error:', error.message); return null }

    const { data } = supabaseAdmin().storage.from('booking-docs').getPublicUrl(path)
    return data.publicUrl
  } catch (err) {
    console.error('[AutoValet] uploadInsuranceDoc:', err)
    return null
  }
}

// ─── Save booking to Supabase ─────────────────────────────────────────────────

async function saveToSupabase(
  payload: Record<string, unknown>,
  insuranceUrl: string | null,
  stripeSessionId: string
) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[AutoValet] Supabase not configured – skipping DB save')
    return { id: `local-${Date.now()}` }
  }

  const { supabaseAdmin } = await import('@/lib/supabase')

  const { data, error } = await supabaseAdmin()
    .from('bookings')
    .insert({
      first_name:         payload.firstName,
      last_name:          payload.lastName,
      phone:              payload.phone,
      pickup_zip:         payload.pickupZip,
      dropoff_zip:        payload.dropoffZip,
      vehicle_make_model: payload.vehicleMakeModel,
      service_type:       payload.serviceType,
      pickup_date:        payload.pickupDate,
      time_slot:          payload.timeSlot,
      preferred_shop:     payload.preferredShop ?? null,
      notes:              payload.notes ?? null,
      tip_amount:         payload.addTip ? (payload.tipAmount ?? null) : null,
      agreed_to_terms:    true,
      insurance_doc_url:  insuranceUrl,
      stripe_session_id:  stripeSessionId,
      status:             'awaiting_payment',
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── Create Stripe Checkout session ──────────────────────────────────────────

async function createStripeSession(
  payload: Record<string, unknown>,
  bookingId: string
): Promise<string> {
  if (!process.env.STRIPE_SECRET_KEY) {
    // Dev fallback: return a mock URL so the flow doesn't hard-fail locally
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    console.warn('[AutoValet] STRIPE_SECRET_KEY not set – returning mock checkout URL')
    return `${siteUrl}/booking/success?session_id=dev_mock_${bookingId}`
  }

  const Stripe         = (await import('stripe')).default
  const stripe         = new Stripe(process.env.STRIPE_SECRET_KEY)
  const siteUrl        = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const tipCents       = payload.addTip && payload.tipAmount
    ? Math.round(Number(payload.tipAmount) * 100)
    : 0

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineItems: any[] = [
    {
      price_data: {
        currency:     'usd',
        product_data: {
          name:        'AutoValet Concierge Service',
          description: `${SERVICE_LABELS[payload.serviceType as string] ?? payload.serviceType} · ${payload.vehicleMakeModel} · ${payload.pickupDate} ${TIME_SLOT_LABELS[payload.timeSlot as string] ?? payload.timeSlot}`,
          images:      [],
        },
        unit_amount: BASE_SERVICE_PRICE_CENTS,
      },
      quantity: 1,
    },
  ]

  // Add tip as a separate line item if provided
  if (tipCents > 0) {
    lineItems.push({
      price_data: {
        currency:     'usd',
        product_data: {
          name:        'Driver Tip',
          description: '100% goes to your driver',
        },
        unit_amount: tipCents,
      },
      quantity: 1,
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:           lineItems,
    mode:                 'payment',
    success_url:          `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:           `${siteUrl}/booking/cancelled?booking_id=${bookingId}`,
    customer_email:       undefined, // no email collected – can add later
    metadata: {
      booking_id:         bookingId,
      customer_name:      `${payload.firstName} ${payload.lastName}`,
      customer_phone:     String(payload.phone),
      vehicle:            String(payload.vehicleMakeModel),
      service_type:       String(payload.serviceType),
      pickup_date:        String(payload.pickupDate),
      time_slot:          String(payload.timeSlot),
      pickup_zip:         String(payload.pickupZip),
      dropoff_zip:        String(payload.dropoffZip),
    },
    phone_number_collection: { enabled: false },
    billing_address_collection: 'auto',
  })

  return session.url!
}

// ─── Send notification email ──────────────────────────────────────────────────

async function sendAdminNotification(payload: Record<string, unknown>, bookingId: string) {
  if (!process.env.RESEND_API_KEY) return
  try {
    const { Resend } = await import('resend')
    const resend     = new Resend(process.env.RESEND_API_KEY)
    const fromEmail  = process.env.RESEND_FROM_EMAIL  || 'bookings@autovalet.com'
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'admin@autovalet.com'

    await resend.emails.send({
      from:    fromEmail,
      to:      adminEmail,
      subject: `[AutoValet] New Booking #${bookingId.slice(-8).toUpperCase()} – ${payload.firstName} ${payload.lastName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Customer:</strong> ${payload.firstName} ${payload.lastName}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>Vehicle:</strong> ${payload.vehicleMakeModel}</p>
        <p><strong>Service:</strong> ${SERVICE_LABELS[payload.serviceType as string] ?? payload.serviceType}</p>
        <p><strong>Date:</strong> ${payload.pickupDate}</p>
        <p><strong>Time:</strong> ${TIME_SLOT_LABELS[payload.timeSlot as string] ?? payload.timeSlot}</p>
        <p><strong>Pickup ZIP:</strong> ${payload.pickupZip}</p>
        <p><strong>Drop-off ZIP:</strong> ${payload.dropoffZip}</p>
        ${payload.preferredShop ? `<p><strong>Shop:</strong> ${payload.preferredShop}</p>` : ''}
        ${payload.notes ? `<p><strong>Notes:</strong> ${payload.notes}</p>` : ''}
        <p><strong>Tip:</strong> ${payload.addTip && payload.tipAmount ? `$${payload.tipAmount}` : 'None'}</p>
        <p><strong>Status:</strong> Awaiting Stripe payment</p>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
      `,
    })
  } catch (err) {
    console.error('[AutoValet] Admin email error:', err)
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Collect scalar fields
    const rawFields: Record<string, FormDataEntryValue> = {}
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (!(value instanceof File)) rawFields[key] = value
    })

    // Validate
    const parsed = bookingSchema.safeParse(coerceFormData(rawFields))
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const bookingRef = `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    // Create Stripe session FIRST (fail fast before writing to DB)
    const checkoutUrl = await createStripeSession(
      parsed.data as unknown as Record<string, unknown>,
      bookingRef
    )

    // Upload insurance doc (best-effort)
    const insuranceDoc = formData.get('insuranceDoc')
    const insuranceUrl = insuranceDoc instanceof File && insuranceDoc.size > 0
      ? await uploadInsuranceDoc(insuranceDoc, bookingRef)
      : null

    // Extract Stripe session ID from URL
    const stripeSessionId = checkoutUrl.includes('cs_')
      ? checkoutUrl.split('cs_')[1]?.split('?')[0] ?? bookingRef
      : bookingRef

    // Save booking to DB
    const booking = await saveToSupabase(
      parsed.data as unknown as Record<string, unknown>,
      insuranceUrl,
      stripeSessionId
    )

    // Admin notification (best-effort)
    sendAdminNotification(
      parsed.data as unknown as Record<string, unknown>,
      booking.id ?? bookingRef
    ).catch(console.error)

    return NextResponse.json({ success: true, bookingId: booking.id ?? bookingRef, checkoutUrl }, { status: 201 })
  } catch (err) {
    console.error('[AutoValet] Booking error:', err)
    return NextResponse.json(
      { error: 'Unable to process your booking. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}

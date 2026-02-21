import { NextRequest, NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'

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
    preferredShop:    raw.preferredShop   || undefined,
    notes:            raw.notes           || undefined,
    tipAmount:        raw.tipAmount !== undefined && raw.tipAmount !== '' ? Number(raw.tipAmount) : undefined,
    paymentMethod:    raw.paymentMethod,
    agreedToTerms:    raw.agreedToTerms === 'true' ? true : raw.agreedToTerms,
  }
}

// ─── Insurance doc upload (Supabase Storage) ─────────────────────────────────

async function uploadInsuranceDoc(file: File, bookingRef: string): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null

  try {
    const { supabaseAdmin } = await import('@/lib/supabase')
    const ext      = file.name.split('.').pop() ?? 'bin'
    const path     = `insurance/${bookingRef}.${ext}`
    const buffer   = Buffer.from(await file.arrayBuffer())

    const { error } = await supabaseAdmin()
      .storage
      .from('booking-docs')
      .upload(path, buffer, { contentType: file.type, upsert: true })

    if (error) {
      console.error('[AutoValet] Storage upload error:', error.message)
      return null
    }

    const { data } = supabaseAdmin().storage.from('booking-docs').getPublicUrl(path)
    return data.publicUrl
  } catch (err) {
    console.error('[AutoValet] uploadInsuranceDoc:', err)
    return null
  }
}

// ─── Save to Supabase ─────────────────────────────────────────────────────────

async function saveToSupabase(payload: Record<string, unknown>, insuranceUrl: string | null) {
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
      preferred_shop:     payload.preferredShop ?? null,
      notes:              payload.notes ?? null,
      tip_amount:         payload.tipAmount ?? null,
      payment_method:     payload.paymentMethod,
      agreed_to_terms:    true,
      insurance_doc_url:  insuranceUrl,
      status:             'pending',
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return data
}

// ─── Send confirmation email via Resend ──────────────────────────────────────

async function sendConfirmationEmail(payload: Record<string, unknown>, bookingId: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[AutoValet] RESEND_API_KEY not set – skipping email')
    return
  }

  const { Resend } = await import('resend')
  const resend     = new Resend(process.env.RESEND_API_KEY)

  const customerName  = `${payload.firstName} ${payload.lastName}`
  const fromEmail     = process.env.RESEND_FROM_EMAIL  || 'bookings@autovalet.com'
  const adminEmail    = process.env.RESEND_ADMIN_EMAIL || 'admin@autovalet.com'

  const serviceLabels: Record<string, string> = {
    maintenance: 'Routine Maintenance',
    dealership:  'Dealership Visit',
    recall:      'Recall Service',
    other:       'Other',
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: system-ui, sans-serif; background: #f9fafb; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #0e96e7 0%, #0260a0 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">AutoValet</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Concierge Car Service · Sacramento, CA</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: #171717; font-size: 20px; margin: 0 0 8px;">Booking Confirmed ✓</h2>
      <p style="color: #525252; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        Hi ${customerName}, we've received your booking and will confirm details by SMS within <strong>15 minutes</strong>.
      </p>

      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #737373; font-size: 13px; width: 45%;">Booking ID</td><td style="padding: 6px 0; color: #171717; font-size: 13px; font-weight: 600;">#${bookingId.slice(-8).toUpperCase()}</td></tr>
          <tr><td style="padding: 6px 0; color: #737373; font-size: 13px;">Vehicle</td><td style="padding: 6px 0; color: #171717; font-size: 13px;">${payload.vehicleMakeModel}</td></tr>
          <tr><td style="padding: 6px 0; color: #737373; font-size: 13px;">Service</td><td style="padding: 6px 0; color: #171717; font-size: 13px;">${serviceLabels[payload.serviceType as string] ?? payload.serviceType}</td></tr>
          <tr><td style="padding: 6px 0; color: #737373; font-size: 13px;">Pickup ZIP</td><td style="padding: 6px 0; color: #171717; font-size: 13px;">${payload.pickupZip}</td></tr>
          <tr><td style="padding: 6px 0; color: #737373; font-size: 13px;">Drop-off ZIP</td><td style="padding: 6px 0; color: #171717; font-size: 13px;">${payload.dropoffZip}</td></tr>
          ${payload.preferredShop ? `<tr><td style="padding: 6px 0; color: #737373; font-size: 13px;">Preferred Shop</td><td style="padding: 6px 0; color: #171717; font-size: 13px;">${payload.preferredShop}</td></tr>` : ''}
        </table>
      </div>

      <div style="background: #f0f7ff; border-left: 3px solid #0e96e7; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #0260a0; font-size: 13px; line-height: 1.5;">
          <strong>What happens next:</strong> Our team will review your booking and send an SMS confirmation to <strong>${payload.phone}</strong> within 15 minutes. We'll coordinate pickup time from there.
        </p>
      </div>

      <p style="color: #737373; font-size: 13px; margin: 0;">
        Questions? Call or text us at <a href="tel:+19165550100" style="color: #0278c5;">(916) 555-0100</a>
      </p>
    </div>
    <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e5e5;">
      <p style="margin: 0; color: #a3a3a3; font-size: 12px;">AutoValet · Sacramento, CA · Fully insured & bonded</p>
    </div>
  </div>
</body>
</html>`

  await Promise.allSettled([
    // Customer confirmation
    resend.emails.send({
      from:    fromEmail,
      to:      `${customerName} <${payload.phone}@placeholder.com>`,  // replace with real email if collected
      subject: `AutoValet – Booking Received #${bookingId.slice(-8).toUpperCase()}`,
      html,
    }),
    // Internal admin notification
    resend.emails.send({
      from:    fromEmail,
      to:      adminEmail,
      subject: `[AutoValet] New Booking from ${customerName} – ${payload.vehicleMakeModel}`,
      html,
    }),
  ])
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

    // Upload insurance doc (best-effort)
    const insuranceDoc  = formData.get('insuranceDoc')
    const insuranceUrl  = insuranceDoc instanceof File && insuranceDoc.size > 0
      ? await uploadInsuranceDoc(insuranceDoc, bookingRef)
      : null

    // Save to DB
    const booking = await saveToSupabase(parsed.data as unknown as Record<string, unknown>, insuranceUrl)

    // Send email (best-effort – never fail the request over email)
    sendConfirmationEmail(parsed.data as unknown as Record<string, unknown>, booking.id ?? bookingRef).catch((err) =>
      console.error('[AutoValet] Email error:', err)
    )

    return NextResponse.json({ success: true, bookingId: booking.id ?? bookingRef }, { status: 201 })
  } catch (err) {
    console.error('[AutoValet] Booking error:', err)
    return NextResponse.json(
      { error: 'Unable to process booking. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}

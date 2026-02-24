'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormValues, TIME_SLOTS, BASE_SERVICE_PRICE_CENTS } from '@/lib/validations'
import { CheckCircle2, Upload, X, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import DatePicker from './DatePicker'

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  { value: 'maintenance', label: 'Routine Maintenance' },
  { value: 'dealership',  label: 'Dealership Visit'   },
  { value: 'recall',      label: 'Recall Service'     },
  { value: 'other',       label: 'Other'              },
]

const TIP_PRESETS = [5, 10, 20]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

function Divider() {
  return <div className="border-t border-neutral-100" />
}

// ─── Price summary shown above CTA ───────────────────────────────────────────

function PriceSummary({ tipAmount, addTip }: { tipAmount?: number; addTip?: boolean }) {
  const base  = BASE_SERVICE_PRICE_CENTS / 100
  const tip   = addTip && tipAmount ? tipAmount : 0
  const total = base + tip

  return (
    <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5 space-y-2.5">
      <div className="flex justify-between text-sm text-neutral-600">
        <span>Concierge service fee</span>
        <span className="font-medium text-neutral-900">${base.toFixed(2)}</span>
      </div>
      {tip > 0 && (
        <div className="flex justify-between text-sm text-neutral-600">
          <span>Driver tip</span>
          <span className="font-medium text-neutral-900">${tip.toFixed(2)}</span>
        </div>
      )}
      <div className="border-t border-neutral-200 pt-2.5 flex justify-between text-base font-bold text-neutral-900">
        <span>Total due today</span>
        <span className="text-brand-600">${total.toFixed(2)}</span>
      </div>
      <p className="text-[11px] text-neutral-400 leading-relaxed">
        Charged via Stripe after booking confirmation. No charge if we can&apos;t serve your area.
      </p>
    </div>
  )
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [serverError,   setServerError]   = useState<string | null>(null)
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null)
  const [customTip,     setCustomTip]     = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { addTip: false, tipAmount: 0 },
  })

  const addTip     = watch('addTip')
  const tipAmount  = watch('tipAmount')
  const pickupDate = watch('pickupDate')
  const timeSlot   = watch('timeSlot')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setInsuranceFile(file)
  }

  const removeFile = () => {
    setInsuranceFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  // On submit: save booking → get Stripe checkout URL → redirect
  const onSubmit = async (data: BookingFormValues) => {
    setServerError(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v))
      })
      if (insuranceFile) formData.append('insuranceDoc', insuranceFile)

      const res  = await fetch('/api/booking', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')

      // Redirect to Stripe Checkout
      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl
      } else {
        throw new Error('Payment session could not be created. Please call us directly.')
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to submit booking. Please try again.')
    }
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">Ready when you are</p>
          <h2 className="section-heading mb-3">Book Your Pickup</h2>
          <p className="section-subheading">No account needed. Takes under 60 seconds.</p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-card overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 sm:p-8 space-y-7">

            {/* ── 1. Your Details ───────────────────────────── */}
            <FormSection title="Your Details">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="input-label">First Name</label>
                  <input
                    id="firstName" type="text" autoComplete="given-name" placeholder="Jane"
                    className={clsx('input-field', errors.firstName && 'border-red-400 focus:ring-red-100')}
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="input-error">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="input-label">Last Name</label>
                  <input
                    id="lastName" type="text" autoComplete="family-name" placeholder="Smith"
                    className={clsx('input-field', errors.lastName && 'border-red-400 focus:ring-red-100')}
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="input-error">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="input-label">Phone Number</label>
                <input
                  id="phone" type="tel" autoComplete="tel" placeholder="(916) 555-0100"
                  className={clsx('input-field', errors.phone && 'border-red-400 focus:ring-red-100')}
                  {...register('phone')}
                />
                {errors.phone && <p className="input-error">{errors.phone.message}</p>}
                <p className="text-xs text-neutral-400 mt-1.5">We&apos;ll send booking updates by SMS.</p>
              </div>
            </FormSection>

            <Divider />

            {/* ── 2. Pickup & Drop-Off ──────────────────────── */}
            <FormSection title="Pickup & Drop-Off">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupZip" className="input-label">Pickup ZIP Code</label>
                  <input
                    id="pickupZip" type="text" inputMode="numeric" maxLength={5} placeholder="95814"
                    className={clsx('input-field', errors.pickupZip && 'border-red-400 focus:ring-red-100')}
                    {...register('pickupZip')}
                  />
                  {errors.pickupZip && <p className="input-error">{errors.pickupZip.message}</p>}
                </div>
                <div>
                  <label htmlFor="dropoffZip" className="input-label">Drop-Off ZIP Code</label>
                  <input
                    id="dropoffZip" type="text" inputMode="numeric" maxLength={5} placeholder="95826"
                    className={clsx('input-field', errors.dropoffZip && 'border-red-400 focus:ring-red-100')}
                    {...register('dropoffZip')}
                  />
                  {errors.dropoffZip && <p className="input-error">{errors.dropoffZip.message}</p>}
                </div>
              </div>
            </FormSection>

            <Divider />

            {/* ── 3. Vehicle & Service ──────────────────────── */}
            <FormSection title="Vehicle & Service">
              <div>
                <label htmlFor="vehicleMakeModel" className="input-label">Vehicle Make &amp; Model</label>
                <input
                  id="vehicleMakeModel" type="text" placeholder="e.g. 2022 Toyota Camry"
                  className={clsx('input-field', errors.vehicleMakeModel && 'border-red-400 focus:ring-red-100')}
                  {...register('vehicleMakeModel')}
                />
                {errors.vehicleMakeModel && <p className="input-error">{errors.vehicleMakeModel.message}</p>}
              </div>
              <div>
                <label htmlFor="serviceType" className="input-label">Service Type</label>
                <select
                  id="serviceType"
                  className={clsx('input-field', errors.serviceType && 'border-red-400 focus:ring-red-100')}
                  {...register('serviceType')}
                >
                  <option value="">Select a service…</option>
                  {SERVICE_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="input-error">{errors.serviceType.message}</p>}
              </div>
              <div>
                <label htmlFor="preferredShop" className="input-label">
                  Preferred Dealership / Shop{' '}
                  <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <input
                  id="preferredShop" type="text" placeholder="e.g. Capitol Toyota Sacramento"
                  className="input-field"
                  {...register('preferredShop')}
                />
              </div>
            </FormSection>

            <Divider />

            {/* ── 4. Date & Time Slot ───────────────────────── */}
            <FormSection title="Schedule Pickup">
              <div>
                <p className="input-label mb-2">Select a Date</p>
                <Controller
                  name="pickupDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      error={errors.pickupDate?.message}
                    />
                  )}
                />
              </div>

              {/* Time slots reveal once a date is picked */}
              {pickupDate && (
                <div className="animate-fade-in">
                  <p className="input-label mb-3">Preferred Time Window</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {TIME_SLOTS.map(({ value, label, time, description, emoji }) => {
                      const selected = timeSlot === value
                      return (
                        <label
                          key={value}
                          className={clsx(
                            'relative flex flex-col gap-1.5 p-4 rounded-2xl border cursor-pointer transition-all duration-150 select-none',
                            selected
                              ? 'border-brand-400 bg-brand-50 shadow-sm'
                              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                          )}
                        >
                          <input
                            type="radio" value={value}
                            className="sr-only"
                            {...register('timeSlot')}
                          />
                          {selected && (
                            <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                          <span className="text-xl" role="img" aria-hidden>{emoji}</span>
                          <span className={clsx('text-sm font-semibold', selected ? 'text-brand-800' : 'text-neutral-800')}>
                            {label}
                          </span>
                          <span className={clsx('text-sm font-medium', selected ? 'text-brand-700' : 'text-neutral-600')}>
                            {time}
                          </span>
                          <span className="text-xs text-neutral-400">{description}</span>
                        </label>
                      )
                    })}
                  </div>
                  {errors.timeSlot && <p className="input-error mt-1">{errors.timeSlot.message}</p>}
                </div>
              )}
            </FormSection>

            <Divider />

            {/* ── 5. Insurance Upload ───────────────────────── */}
            <FormSection title="Insurance Document">
              {insuranceFile ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-700 truncate flex-1">{insuranceFile.name}</span>
                  <button type="button" onClick={removeFile} className="text-neutral-400 hover:text-neutral-600">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="insuranceDoc"
                  className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
                >
                  <Upload size={22} className="text-neutral-400" />
                  <span className="text-sm font-medium text-neutral-700">Upload Insurance Card</span>
                  <span className="text-xs text-neutral-400">JPEG, PNG, PDF — up to 10 MB</span>
                  <input
                    id="insuranceDoc" ref={fileRef} type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="sr-only" onChange={handleFileChange}
                  />
                </label>
              )}
            </FormSection>

            <Divider />

            {/* ── 6. Notes ──────────────────────────────────── */}
            <FormSection title="Additional Notes">
              <textarea
                id="notes" rows={3}
                placeholder="Gate code, special instructions, anything we should know…"
                className="input-field resize-none"
                {...register('notes')}
              />
            </FormSection>

            <Divider />

            {/* ── 7. Tip — checkbox toggle + reveal ────────── */}
            <FormSection title="Driver Tip">
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <div className="relative flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" {...register('addTip')} />
                  <div className="w-11 h-6 rounded-full bg-neutral-200 peer-checked:bg-brand-600 transition-colors duration-200" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-neutral-800">Add a tip for my driver</span>
                  <p className="text-xs text-neutral-400">100% goes directly to your driver</p>
                </div>
              </label>

              {addTip && (
                <div className="animate-fade-in space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {TIP_PRESETS.map((preset) => {
                      const active = tipAmount === preset && !customTip
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => { setValue('tipAmount', preset); setCustomTip('') }}
                          className={clsx(
                            'px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150',
                            active
                              ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                              : 'border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50'
                          )}
                        >
                          ${preset}
                        </button>
                      )
                    })}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm font-medium">$</span>
                      <input
                        type="number" min="0" max="200" step="1" placeholder="Other"
                        value={customTip}
                        onChange={(e) => {
                          setCustomTip(e.target.value)
                          const num = parseFloat(e.target.value)
                          if (!isNaN(num)) setValue('tipAmount', num)
                        }}
                        className={clsx(
                          'w-24 pl-7 pr-3 py-2.5 rounded-xl border text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 transition-colors',
                          customTip ? 'border-brand-400 bg-brand-50 focus:ring-brand-100' : 'border-neutral-200 focus:border-brand-400 focus:ring-brand-100'
                        )}
                      />
                    </div>
                  </div>
                  {tipAmount && tipAmount > 0 && (
                    <p className="text-xs text-emerald-600 font-medium">
                      ✓ ${Number(tipAmount).toFixed(2)} tip added — your driver will appreciate it!
                    </p>
                  )}
                </div>
              )}
            </FormSection>

            <Divider />

            {/* ── 8. Terms ──────────────────────────────────── */}
            <div className="flex items-start gap-3">
              <input
                id="agreedToTerms" type="checkbox"
                className="mt-0.5 w-5 h-5 rounded border-neutral-300 text-brand-600 cursor-pointer flex-shrink-0"
                {...register('agreedToTerms')}
              />
              <label htmlFor="agreedToTerms" className="text-sm text-neutral-600 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-brand-600 hover:underline font-medium">Terms of Service</Link>
                {', '}
                <Link href="/privacy" target="_blank" className="text-brand-600 hover:underline font-medium">Privacy Policy</Link>
                {', and '}
                <Link href="/service-agreement" target="_blank" className="text-brand-600 hover:underline font-medium">Service Agreement</Link>
                . I authorize AutoValet to transport my vehicle and take photo documentation.
              </label>
            </div>
            {errors.agreedToTerms && <p className="input-error">{errors.agreedToTerms.message}</p>}

            <Divider />

            {/* ── 9. Price summary ──────────────────────────── */}
            <PriceSummary tipAmount={tipAmount} addTip={addTip} />

            {/* Server error */}
            {serverError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* ── Submit → Stripe Checkout ──────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Preparing payment…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="1" y="4" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.75" />
                    <path d="M1 10h22" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                  Continue to Payment
                </span>
              )}
            </button>

            <p className="text-center text-xs text-neutral-400">
              Secured by Stripe · SSL encrypted · No charge until booking is confirmed
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormValues } from '@/lib/validations'
import { CheckCircle2, Upload, X, CreditCard, Smartphone, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

const SERVICE_TYPES = [
  { value: 'maintenance', label: 'Routine Maintenance' },
  { value: 'dealership',  label: 'Dealership Visit'   },
  { value: 'recall',      label: 'Recall Service'     },
  { value: 'other',       label: 'Other'              },
]

const TIP_PRESETS = [0, 5, 10, 20]

const PAYMENT_METHODS = [
  { value: 'card',       label: 'Credit / Debit Card', icon: CreditCard  },
  { value: 'applepay',   label: 'Apple Pay',           icon: Smartphone  },
  { value: 'googlepay',  label: 'Google Pay',          icon: Smartphone  },
]

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16 px-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={32} className="text-emerald-500" />
      </div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-3">Booking Received!</h3>
      <p className="text-neutral-500 max-w-sm mx-auto mb-2 leading-relaxed">
        You&apos;ll receive an SMS confirmation within <strong>15 minutes</strong>. Keep an eye on your phone.
      </p>
      <p className="text-sm text-neutral-400 mb-10">
        Questions? Text or call <a href="tel:+19165550100" className="text-brand-600 font-medium hover:underline">(916) 555-0100</a>
      </p>
      <button onClick={onReset} className="btn-secondary text-sm">
        Book another pickup
      </button>
    </div>
  )
}

export default function BookingForm() {
  const [submitted,    setSubmitted]   = useState(false)
  const [serverError,  setServerError] = useState<string | null>(null)
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null)
  const [customTip,     setCustomTip]    = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { tipAmount: 0, paymentMethod: 'card' },
  })

  const tipAmount     = watch('tipAmount')
  const paymentMethod = watch('paymentMethod')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setInsuranceFile(file)
  }

  const removeFile = () => {
    setInsuranceFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const onSubmit = async (data: BookingFormValues) => {
    setServerError(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v))
      })
      if (insuranceFile) formData.append('insuranceDoc', insuranceFile)

      const res = await fetch('/api/booking', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to submit booking. Please try again.')
    }
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
    setInsuranceFile(null)
    setServerError(null)
    setCustomTip('')
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {!submitted && (
          <div className="text-center mb-10">
            <p className="section-label mb-3">Ready when you are</p>
            <h2 className="section-heading mb-3">Book Your Pickup</h2>
            <p className="section-subheading">
              No account needed. Takes under 60 seconds.
            </p>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-card overflow-hidden">
          {submitted ? (
            <SuccessState onReset={handleReset} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 sm:p-8 space-y-6">
              {/* ── Personal Info ─────────────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Your Details
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="input-label">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Jane"
                      className={clsx('input-field', errors.firstName && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                      {...register('firstName')}
                    />
                    {errors.firstName && <p className="input-error">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="input-label">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Smith"
                      className={clsx('input-field', errors.lastName && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                      {...register('lastName')}
                    />
                    {errors.lastName && <p className="input-error">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="phone" className="input-label">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(916) 555-0100"
                    className={clsx('input-field', errors.phone && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                    {...register('phone')}
                  />
                  {errors.phone && <p className="input-error">{errors.phone.message}</p>}
                  <p className="text-xs text-neutral-400 mt-1.5">We&apos;ll confirm your booking by SMS.</p>
                </div>
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Location ──────────────────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Pickup &amp; Drop-Off
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pickupZip" className="input-label">Pickup ZIP Code</label>
                    <input
                      id="pickupZip"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="95814"
                      className={clsx('input-field', errors.pickupZip && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                      {...register('pickupZip')}
                    />
                    {errors.pickupZip && <p className="input-error">{errors.pickupZip.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="dropoffZip" className="input-label">Drop-Off ZIP Code</label>
                    <input
                      id="dropoffZip"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="95826"
                      className={clsx('input-field', errors.dropoffZip && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                      {...register('dropoffZip')}
                    />
                    {errors.dropoffZip && <p className="input-error">{errors.dropoffZip.message}</p>}
                  </div>
                </div>
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Vehicle & Service ─────────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Vehicle &amp; Service
                </legend>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vehicleMakeModel" className="input-label">Vehicle Make &amp; Model</label>
                    <input
                      id="vehicleMakeModel"
                      type="text"
                      placeholder="e.g. 2022 Toyota Camry"
                      className={clsx('input-field', errors.vehicleMakeModel && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                      {...register('vehicleMakeModel')}
                    />
                    {errors.vehicleMakeModel && <p className="input-error">{errors.vehicleMakeModel.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="input-label">Service Type</label>
                    <select
                      id="serviceType"
                      className={clsx('input-field', errors.serviceType && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
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
                      id="preferredShop"
                      type="text"
                      placeholder="e.g. Capitol Toyota Sacramento"
                      className="input-field"
                      {...register('preferredShop')}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Insurance Doc Upload ──────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Insurance Document
                </legend>
                {insuranceFile ? (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 truncate flex-1">{insuranceFile.name}</span>
                    <button type="button" onClick={removeFile} className="text-neutral-400 hover:text-neutral-600 flex-shrink-0">
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
                      id="insuranceDoc"
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Notes ─────────────────────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Additional Notes
                </legend>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Anything we should know — gate code, special instructions, etc."
                  className="input-field resize-none"
                  {...register('notes')}
                />
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Payment ───────────────────────────────────── */}
              <fieldset>
                <legend className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                  Payment Method
                </legend>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                    <label
                      key={value}
                      className={clsx(
                        'flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-150 text-center',
                        paymentMethod === value
                          ? 'border-brand-400 bg-brand-50 shadow-sm'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      )}
                    >
                      <input type="radio" value={value} className="sr-only" {...register('paymentMethod')} />
                      <Icon size={18} className={paymentMethod === value ? 'text-brand-600' : 'text-neutral-400'} />
                      <span className={clsx('text-xs font-medium', paymentMethod === value ? 'text-brand-700' : 'text-neutral-600')}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="input-error -mt-4 mb-4">{errors.paymentMethod.message}</p>}

                {/* Tip selector */}
                <div>
                  <label className="input-label mb-3">Add a Tip <span className="text-neutral-400 font-normal">(optional — 100% goes to your driver)</span></label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {TIP_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => { setValue('tipAmount', preset); setCustomTip('') }}
                        className={clsx(
                          'px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150',
                          tipAmount === preset && !customTip
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        )}
                      >
                        {preset === 0 ? 'No tip' : `$${preset}`}
                      </button>
                    ))}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                      <input
                        type="number"
                        min="0"
                        max="200"
                        step="1"
                        placeholder="Custom"
                        value={customTip}
                        onChange={(e) => {
                          setCustomTip(e.target.value)
                          const num = parseFloat(e.target.value)
                          if (!isNaN(num)) setValue('tipAmount', num)
                        }}
                        className="w-24 pl-7 pr-3 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="border-t border-neutral-100" />

              {/* ── Terms ─────────────────────────────────────── */}
              <fieldset>
                <div className="flex items-start gap-3">
                  <input
                    id="agreedToTerms"
                    type="checkbox"
                    className="mt-0.5 w-5 h-5 rounded border-neutral-300 text-brand-600 cursor-pointer flex-shrink-0"
                    {...register('agreedToTerms')}
                  />
                  <label htmlFor="agreedToTerms" className="text-sm text-neutral-600 leading-relaxed cursor-pointer">
                    I have read and agree to the{' '}
                    <Link href="/terms" target="_blank" className="text-brand-600 hover:underline font-medium">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" target="_blank" className="text-brand-600 hover:underline font-medium">
                      Privacy Policy
                    </Link>
                    , including the{' '}
                    <Link href="/service-agreement" target="_blank" className="text-brand-600 hover:underline font-medium">
                      Service Agreement
                    </Link>
                    . I understand AutoValet will transport my vehicle and that photo documentation will be taken.
                  </label>
                </div>
                {errors.agreedToTerms && <p className="input-error mt-2">{errors.agreedToTerms.message}</p>}
              </fieldset>

              {/* Server error */}
              {serverError && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Submit */}
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
                    Submitting…
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>

              <p className="text-center text-xs text-neutral-400">
                We&apos;ll confirm your booking details by SMS within 15 minutes.
                <br />No charge until your pickup is confirmed.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'How does the pickup process actually work?',
    a: "After you book, we'll confirm by SMS within 15 minutes. At the agreed time, a background-checked driver arrives at your location, completes a photo walkthrough of your vehicle, and heads directly to your chosen shop or dealership. You'll receive a notification when service is complete and again when your car is back in your driveway.",
  },
  {
    q: 'What if my car gets damaged during the trip?',
    a: "Every trip is fully insured and documented with photos at pickup and drop-off. In the rare event of an issue, our insurance covers you completely. We also keep a timestamped photo record of every handoff — so there's never any ambiguity about your vehicle's condition.",
  },
  {
    q: 'Do I need to stay home for the pickup or return?',
    a: "No. As long as we can access your vehicle and you've left the key in an agreed location, you're free to go about your day. We'll handle everything and update you by text at each stage.",
  },
  {
    q: 'Which areas do you currently serve?',
    a: 'We currently serve Sacramento, Roseville, Folsom, Elk Grove, Woodland, and Davis. Expanding soon — enter your ZIP at booking to confirm coverage.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Engagement copy */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">We get it</p>
            <h2 className="section-heading mb-5">
              Busy week?{' '}
              <span className="text-brand-600">Let us handle the dealership.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Sitting in a waiting room for three hours while your car gets an oil change shouldn&apos;t be part of your day. AutoValet exists so your schedule stays intact and your car gets the care it needs.
            </p>

            {/* Mini trust stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15 min', label: 'SMS confirmation' },
                { value: '100%',   label: 'Insured & bonded' },
                { value: '6 cities', label: 'Service area' },
                { value: '5★',    label: 'Driver standards' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{value}</div>
                  <div className="text-xs text-neutral-500">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="#booking" className="btn-primary w-full sm:w-auto">
                Book My Pickup
              </Link>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className="border border-neutral-100 rounded-2xl bg-white shadow-soft overflow-hidden transition-shadow duration-200 hover:shadow-card"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-neutral-800">{q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-neutral-400 transition-transform duration-200 ${
                      open === i ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>

                {open === i && (
                  <div className="px-6 pb-5 animate-slide-down">
                    <p className="text-sm text-neutral-500 leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

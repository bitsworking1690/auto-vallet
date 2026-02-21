import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Agreement',
  description: 'AutoValet Service Agreement – The specific terms governing vehicle transportation for each booking.',
}

const EFFECTIVE_DATE = 'January 1, 2025'

export default function ServiceAgreementPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft size={16} />
            Back to AutoValet
          </Link>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Service Agreement & Disclaimer</h1>
          <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        {/* Disclaimer callout */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-10">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> By submitting a booking through AutoValet, you enter into this Service Agreement. Please read it before confirming your booking. This document supplements our{' '}
            <Link href="/terms" className="underline hover:text-amber-900">Terms of Service</Link>.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">1. Scope of Service</h2>
            <p>
              AutoValet agrees to transport your vehicle from the pickup location to the designated service facility and return it to the agreed return address upon completion of service. AutoValet is not a party to any service contract between you and the dealer or repair facility.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">2. Vehicle Authorization</h2>
            <p>
              By booking a pickup, you confirm that:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5 text-sm">
              <li>You are the registered owner of the vehicle, or are duly authorized by the registered owner to arrange its transport</li>
              <li>The vehicle is legally registered and properly insured under a valid policy</li>
              <li>The vehicle is mechanically safe to drive (functioning brakes, no fuel leaks, tires inflated)</li>
              <li>You have disclosed any known hazards or special handling requirements in the booking notes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">3. Photo Documentation & Condition Report</h2>
            <p>
              AutoValet will photograph all exterior sides and the interior of your vehicle before driving it. These photos are timestamped and geo-tagged. A condition report is generated automatically and constitutes the official record of your vehicle&apos;s condition at pickup. Any damage not present in pickup photos that appears at drop-off will be covered by AutoValet&apos;s insurance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">4. Driver Standards</h2>
            <p>All AutoValet drivers:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5 text-sm">
              <li>Have passed a comprehensive background check</li>
              <li>Hold a valid California driver&apos;s license</li>
              <li>Have a clean DMV record with no major violations in the past 3 years</li>
              <li>Are trained on vehicle handling, documentation procedures, and customer communication</li>
              <li>Are covered under AutoValet&apos;s commercial insurance policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">5. Limitation of Liability</h2>
            <p>
              AutoValet&apos;s total liability for any single trip shall not exceed the fair market value of your vehicle at the time of the trip. AutoValet is not liable for indirect, incidental, or consequential damages including loss of use, rental car costs not pre-approved in writing, or loss of business income.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">6. Personal Property</h2>
            <p>
              <strong>Do not leave valuables in your vehicle.</strong> AutoValet is not responsible for personal property, electronics, cash, or other items left in the vehicle during transport. Please remove all valuables before pickup.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">7. Pricing Transparency</h2>
            <p>
              Service pricing is based on distance, service type, and demand at time of booking. The quoted price at booking confirmation is the price you pay. No hidden fees. Tips are optional and go entirely to your driver. Fuel costs are included in the service fee.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">8. Complaint Resolution</h2>
            <p>
              If you have any concern about your AutoValet experience, contact us within <strong>48 hours</strong> of your service at{' '}
              <a href="mailto:support@autovalet.com" className="text-brand-600 hover:underline">support@autovalet.com</a>{' '}
              or call <a href="tel:+19165550100" className="text-brand-600 hover:underline">(916) 555-0100</a>. We are committed to resolving every concern promptly and fairly.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

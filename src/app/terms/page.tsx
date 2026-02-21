import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'AutoValet Terms of Service – Read our terms governing concierge vehicle pickup and drop-off services in Sacramento, CA.',
}

const EFFECTIVE_DATE = 'January 1, 2025'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By using AutoValet&apos;s services ("Service"), you agree to be bound by these Terms of Service ("Terms"). Please read them carefully. If you do not agree with any part of these Terms, you may not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">2. Description of Service</h2>
            <p>
              AutoValet provides a concierge vehicle transportation service operating in Sacramento, Roseville, Folsom, and Elk Grove, California. Our service includes:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>Pickup of your vehicle from a designated location</li>
              <li>Transportation of your vehicle to an agreed dealership, repair facility, or service center</li>
              <li>Return of your vehicle to the original or agreed pickup location after service completion</li>
              <li>Photo documentation at each handoff point</li>
              <li>GPS tracking during transport</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">3. Booking & Confirmation</h2>
            <p>
              A booking request does not constitute a confirmed appointment. AutoValet will confirm your booking via SMS within approximately 15 minutes of submission during business hours (Monday–Friday 7am–7pm; Saturday 8am–4pm PT). Bookings submitted outside business hours will be confirmed the next business day.
            </p>
            <p className="mt-3">
              No payment is collected until your booking is confirmed. AutoValet reserves the right to decline any booking request at its sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">4. Vehicle Condition & Documentation</h2>
            <p>
              You represent that the vehicle you submit for service is legally registered, has valid insurance coverage in your name or business name, and you have the legal authority to authorize its transport. AutoValet will photograph your vehicle at pickup and drop-off. These photographs constitute the official condition record for the trip.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">5. Insurance & Liability</h2>
            <p>
              AutoValet carries commercial garage liability insurance covering vehicles in our care, custody, and control during transport. Coverage details are available upon request. AutoValet is not liable for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>Pre-existing vehicle damage not documented at pickup</li>
              <li>Damage caused by third parties while the vehicle is at a service facility</li>
              <li>Mechanical failures or defects unrelated to AutoValet&apos;s transport</li>
              <li>Items left in the vehicle during transport</li>
              <li>Delays caused by the service facility or dealership</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">6. Payment & Cancellation</h2>
            <p>
              Service fees are disclosed prior to booking confirmation. Payment is due upon return of your vehicle. Cancellations made at least 2 hours before the scheduled pickup time are free. Late cancellations or no-shows may incur a fee up to 50% of the service price.
            </p>
            <p className="mt-3">
              Tips collected through the platform are distributed 100% to the assigned driver and are entirely voluntary.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">7. Prohibited Uses</h2>
            <p>You may not use AutoValet to transport:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>Vehicles containing illegal substances or contraband</li>
              <li>Vehicles with known hazardous conditions (brake failure, fuel leaks, etc.)</li>
              <li>Vehicles for which you do not have lawful possession or authority</li>
              <li>Vehicles for purposes other than legitimate automotive service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">8. Governing Law & Disputes</h2>
            <p>
              These Terms are governed by the laws of the State of California. Any disputes shall be resolved by binding arbitration in Sacramento County, California, under the rules of the American Arbitration Association, except that either party may seek injunctive relief in any court of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">9. Changes to Terms</h2>
            <p>
              AutoValet reserves the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms. Material changes will be communicated via the website or email.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{' '}
              <a href="mailto:legal@autovalet.com" className="text-brand-600 hover:underline">legal@autovalet.com</a>
              {' '}or call{' '}
              <a href="tel:+19165550100" className="text-brand-600 hover:underline">(916) 555-0100</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

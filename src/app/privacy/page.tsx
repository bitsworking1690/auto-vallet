import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AutoValet Privacy Policy – How we collect, use, and protect your personal information.',
}

const EFFECTIVE_DATE = 'January 1, 2025'

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">1. Information We Collect</h2>
            <p>When you use AutoValet, we collect:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li><strong>Identity information:</strong> First name, last name</li>
              <li><strong>Contact information:</strong> Phone number</li>
              <li><strong>Location information:</strong> Pickup and drop-off ZIP codes</li>
              <li><strong>Vehicle information:</strong> Make, model, year</li>
              <li><strong>Service information:</strong> Type of service, preferred shop or dealership</li>
              <li><strong>Insurance documentation:</strong> Uploaded insurance card images</li>
              <li><strong>Payment information:</strong> Payment method preference and tip amount (actual card details are processed by our payment processor and never stored by AutoValet)</li>
              <li><strong>Trip data:</strong> GPS coordinates during vehicle transport, timestamps, and photo documentation</li>
              <li><strong>Device &amp; usage data:</strong> IP address, browser type, pages visited, and referral source</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>Process and fulfill your booking request</li>
              <li>Send booking confirmations and status updates via SMS</li>
              <li>Coordinate pickup and drop-off logistics</li>
              <li>Maintain trip records and photo documentation</li>
              <li>Process payments and tips</li>
              <li>Resolve disputes and handle insurance claims if needed</li>
              <li>Improve our service through aggregate analytics</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share it with:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li><strong>Service providers:</strong> Payment processors, SMS/email platforms, cloud storage providers</li>
              <li><strong>AutoValet drivers:</strong> Only the information needed to complete your trip (name, phone, pickup location)</li>
              <li><strong>Dealerships/shops:</strong> Vehicle information needed to facilitate your service appointment</li>
              <li><strong>Insurance carriers:</strong> In the event of a claim, as required</li>
              <li><strong>Law enforcement:</strong> When required by law or valid legal process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">4. Data Retention</h2>
            <p>
              Booking records, including trip photos and documentation, are retained for <strong>7 years</strong> to satisfy insurance, legal, and regulatory requirements. You may request deletion of your personal information subject to these legal retention obligations by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">5. Your Rights (California Residents)</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), you have the right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>Know what personal information we collect, use, and disclose</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale of your personal information (we do not sell it)</li>
              <li>Non-discrimination for exercising your rights</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at <a href="mailto:privacy@autovalet.com" className="text-brand-600 hover:underline">privacy@autovalet.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">6. Security</h2>
            <p>
              We implement industry-standard security measures including TLS encryption, access controls, and regular security reviews. Insurance documents are stored in encrypted cloud storage with restricted access. However, no system is 100% secure and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">7. Cookies & Analytics</h2>
            <p>
              Our website uses essential cookies for basic functionality. We may use privacy-respecting analytics to understand aggregate usage patterns. We do not use tracking pixels, behavioral advertising cookies, or third-party ad networks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">8. Contact</h2>
            <p>
              For privacy inquiries:{' '}
              <a href="mailto:privacy@autovalet.com" className="text-brand-600 hover:underline">privacy@autovalet.com</a>
              {' '}· AutoValet · Sacramento, CA 95814
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

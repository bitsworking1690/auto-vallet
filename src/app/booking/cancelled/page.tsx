import type { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowLeft, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Cancelled',
  description: 'Your AutoValet payment was cancelled. Your booking has not been charged.',
  robots: { index: false, follow: false },
}

export default function BookingCancelledPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple nav */}
      <nav className="border-b border-neutral-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M5 11L6.5 6.5C6.8 5.6 7.6 5 8.6 5h6.8c1 0 1.8.6 2.1 1.5L19 11M5 11H3.5A1.5 1.5 0 002 12.5v1A1.5 1.5 0 003.5 15H5m14-4h1.5A1.5 1.5 0 0122 12.5v1A1.5 1.5 0 0120.5 15H19M5 15v2a1 1 0 001 1h1a1 1 0 001-1v-2m10 0v2a1 1 0 001 1h1a1 1 0 001-1v-2M5 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="15" r="1.5" fill="currentColor" />
                <circle cx="15.5" cy="15" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-bold text-neutral-900 tracking-tight">
              Auto<span className="text-brand-600">Valet</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-neutral-50 border-4 border-neutral-100 flex items-center justify-center mx-auto mb-8">
            <XCircle size={40} className="text-neutral-400" />
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 mb-3">Payment cancelled</h1>
          <p className="text-neutral-500 leading-relaxed mb-4">
            No worries — you haven&apos;t been charged. Your booking details are saved and you can complete payment anytime.
          </p>
          <p className="text-sm text-neutral-400 mb-10">
            If you ran into an issue or need help, give us a call and we&apos;ll sort it out in minutes.
          </p>

          {/* Info box */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8 text-left">
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Prefer to pay by phone?</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Call us at <a href="tel:+19165550100" className="font-semibold hover:underline">(916) 555-0100</a> and
              we can take your booking and payment directly over the phone.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/#booking" className="btn-primary w-full sm:w-auto">
              <ArrowLeft size={16} />
              Try Again
            </Link>
            <a href="tel:+19165550100" className="btn-secondary w-full sm:w-auto">
              <Phone size={16} />
              Call Us
            </a>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        AutoValet · Sacramento, CA · Fully insured &amp; bonded
      </footer>
    </div>
  )
}

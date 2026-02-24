import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Phone, MessageSquare, Car } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your AutoValet booking is confirmed. We\'ll be in touch shortly.',
  robots: { index: false, follow: false },
}

const nextSteps = [
  {
    icon:  MessageSquare,
    title: 'SMS Confirmation',
    body:  'You\'ll receive a text message within 15 minutes confirming your driver assignment and exact arrival window.',
    color: 'text-brand-600',
    bg:    'bg-brand-50',
  },
  {
    icon:  Car,
    title: 'Day-of Coordination',
    body:  'Your driver will text 30 minutes before arrival. They\'ll do a photo walk-around before driving off.',
    color: 'text-emerald-600',
    bg:    'bg-emerald-50',
  },
  {
    icon:  Phone,
    title: 'Questions? Call Us',
    body:  'Our team is available Mon–Fri 7am–7pm and Sat 8am–4pm. We\'re always a call or text away.',
    color: 'text-violet-600',
    bg:    'bg-violet-50',
  },
]

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex flex-col">
      {/* Simple nav */}
      <nav className="border-b border-neutral-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
        <div className="max-w-xl w-full text-center">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-8 animate-fade-in">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-3 animate-fade-up">
            You&apos;re all set!
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-2 animate-fade-up animate-delay-100">
            Your booking is confirmed and payment was processed successfully.
          </p>
          <p className="text-sm text-neutral-400 mb-12 animate-fade-up animate-delay-200">
            Keep your phone nearby — we&apos;ll text you within <strong>15 minutes</strong>.
          </p>

          {/* Next steps */}
          <div className="grid gap-4 text-left mb-12 animate-fade-up animate-delay-300">
            {nextSteps.map(({ icon: Icon, title, body, color, bg }) => (
              <div key={title} className="flex items-start gap-4 bg-white rounded-2xl border border-neutral-100 shadow-soft p-5">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-1">{title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact + home */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up animate-delay-400">
            <a href="tel:+19165550100" className="btn-primary w-full sm:w-auto">
              <Phone size={16} />
              (916) 555-0100
            </a>
            <Link href="/" className="btn-secondary w-full sm:w-auto">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer note */}
      <footer className="py-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        AutoValet · Sacramento, CA · Fully insured &amp; bonded
      </footer>
    </div>
  )
}

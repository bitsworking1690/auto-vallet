import Link from 'next/link'
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react'

const trustBadges = [
  { icon: ShieldCheck, text: 'Fully insured & bonded' },
  { icon: Clock,       text: 'SMS confirmation in 15 min' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,150,231,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Grid texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Label pill */}
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-brand-100 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          Now serving Sacramento &amp; surrounding areas
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 leading-[1.08] tracking-tight mb-6 animate-fade-up">
          We Take Your Car{' '}
          <span className="text-brand-600">to the Shop</span>
          <br className="hidden sm:block" />
          {' '}— So You Don't Have To.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-100">
          Book a pickup in under a minute. We handle the service and return
          your car safely — fully insured, GPS-tracked, and documented.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-up animate-delay-200">
          <Link href="#booking" className="btn-primary w-full sm:w-auto text-base px-8 py-4 shadow-md hover:shadow-lg">
            Book Pickup
            <ArrowRight size={18} />
          </Link>
          <Link href="#how-it-works" className="btn-secondary w-full sm:w-auto text-base px-8 py-4">
            How It Works
          </Link>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 animate-fade-up animate-delay-300">
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-neutral-500">
              <Icon size={16} className="text-brand-500 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Visual car illustration card */}
        <div className="mt-16 max-w-3xl mx-auto animate-fade-up animate-delay-400">
          <div className="relative rounded-2xl bg-gradient-to-b from-neutral-50 to-white border border-neutral-100 shadow-card overflow-hidden px-8 py-10">
            {/* Decorative blobs */}
            <div aria-hidden className="absolute top-0 right-0 w-48 h-48 bg-brand-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div aria-hidden className="absolute bottom-0 left-0 w-32 h-32 bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-xl" />

            {/* Steps preview */}
            <div className="relative grid grid-cols-3 gap-4 text-center">
              {[
                { step: '01', label: 'Book in 60 seconds',    emoji: '📱' },
                { step: '02', label: 'We pick up your car',   emoji: '🚗' },
                { step: '03', label: 'Returned serviced',      emoji: '✅' },
              ].map(({ step, label, emoji }, i) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  {i < 2 && (
                    <div aria-hidden className="absolute top-6 hidden md:block"
                      style={{ left: `${i === 0 ? '31%' : '64%'}`, width: '8%' }}>
                      <div className="h-px bg-neutral-200 w-full mt-1" />
                    </div>
                  )}
                  <div className="text-2xl">{emoji}</div>
                  <div className="text-xs font-semibold text-brand-500 tracking-widest uppercase">{step}</div>
                  <div className="text-sm font-medium text-neutral-700">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

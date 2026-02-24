import Link from 'next/link'
import { ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react'

const trustBadges = [
  { icon: ShieldCheck, text: 'Fully insured & bonded'    },
  { icon: Clock,       text: 'SMS confirmation in 15 min' },
  { icon: MapPin,      text: '6 cities served'            },
]

const stats = [
  { value: '100%', label: 'Insured'  },
  { value: 'GPS',  label: 'Tracked'  },
  { value: '5★',   label: 'Drivers'  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-10 md:pt-32 md:pb-12">
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text content ────────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-brand-100 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Now serving Sacramento &amp; surrounding areas
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold text-neutral-900 leading-[1.08] tracking-tight mb-6 animate-fade-up">
              We Take Your Car{' '}
              <span className="text-brand-600">to the Shop</span>
              {' '}— So You Don&apos;t Have To.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up animate-delay-100">
              Book a pickup in under a minute. We handle the service and return
              your car safely — fully insured, GPS-tracked, and documented.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 animate-fade-up animate-delay-200">
              <Link href="#booking" className="btn-primary w-full sm:w-auto text-base px-8 py-4 shadow-md hover:shadow-lg">
                Book Pickup
                <ArrowRight size={18} />
              </Link>
              <Link href="#how-it-works" className="btn-secondary w-full sm:w-auto text-base px-8 py-4">
                How It Works
              </Link>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 animate-fade-up animate-delay-300">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-neutral-500">
                  <Icon size={15} className="text-brand-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Visual card with image ─────────────── */}
          <div className="relative animate-fade-up animate-delay-400">
            {/* Main image card */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-lift"
              style={{ minHeight: '420px' }}
            >
              {/* Gradient background (always shown; image overlays it) */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1a3a5c 0%, #0278c5 55%, #38bdf8 100%)',
                }}
              />

              {/* Photo — professional driver handing over car keys */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&auto=format&fit=crop&q=80"
                alt="Professional AutoValet driver handing car keys with care"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                loading="eager"
              />

              {/* Dark gradient overlay bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,30,55,0.85) 0%, rgba(10,30,55,0.2) 50%, transparent 100%)',
                }}
              />

              {/* Step cards floating over image */}
              <div className="relative z-10 p-8 flex flex-col justify-between" style={{ minHeight: '420px' }}>
                {/* Top steps */}
                <div className="flex gap-3">
                  {[
                    { step: '01', label: 'Book online',   icon: '📱' },
                    { step: '02', label: 'We pick up',    icon: '🚗' },
                    { step: '03', label: 'Car returned',  icon: '✅' },
                  ].map(({ step, label, icon }) => (
                    <div key={step} className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 text-center">
                      <div className="text-xl mb-1">{icon}</div>
                      <div className="text-[10px] font-bold text-brand-200 tracking-widest uppercase">{step}</div>
                      <div className="text-xs font-medium text-white mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom stats bar */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3 text-center">
                    Every trip, guaranteed
                  </p>
                  <div className="grid grid-cols-3 divide-x divide-neutral-100">
                    {stats.map(({ value, label }) => (
                      <div key={label} className="text-center px-3">
                        <div className="text-xl font-bold text-neutral-900">{value}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lift flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Fully Insured
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-3 -left-3 bg-white border border-neutral-100 shadow-card text-xs font-semibold text-neutral-700 px-3 py-2 rounded-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available Today
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

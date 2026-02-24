const steps = [
  {
    number: '01',
    emoji:  '📱',
    title:  'Book in 60 Seconds',
    body:
      'Fill in your vehicle details and ZIP code. No account needed. We\'ll confirm by SMS within 15 minutes.',
  },
  {
    number: '02',
    emoji:  '🚗',
    title:  'We Pick Up Your Vehicle',
    body:
      'A background-checked driver arrives at your door. We photograph the car, confirm everything in writing, then head to the shop.',
  },
  {
    number: '03',
    emoji:  '✅',
    title:  'Returned Serviced & Ready',
    body:
      'Once service is complete, we return your car to the same address — clean, documented, and ready to drive.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Simple process</p>
          <h2 className="section-heading mb-4">How It Works</h2>
          <p className="section-subheading max-w-xl mx-auto">
            Three steps from booking to a serviced car back in your driveway.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[calc(33.33%_+_24px)] right-[calc(33.33%_+_24px)] h-px bg-neutral-200"
          />

          {steps.map(({ number, emoji, title, body }) => (
            <div
              key={number}
              className="relative bg-white rounded-2xl border border-neutral-100 shadow-card p-8 flex flex-col items-start gap-4 hover:shadow-lift transition-shadow duration-300"
            >
              {/* Step number badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold">{number}</span>
                </div>
                <span className="text-2xl" role="img" aria-hidden>{emoji}</span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance line */}
        <p className="text-center text-sm text-neutral-400 mt-10">
          No account. No passwords. No hassle. Just a few taps and you&apos;re done.
        </p>
      </div>
    </section>
  )
}

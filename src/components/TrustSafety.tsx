import { ShieldCheck, Camera, MapPin, UserCheck, Building2, Lock } from 'lucide-react'

const trustItems = [
  {
    icon:  ShieldCheck,
    title: 'Fully Insured & Bonded',
    body:  'Every driver and every trip is covered. Your vehicle is protected from the moment we pick it up.',
    color: 'text-emerald-600',
    bg:    'bg-emerald-50',
  },
  {
    icon:  UserCheck,
    title: 'Background-Checked Drivers',
    body:  'All AutoValet drivers pass thorough background checks and DMV record reviews before their first job.',
    color: 'text-brand-600',
    bg:    'bg-brand-50',
  },
  {
    icon:  Camera,
    title: 'Photo Documentation',
    body:  'We photograph your vehicle at pickup and drop-off, so there\'s always a clear record of its condition.',
    color: 'text-violet-600',
    bg:    'bg-violet-50',
  },
  {
    icon:  MapPin,
    title: 'GPS-Tracked Every Trip',
    body:  'Real-time GPS tracking on every trip. You always know exactly where your vehicle is.',
    color: 'text-amber-600',
    bg:    'bg-amber-50',
  },
  {
    icon:  Building2,
    title: 'Sacramento-Based Team',
    body:  'We\'re local. Our drivers know Sacramento\'s neighborhoods and dealerships like the back of their hand.',
    color: 'text-sky-600',
    bg:    'bg-sky-50',
  },
  {
    icon:  Lock,
    title: 'Your Keys, Your Terms',
    body:  'Keys are handled with care and returned directly to you. No third parties, no keyboxes.',
    color: 'text-rose-600',
    bg:    'bg-rose-50',
  },
]

export default function TrustSafety() {
  return (
    <section id="trust" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Your peace of mind</p>
          <h2 className="section-heading mb-4">Safety at Every Step</h2>
          <p className="section-subheading max-w-xl mx-auto">
            Handing your keys to someone takes trust. We take that seriously — and we&apos;ve built every part of AutoValet to earn it.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map(({ icon: Icon, title, body, color, bg }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl border border-neutral-100 shadow-card p-6 hover:shadow-lift transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Reassurance banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 text-white text-center shadow-lift">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="text-xl font-bold mb-2">We treat your car like it&apos;s our own.</h3>
          <p className="text-brand-100 text-sm max-w-md mx-auto leading-relaxed">
            No shortcuts, no surprises. Every trip is handled with the same care
            we&apos;d give our own vehicle.
          </p>
        </div>
      </div>
    </section>
  )
}

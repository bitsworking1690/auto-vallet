import Link from 'next/link'

const serviceAreas = ['Sacramento', 'Roseville', 'Folsom', 'Elk Grove']

const links = {
  Service: [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#trust',        label: 'Safety & Trust' },
    { href: '#faq',          label: 'FAQ'            },
    { href: '#booking',      label: 'Book Pickup'    },
  ],
  Legal: [
    { href: '/terms',             label: 'Terms of Service'    },
    { href: '/privacy',           label: 'Privacy Policy'      },
    { href: '/service-agreement', label: 'Service Agreement'   },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M5 11L6.5 6.5C6.8 5.6 7.6 5 8.6 5h6.8c1 0 1.8.6 2.1 1.5L19 11M5 11H3.5A1.5 1.5 0 002 12.5v1A1.5 1.5 0 003.5 15H5m14-4h1.5A1.5 1.5 0 0122 12.5v1A1.5 1.5 0 0120.5 15H19M5 15v2a1 1 0 001 1h1a1 1 0 001-1v-2m10 0v2a1 1 0 001 1h1a1 1 0 001-1v-2M5 15h14"
                    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <circle cx="8.5"  cy="15" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Auto<span className="text-brand-400">Valet</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Concierge car pickup &amp; drop-off in Sacramento, CA. Insured, tracked, and handled with care.
            </p>
            <a
              href="tel:+19165550100"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-brand-400 transition-colors font-medium"
            >
              📞 (916) 555-0100
            </a>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Service Areas</h4>
            <ul className="space-y-2.5">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <span className="text-sm hover:text-neutral-300 transition-colors">
                    {area}, CA
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm hover:text-neutral-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600 text-center sm:text-left">
            © {new Date().getFullYear()} AutoValet. All rights reserved. Sacramento, CA.
          </p>
          <p className="text-xs text-neutral-600 text-center">
            Fully insured &amp; licensed · Background-checked drivers · GPS-tracked trips
          </p>
        </div>
      </div>
    </footer>
  )
}

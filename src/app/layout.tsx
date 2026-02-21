import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autovalet.com'),
  title: {
    default: 'AutoValet Sacramento – Concierge Car Pickup & Drop-Off Service',
    template: '%s | AutoValet Sacramento',
  },
  description:
    'AutoValet picks up your vehicle, takes it to the dealership or shop, and returns it serviced and ready. Serving Sacramento, Roseville, Folsom, and Elk Grove. Book in under 60 seconds.',
  keywords: [
    'car pickup service Sacramento',
    'dealership concierge Sacramento',
    'vehicle pickup drop-off Sacramento',
    'car service pickup Roseville',
    'auto concierge Elk Grove',
    'dealership shuttle Sacramento',
    'car pickup Folsom CA',
    'vehicle concierge service California',
  ],
  authors: [{ name: 'AutoValet' }],
  creator: 'AutoValet',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.autovalet.com',
    siteName: 'AutoValet',
    title: "AutoValet – We Take Your Car to the Shop So You Don't Have To",
    description:
      'Book a concierge vehicle pickup in Sacramento in under 60 seconds. Insured drivers, GPS tracking, photo documentation.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AutoValet – Sacramento Car Concierge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoValet – Concierge Car Pickup in Sacramento',
    description: 'We pick up your car, take it to the shop, and return it serviced and ready.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'your-google-site-verification-token',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.autovalet.com',
  name: 'AutoValet',
  description:
    'Concierge car pick-up and drop-off service in Sacramento, California. We take your vehicle to the dealership or shop and return it serviced and ready.',
  url: 'https://www.autovalet.com',
  telephone: '+1-916-555-0100',
  email: 'hello@autovalet.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sacramento',
    addressRegion: 'CA',
    postalCode: '95814',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '38.5816',
    longitude: '-121.4944',
  },
  areaServed: [
    { '@type': 'City', name: 'Sacramento', containedInPlace: { '@type': 'State', name: 'California' } },
    { '@type': 'City', name: 'Roseville',  containedInPlace: { '@type': 'State', name: 'California' } },
    { '@type': 'City', name: 'Folsom',     containedInPlace: { '@type': 'State', name: 'California' } },
    { '@type': 'City', name: 'Elk Grove',  containedInPlace: { '@type': 'State', name: 'California' } },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, Debit Card',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Concierge Vehicle Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dealership Concierge Pickup' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maintenance Drop-Off & Pick-Up' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recall Service Coordination' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inter via Google Fonts – loads at runtime in the browser */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0278c5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  )
}

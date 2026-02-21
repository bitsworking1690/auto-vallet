import Navbar           from '@/components/Navbar'
import Hero             from '@/components/Hero'
import HowItWorks       from '@/components/HowItWorks'
import TrustSafety      from '@/components/TrustSafety'
import FAQ              from '@/components/FAQ'
import BookingForm      from '@/components/BookingForm'
import Footer           from '@/components/Footer'
import StickyBookingCTA from '@/components/StickyBookingCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <TrustSafety />
        <FAQ />
        <BookingForm />
      </main>

      <Footer />

      {/* Sticky "Book Pickup" button – mobile only, appears after scrolling */}
      <StickyBookingCTA />
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StickyBookingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past 300px, hide when near the booking section
      const bookingSection = document.getElementById('booking')
      if (!bookingSection) {
        setVisible(window.scrollY > 300)
        return
      }
      const rect = bookingSection.getBoundingClientRect()
      setVisible(window.scrollY > 300 && rect.top > 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-white border-t border-neutral-100 shadow-lift px-4 py-3 safe-area-inset-bottom">
        <Link
          href="#booking"
          className="btn-primary w-full text-base py-4"
          tabIndex={visible ? 0 : -1}
        >
          Book Pickup Now
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}

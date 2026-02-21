'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#trust',        label: 'Safety & Trust' },
  { href: '#faq',          label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={closeMobile}>
          <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M5 11L6.5 6.5C6.8 5.6 7.6 5 8.6 5h6.8c1 0 1.8.6 2.1 1.5L19 11M5 11H3.5A1.5 1.5 0 002 12.5v1A1.5 1.5 0 003.5 15H5m14-4h1.5A1.5 1.5 0 0122 12.5v1A1.5 1.5 0 0120.5 15H19M5 15v2a1 1 0 001 1h1a1 1 0 001-1v-2m10 0v2a1 1 0 001 1h1a1 1 0 001-1v-2M5 15h14"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx="8.5"  cy="15" r="1.5" fill="currentColor" />
              <circle cx="15.5" cy="15" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-bold text-neutral-900 tracking-tight">
            Auto<span className="text-brand-600">Valet</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="#booking" className="btn-primary text-sm py-2.5 px-5">
            Book Pickup
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 shadow-lift animate-slide-down">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <Link href="#booking" onClick={closeMobile} className="btn-primary w-full text-sm">
                Book Pickup
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

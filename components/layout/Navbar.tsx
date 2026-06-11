'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="site-container nav-inner">
        <Link href="/" className="brand">
          <span style={{ color: '#8a4f17' }}>VadiVan</span> <span style={{ color: '#c47a25' }}>Gezi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Ana menü">
          <Link href="/">Anasayfa</Link>
          <Link href="/turlar">Turlarımız</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        {/* Desktop CTA - Hidden on mobile via CSS */}
        <Link href="/rezervasyon" className="nav-cta" style={{ background: '#8a4f17', borderRadius: '24px', padding: '10px 28px', fontSize: '0.9rem' }}>
          Hemen Rezervasyon Yap
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <Link href="/" onClick={() => setIsOpen(false)}>Anasayfa</Link>
            <Link href="/turlar" onClick={() => setIsOpen(false)}>Turlarımız</Link>
            <Link href="/hakkimizda" onClick={() => setIsOpen(false)}>Hakkımızda</Link>
            <Link href="/iletisim" onClick={() => setIsOpen(false)}>İletişim</Link>
          </nav>
          
          <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>Bize Ulaşın</p>
            <a href="tel:08500000000" style={{ fontSize: '1.2rem', fontWeight: '700', color: '#8a4f17' }}>0850 000 00 00</a>
          </div>
        </div>
      </div>
    </header>
  )
}

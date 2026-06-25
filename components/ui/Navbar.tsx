'use client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(5, 5, 15, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139, 92, 246, 0.15)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ textDecoration: 'none' }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.1rem',
              fontWeight: 500,
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #d946ef)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em',
            }}>
              {'<MT />'}
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'rgba(196, 181, 253, 0.8)',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(196, 181, 253, 0.8)')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                padding: '8px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#c084fc',
              cursor: 'none',
              display: 'none',
              padding: '4px',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(5, 5, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: `slide-up 0.4s ease ${i * 0.1}s both`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              padding: '12px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              animation: 'slide-up 0.4s ease 0.5s both',
            }}
          >
            Download Resume
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

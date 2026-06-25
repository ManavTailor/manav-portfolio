'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Mail, ChevronDown } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

const GithubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const roles = [
  'Software Developer',
  'React Specialist',
  'Full-Stack Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const scrollToNext = () => {
    const about = document.querySelector('#about')
    if (about) about.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(217, 70, 239, 0.08) 0%, transparent 50%), #05050f',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroScene />
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(5,5,15,0.85) 0%, rgba(5,5,15,0.4) 60%, transparent 100%)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
      }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.2s' }}>
          <span className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--purple-pastel)', display: 'inline-block' }} />
            Hello, World! 👋
          </span>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s' }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 700, lineHeight: 1.0, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#f3f0ff', display: 'block' }}>Manav</span>
            <span className="gradient-text" style={{ display: 'block' }}>Tailor</span>
          </h1>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s ease 0.5s', marginBottom: '24px', minHeight: '40px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 400, color: 'var(--purple-pastel)' }}>
            {'// '}
            <span>{displayed}</span>
            <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: 'var(--purple-pastel)', marginLeft: '3px', verticalAlign: 'middle', animation: 'pulse-glow 1s step-end infinite' }} />
          </span>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s ease 0.7s', maxWidth: '500px', marginBottom: '40px' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(196, 181, 253, 0.7)' }}>
            Software Developer with a passion for full-stack development, specializing in React and Node.js. Building top-tier digital experiences from{' '}
            <span style={{ color: 'var(--purple-pastel)' }}>Udaipur, India 🇮🇳</span>
          </p>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s ease 0.9s', display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button className="glow-btn" style={{ padding: '14px 32px', fontSize: '0.9rem' }} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Let's Connect →</span>
          </button>
          <a href="/resume.pdf" download className="outline-btn" style={{ padding: '14px 32px', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Download Resume ↓
          </a>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.9s ease 1.1s', display: 'flex', gap: '20px', alignItems: 'center' }}>
          {[
            { icon: GithubIcon, href: 'https://github.com/Manav-Tailor', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://linkedin.com/in/manav-tailor', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:tailormanav68@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-pastel)', textDecoration: 'none', transition: 'all 0.3s ease', background: 'rgba(18, 18, 35, 0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple-light)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = 'var(--purple-pastel)' }}
            >
              <Icon />
            </a>
          ))}
          <div style={{ width: '40px', height: '1px', background: 'rgba(139, 92, 246, 0.3)' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            tailormanav68@gmail.com
          </span>
        </div>
      </div>

      <button onClick={scrollToNext} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, background: 'none', border: 'none', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--purple-pastel)', opacity: 0.7, animation: 'float 2s ease-in-out infinite' }} aria-label="Scroll down">
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  )
}

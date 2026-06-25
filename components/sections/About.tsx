'use client'
import { useEffect, useRef } from 'react'
import { Code2, Zap, Globe, Users } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '3+', icon: Zap },
  { label: 'Projects Completed', value: '10+', icon: Code2 },
  { label: 'Technologies', value: '15+', icon: Globe },
  { label: 'Happy Clients', value: '5+', icon: Users },
]

const tickerItems = [
  'React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'Salesforce',
  'Tailwind CSS', 'Python', 'Django', 'Git', 'Figma', 'React Native',
  'React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'Salesforce',
  'Tailwind CSS', 'Python', 'Django', 'Git', 'Figma', 'React Native',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-wrapper">
      {/* Background orbs */}
      <div className="orb" style={{ width: '400px', height: '400px', background: '#7c3aed', right: '-100px', top: '10%' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section label */}
        <div className="reveal-item" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: '20px' }}>
          <span className="section-tag">01. About Me</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left — Text */}
          <div>
            <h2 className="reveal-item gradient-text-soft" style={{
              opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '28px',
            }}>
              Crafting Digital<br />Experiences That<br />
              <span className="gradient-text">Inspire.</span>
            </h2>

            <p className="reveal-item" style={{
              opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(196, 181, 253, 0.75)',
              marginBottom: '20px',
            }}>
              I'm a <span style={{ color: 'var(--purple-pastel)', fontWeight: 600 }}>Software Developer</span> at TDC Consultancy Pvt Ltd, based in Udaipur, India. 
              I specialize in building scalable web & mobile applications using modern technologies.
            </p>

            <p className="reveal-item" style={{
              opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.3s',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(196, 181, 253, 0.75)',
              marginBottom: '36px',
            }}>
              With experience across <span style={{ color: 'var(--purple-pastel)', fontWeight: 600 }}>React, Node.js, Salesforce, and Python</span>, 
              I bring a holistic perspective to every project — from elegant UI to robust backend architecture.
            </p>

            <div className="reveal-item" style={{
              opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.4s',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              {['B.Tech CSE', 'TDC Consultancy', 'Udaipur, India', 'Open to Work'].map((tag) => (
                <span key={tag} className="skill-pill">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — Stats + Card */}
          <div>
            {/* Profile card */}
            <div className="reveal-item glass-card" style={{
              opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.3s',
              padding: '32px',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                {/* Avatar placeholder */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0,
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
                }}>
                  MT
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Manav Tailor</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--purple-pastel)' }}>
                    Software Developer @ TDC
                  </div>
                </div>
              </div>

              {/* Info rows */}
              {[
                { label: 'Email', value: 'tailormanav68@gmail.com' },
                { label: 'Location', value: 'Udaipur, India' },
                { label: 'Education', value: 'B.Tech CSE — 2020–2024' },
                { label: 'Status', value: '🟢 Available for projects' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'right', maxWidth: '55%' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {stats.map(({ label, value, icon: Icon }, i) => (
                <div key={label} className="reveal-item glass-card" style={{
                  opacity: 0, transform: 'translateY(30px)', transition: `all 0.7s ease ${0.4 + i * 0.1}s`,
                  padding: '20px',
                  textAlign: 'center',
                }}>
                  <Icon size={20} style={{ color: 'var(--purple-pastel)', marginBottom: '8px' }} />
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ marginTop: '80px', overflow: 'hidden', borderTop: '1px solid rgba(139, 92, 246, 0.1)', borderBottom: '1px solid rgba(139, 92, 246, 0.1)', padding: '16px 0' }}>
        <div className="ticker-content">
          {tickerItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0 24px',
            }}>
              {item} <span style={{ color: 'var(--purple-primary)', margin: '0 8px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}

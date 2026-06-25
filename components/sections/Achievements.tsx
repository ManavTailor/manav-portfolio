'use client'
import { useEffect, useRef } from 'react'
import { Award, Star, Heart } from 'lucide-react'

const achievements = [
  {
    title: 'Certification of Full Stack Development Internship',
    issuer: 'CodePlanet Technologies',
    year: '2024',
    icon: Award,
    color: '#7c3aed',
    description: 'Recognized for completing an intensive full-stack development internship, mastering React, Node.js, and modern web technologies.',
  },
  {
    title: 'Certification of Professional Full Stack Development',
    issuer: 'CodePlanet Technologies',
    year: '2022',
    icon: Star,
    color: '#a855f7',
    description: 'Achieved professional certification in full-stack development, validating expertise across frontend and backend technologies.',
  },
  {
    title: 'Voluntary Support — Urban95 Udaipur Kids Festival',
    issuer: 'Urban95 Udaipur',
    year: '2023',
    icon: Heart,
    color: '#d946ef',
    description: 'Volunteered to support the Urban95 Kids Festival in Udaipur, contributing to community development and children\'s welfare.',
  },
]

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.ach-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0) scale(1)'
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="section-wrapper">
      <div className="orb" style={{ width: '300px', height: '300px', background: '#d946ef', right: '-60px', bottom: '10%' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="ach-reveal" style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.7s ease', marginBottom: '12px' }}>
            <span className="section-tag">05. Achievements</span>
          </div>
          <h2 className="ach-reveal gradient-text-soft" style={{
            opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.7s ease 0.1s',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            Awards & Recognition
          </h2>
        </div>

        {/* Achievement cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {achievements.map((ach, i) => {
            const Icon = ach.icon
            return (
              <div
                key={i}
                className="ach-reveal glass-card"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px) scale(0.95)',
                  transition: `all 0.7s ease ${0.2 + i * 0.15}s`,
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle at top right, ${ach.color}22, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${ach.color}22`,
                  border: `1px solid ${ach.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: `0 0 20px ${ach.color}33`,
                }}>
                  <Icon size={22} color={ach.color} />
                </div>

                {/* Year badge */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: ach.color,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: `${ach.color}15`,
                  border: `1px solid ${ach.color}33`,
                }}>
                  {ach.year}
                </div>

                {/* Content */}
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                  marginBottom: '8px',
                }}>
                  {ach.title}
                </h3>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: ach.color,
                  letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  {ach.issuer}
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: 'rgba(196, 181, 253, 0.65)',
                }}>
                  {ach.description}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  height: '2px',
                  borderRadius: '1px',
                  background: `linear-gradient(90deg, ${ach.color}, transparent)`,
                  marginTop: '24px',
                  opacity: 0.5,
                }} />
              </div>
            )
          })}
        </div>

        {/* Education callout */}
        <div className="ach-reveal glass-card" style={{
          opacity: 0, transform: 'translateY(30px) scale(0.95)', transition: 'all 0.7s ease 0.6s',
          marginTop: '32px',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(217, 70, 239, 0.05))',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            flexShrink: 0,
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
          }}>
            🎓
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Education
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              B.Tech in Computer Science Engineering
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Techno India NJR Institute of Technology — Udaipur, India
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700 }}>2020 – 2024</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)' }}>Graduated</div>
          </div>
        </div>
      </div>
    </section>
  )
}

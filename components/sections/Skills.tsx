'use client'
import { useEffect, useRef, useState } from 'react'

const skillCategories = [
  {
    title: 'Languages',
    icon: '⚡',
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    title: 'Frameworks',
    icon: '🚀',
    skills: [
      { name: 'React', level: 93 },
      { name: 'Next.js', level: 88 },
      { name: 'Node.js', level: 85 },
      { name: 'React Native', level: 78 },
      { name: 'Django', level: 70 },
    ],
  },
  {
    title: 'Tools & Database',
    icon: '🛠️',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'Salesforce', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'Figma', level: 78 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
]

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#6DB33F' },
  { name: 'Python', color: '#FFD43B' },
  { name: 'Django', color: '#0D4B2A' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'React Native', color: '#61DAFB' },
  { name: 'Tailwind', color: '#38BDF8' },
  { name: 'Figma', color: '#FF7262' },
  { name: 'Git', color: '#F05032' },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay)
        }
      },
      { threshold: 0.5 }
    )
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div ref={barRef} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--purple-pastel)' }}>{level}%</span>
      </div>
      <div style={{
        height: '6px',
        borderRadius: '3px',
        background: 'rgba(139, 92, 246, 0.1)',
        overflow: 'hidden',
        border: '1px solid rgba(139, 92, 246, 0.15)',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          borderRadius: '3px',
          background: 'linear-gradient(90deg, #7c3aed, #a855f7, #d946ef)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
          transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        }} />
      </div>
    </div>
  )
}

function TechCard({ name, color }: { name: string; color: string }) {
  const [tiltStyle, setTiltStyle] = useState({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 8
    const rotateY = -(x - centerX) / 8
    setTiltStyle({ transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)` })
  }

  return (
    <div
      className="glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTiltStyle({})}
      style={{
        padding: '20px 16px',
        textAlign: 'center',
        cursor: 'none',
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        ...tiltStyle,
      }}
    >
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: color,
        margin: '0 auto 10px',
        boxShadow: `0 0 10px ${color}66`,
      }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.05em',
      }}>
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 100)
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
    <section id="skills" ref={sectionRef} className="section-wrapper" style={{ background: 'rgba(10, 10, 26, 0.5)' }}>
      <div className="orb" style={{ width: '300px', height: '300px', background: '#d946ef', left: '-80px', bottom: '20%' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="skill-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: '12px' }}>
            <span className="section-tag">02. Skills</span>
          </div>
          <h2 className="skill-reveal gradient-text-soft" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            My Tech Arsenal
          </h2>
        </div>

        {/* Skill bars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.title} className="skill-reveal glass-card" style={{
              opacity: 0, transform: 'translateY(30px)', transition: `all 0.7s ease ${0.2 + ci * 0.1}s`,
              padding: '28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {cat.title}
                </h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={si * 100} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech stack pills */}
        <div className="skill-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.5s' }}>
          <p style={{
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}>
            Technology Stack
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
            {techStack.map((tech) => (
              <TechCard key={tech.name} name={tech.name} color={tech.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const projects = [
  {
    id: 1,
    title: 'Foodies',
    subtitle: 'Restaurant Management Platform',
    description: 'A streamlined platform allowing food partners to manage restaurants, menus, and delivery locations. Enables seamless digital operations for restaurant businesses.',
    longDesc: 'Built with a modern tech stack, Foodies provides an end-to-end restaurant management solution — from menu curation to real-time order tracking and analytics.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma'],
    color: '#7c3aed',
    accent: '#a855f7',
    github: 'https://github.com/Manav Tailor',
    emoji: '🍕',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: 2,
    title: 'The Fives',
    subtitle: 'Hotel Administration System',
    description: 'Led a team to build a hotel administration system enabling single-interface management of all operations — from bookings to staff scheduling.',
    longDesc: 'A comprehensive hotel management platform built with Python and Django, providing unified control over all hotel operations through a clean, intuitive interface.',
    tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    color: '#d946ef',
    accent: '#e879f9',
    github: 'https://github.com/Manav Tailor',
    emoji: '🏨',
    category: 'Full Stack',
    featured: true,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({
      x: (y - centerY) / 15,
      y: -(x - centerX) / 15,
    })
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className="glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'none',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Mouse glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.color}18 0%, transparent 60%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Top section — visual area */}
      <div style={{
        padding: '40px',
        background: `linear-gradient(135deg, ${project.color}15 0%, ${project.accent}08 100%)`,
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            {project.category}
          </div>
          <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '16px' }}>{project.emoji}</div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            letterSpacing: '-0.01em',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: project.color,
            letterSpacing: '0.05em',
          }}>
            {project.subtitle}
          </p>
        </div>

        {/* Link icons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: `1px solid ${project.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: project.color,
              textDecoration: 'none',
              background: `${project.color}11`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${project.color}33`
              e.currentTarget.style.boxShadow = `0 0 15px ${project.color}44`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${project.color}11`
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <GithubIcon />
          </a>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: `1px solid ${project.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: project.color,
            background: `${project.color}11`,
          }}>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div style={{ padding: '28px 40px 32px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'rgba(196, 181, 253, 0.75)',
          marginBottom: '24px',
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.tech.map((tech) => (
            <span key={tech} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              padding: '5px 12px',
              borderRadius: '6px',
              background: `${project.color}18`,
              border: `1px solid ${project.color}33`,
              color: project.color,
              letterSpacing: '0.05em',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.proj-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
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
    <section id="projects" ref={sectionRef} className="section-wrapper" style={{ background: 'rgba(10, 10, 26, 0.5)' }}>
      <div className="orb" style={{ width: '400px', height: '400px', background: '#a855f7', left: '30%', top: '-100px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="proj-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: '12px' }}>
            <span className="section-tag">04. Projects</span>
          </div>
          <h2 className="proj-reveal gradient-text-soft" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>
            Things I've Built
          </h2>
          <p className="proj-reveal" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s',
            maxWidth: '500px',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'rgba(196, 181, 253, 0.65)',
          }}>
            A selection of projects I've built — each designed to solve real problems with clean code and thoughtful UX.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="proj-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: `all 0.7s ease ${0.3 + i * 0.15}s`,
              }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="proj-reveal" style={{
          opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.7s',
          textAlign: 'center',
          marginTop: '56px',
        }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/Manav Tailor"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <GithubIcon />
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}

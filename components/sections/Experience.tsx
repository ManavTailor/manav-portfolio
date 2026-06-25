'use client'
import { useRef, useEffect, useState } from 'react'
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react'

const experiences = [
  {
    title: 'Software Developer',
    company: 'TDC Consultancy Pvt Ltd',
    location: 'Udaipur, India',
    period: 'Aug 2023 – Present',
    type: 'Full-time',
    color: '#7c3aed',
    accentColor: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #0d0520 60%, #05050f 100%)',
    emoji: '💻',
    tag: '01',
    bullets: [
      'Developing web & mobile applications to create top-tier digital experiences.',
      'Enhancing user experience and application performance.',
      'Built expertise in React, Node.js, and UI/database tools in full-time role.',
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'Figma', 'TypeScript'],
  },
  {
    title: 'Salesforce Intern',
    company: 'TechForce Services',
    location: 'Hyderabad, India',
    period: 'Apr 2023 – Aug 2023',
    type: 'Internship',
    color: '#d946ef',
    accentColor: '#e879f9',
    bgGradient: 'linear-gradient(135deg, #2a0a2e 0%, #1a0520 60%, #05050f 100%)',
    emoji: '☁️',
    tag: '02',
    bullets: [
      'Learned Salesforce Administration Platform and performed hands-on tool usage.',
      'Completed tasks on Trailhead to develop new Salesforce skills.',
      'Contributed to transformative IT solutions in a global consulting environment.',
    ],
    skills: ['Salesforce', 'CRM', 'Trailhead', 'Administration'],
  },
  {
    title: 'Web Developer Intern',
    company: 'CodePlanet Technologies Pvt Ltd',
    location: 'Jaipur, India',
    period: 'Jun 2022 – Nov 2022',
    type: 'Internship',
    color: '#06b6d4',
    accentColor: '#22d3ee',
    bgGradient: 'linear-gradient(135deg, #030f1a 0%, #051520 60%, #05050f 100%)',
    emoji: '🌐',
    tag: '03',
    bullets: [
      'Learned Web Application development fundamentals from the ground up.',
      'Mastered Python and Django frameworks for backend web development.',
      'Developed and deployed functional web applications using Python.',
    ],
    skills: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
  },
]

const TOTAL = experiences.length

export default function Experience() {
  const outerRef = useRef<HTMLDivElement>(null)   // tall scrollable wrapper
  const stickyRef = useRef<HTMLDivElement>(null)  // 100vh pinned viewport

  // 0..1 scroll progress within the sticky zone
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  /* ── Scroll driver ─────────────────────────────────────── */
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const outer = outerRef.current
      if (!outer) return

      const rect = outer.getBoundingClientRect()
      // scrollable = total height − 1 viewport
      const scrollable = outer.offsetHeight - window.innerHeight
      // how far we've scrolled past the section's top edge
      const scrolled = Math.max(0, -rect.top)
      const p = scrollable > 0 ? Math.min(1, scrolled / scrollable) : 0

      setProgress(p)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    tick() // init
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* ── Visibility trigger ────────────────────────────────── */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (outerRef.current) io.observe(outerRef.current)
    return () => io.disconnect()
  }, [])

  /* ── Active card (smooth float) ────────────────────────── */
  const activeFloat = progress * (TOTAL - 1)   // 0 → TOTAL-1
  const activeIndex = Math.round(activeFloat)

  /* ── Per-card 3D transform ─────────────────────────────── */
  const getCardTransform = (i: number): React.CSSProperties => {
    const offset  = i - activeFloat          // negative = past, positive = upcoming
    const abs     = Math.abs(offset)

    const translateX =  offset  * 62        // % — fan to left/right
    const translateZ = -abs     * 260       // px — depth
    const rotateY    =  offset  * -22       // deg — tilt
    const translateY =  abs * abs * 2.5     // % — slight arc downward
    const scale      = Math.max(0.6, 1 - abs * 0.13)
    const opacity    = Math.max(0,   1 - abs * 0.48)

    return {
      transform: `
        translateX(${translateX}%)
        translateY(${translateY}%)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex: TOTAL - Math.round(abs * 10),
      transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease',
      pointerEvents: abs < 0.55 ? 'auto' : 'none',
    }
  }

  const activeExp = experiences[activeIndex] ?? experiences[0]

  /* ── Jump to card on dot click ─────────────────────────── */
  const jumpTo = (i: number) => {
    const outer = outerRef.current
    if (!outer) return
    const scrollable = outer.offsetHeight - window.innerHeight
    const target = outer.offsetTop + (i / (TOTAL - 1)) * scrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    /*
      OUTER — tall box that provides scroll length.
      position:relative, NO overflow:hidden (that would break sticky).
      Height = TOTAL × 100vh so each card gets 1 full viewport of scroll.
    */
    <div
      ref={outerRef}
      id="experience"
      style={{
        position: 'relative',
        height: `${TOTAL * 100}vh`,
        // no overflow:hidden here — it breaks sticky!
      }}
    >
      {/*
        STICKY VIEWPORT — pins to top of screen.
        Stays fixed until outer div has fully scrolled past.
      */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',          // safe here — only clips the pinned child
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.09) 0%, transparent 55%), #05050f',
        }}
      >
        {/* Ambient orbs */}
        <div className="orb" style={{ width: '500px', height: '500px', background: '#7c3aed', right: '-120px', top: '-120px', opacity: 0.08 }} />
        <div className="orb" style={{ width: '380px', height: '380px', background: '#d946ef', left: '-100px', bottom: '-80px', opacity: 0.07, animationDelay: '5s' }} />

        {/* ── TOP BAR ──────────────────────────────────── */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '52px 60px 0',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.7s ease',
        }}>
          <div>
            <span className="section-tag" style={{ display: 'block', marginBottom: '8px' }}>
              03. Experience
            </span>
            <h2 className="gradient-text-soft" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Where I've Worked
            </h2>
          </div>

          {/* Dot nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '6px' }}>
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${exp.company}`}
                style={{
                  width: activeIndex === i ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeIndex === i ? exp.color : 'rgba(139,92,246,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                  boxShadow: activeIndex === i ? `0 0 14px ${exp.color}99` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── 3D CARD STAGE ────────────────────────────── */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}>
          {experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 'min(540px, 88vw)',
                ...getCardTransform(i),
              }}
            >
              {/* ── CARD ───────────────────────────────── */}
              <div style={{
                background: exp.bgGradient,
                border: `1px solid ${activeIndex === i ? exp.color + '55' : exp.color + '18'}`,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: activeIndex === i
                  ? `0 0 90px ${exp.color}44, 0 40px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)`
                  : `0 16px 48px rgba(0,0,0,0.45)`,
                transition: 'box-shadow 0.55s ease, border-color 0.55s ease',
              }}>

                {/* Top gradient line */}
                <div style={{
                  height: '2.5px',
                  background: `linear-gradient(90deg, transparent 0%, ${exp.color} 30%, ${exp.accentColor} 70%, transparent 100%)`,
                  opacity: activeIndex === i ? 1 : 0.25,
                  transition: 'opacity 0.55s ease',
                }} />

                <div style={{ padding: '34px 40px 38px' }}>

                  {/* Card header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '58px', height: '58px', borderRadius: '16px',
                        background: `${exp.color}20`,
                        border: `1px solid ${exp.color}44`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.7rem', flexShrink: 0,
                        boxShadow: activeIndex === i ? `0 0 28px ${exp.color}55` : 'none',
                        transition: 'box-shadow 0.55s ease',
                      }}>
                        {exp.emoji}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.62rem', color: exp.color,
                          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '5px',
                        }}>
                          {exp.tag} / {exp.type}
                        </div>
                        <h3 style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '1.2rem', fontWeight: 700,
                          color: '#f3f0ff', lineHeight: 1.15,
                        }}>
                          {exp.title}
                        </h3>
                      </div>
                    </div>

                    {/* Period badge */}
                    <div style={{
                      background: `${exp.color}12`,
                      border: `1px solid ${exp.color}30`,
                      borderRadius: '10px', padding: '8px 14px', textAlign: 'right', flexShrink: 0,
                    }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: exp.accentColor }}>
                        {exp.company.split(' ').slice(0, 2).join(' ')}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div style={{
                    display: 'flex', gap: '20px', flexWrap: 'wrap',
                    marginBottom: '22px', paddingBottom: '22px',
                    borderBottom: `1px solid ${exp.color}20`,
                  }}>
                    {[
                      { icon: Briefcase, text: exp.company },
                      { icon: MapPin,    text: exp.location },
                      { icon: Calendar,  text: exp.period },
                    ].map(({ icon: Icon, text }) => (
                      <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <Icon size={12} color={exp.color} /> {text}
                      </span>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: '12px', padding: '5px 0', fontSize: '0.85rem', color: 'rgba(196,181,253,0.75)', lineHeight: 1.6 }}>
                        <span style={{ color: exp.color, flexShrink: 0, fontSize: '0.5rem', marginTop: '7px' }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Skills row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                      {exp.skills.map((s) => (
                        <span key={s} style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.66rem', padding: '4px 11px', borderRadius: '6px',
                          background: `${exp.color}16`, border: `1px solid ${exp.color}30`,
                          color: exp.accentColor, letterSpacing: '0.04em',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    {i < TOTAL - 1 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: exp.color, opacity: 0.7 }}>
                        scroll for next <ArrowRight size={11} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────── */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 60px 36px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.5s',
        }}>
          {/* Counter */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: activeExp.color, transition: 'color 0.55s ease' }}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            &nbsp;/ {String(TOTAL).padStart(2, '0')}
          </div>

          {/* Progress track */}
          <div style={{ flex: 1, maxWidth: '240px', margin: '0 28px', height: '2px', background: 'rgba(139,92,246,0.12)', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${activeExp.color}, ${activeExp.accentColor})`,
              boxShadow: `0 0 8px ${activeExp.color}99`,
              borderRadius: '1px',
              transition: 'width 0.05s linear, background 0.55s ease, box-shadow 0.55s ease',
            }} />
          </div>

          {/* Scroll hint — fades when done */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: activeExp.color,
            opacity: progress < 0.92 ? 0.65 : 0,
            transition: 'opacity 0.4s ease, color 0.55s ease',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ display: 'inline-block', animation: 'float 1.4s ease-in-out infinite' }}>↓</span>
            scroll
          </div>
        </div>
      </div>
    </div>
  )
}

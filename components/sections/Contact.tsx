'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react'

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.contact-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection.')
    }
  }

  const inputStyle = {
    padding: '14px 18px',
    fontSize: '0.9rem',
    background: 'rgba(18, 18, 35, 0.8)',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
    transition: 'all 0.3s ease',
    width: '100%',
    display: 'block',
  } as React.CSSProperties

  return (
    <section id="contact" ref={sectionRef} className="section-wrapper" style={{ background: 'rgba(10, 10, 26, 0.5)' }}>
      <div className="orb" style={{ width: '350px', height: '350px', background: '#7c3aed', left: '-80px', top: '20%' }} />
      <div className="orb" style={{ width: '250px', height: '250px', background: '#d946ef', right: '-60px', bottom: '20%', animationDelay: '3s' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="contact-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: '12px' }}>
            <span className="section-tag">06. Contact</span>
          </div>
          <h2 className="contact-reveal gradient-text-soft" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.1s',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>
            Let's Build Something
          </h2>
          <p className="contact-reveal" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s',
            maxWidth: '480px',
            margin: '0 auto',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'rgba(196, 181, 253, 0.65)',
          }}>
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Send a message and I'll get back to you as soon as possible!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px', alignItems: 'start' }}>
          {/* Left — Info */}
          <div>
            <div className="contact-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.2s', marginBottom: '32px' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(196, 181, 253, 0.75)', marginBottom: '32px' }}>
                I'm currently <span style={{ color: '#22c55e', fontWeight: 600 }}>open to new opportunities</span> and collaborations. 
                Whether you're a company looking to hire or just want to say hi — my inbox is always open!
              </p>

              {/* Contact details */}
              {[
                { icon: Mail, label: 'Email', value: 'tailormanav68@gmail.com', href: 'mailto:tailormanav68@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 7727045534', href: 'tel:+917727045534' },
                { icon: MapPin, label: 'Location', value: 'Udaipur, Rajasthan, India', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    color: 'inherit',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(124, 58, 237, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="var(--purple-pastel)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="contact-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.4s' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Find me on
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
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
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--purple-pastel)',
                      textDecoration: 'none',
                      background: 'rgba(18, 18, 35, 0.5)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--purple-light)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-reveal glass-card" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease 0.3s',
            padding: '40px',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={56} color="#22c55e" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'rgba(196, 181, 253, 0.7)', lineHeight: 1.7 }}>
                  Thanks for reaching out, I'll get back to you soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="glow-btn"
                  style={{ padding: '12px 28px', fontSize: '0.875rem', marginTop: '24px' }}
                >
                  <span>Send Another</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Manav Tailor"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--purple-light)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(139, 92, 246, 0.25)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--purple-light)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(139, 92, 246, 0.25)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="subject" style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--purple-light)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.25)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="message" style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--purple-light)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.25)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {status === 'error' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    marginBottom: '16px',
                    color: '#fca5a5',
                    fontSize: '0.85rem',
                  }}>
                    <AlertCircle size={16} color="#f87171" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="glow-btn"
                  style={{ padding: '14px 32px', fontSize: '0.9rem', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {status === 'loading' ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .grid-contact { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

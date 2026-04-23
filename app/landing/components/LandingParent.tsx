'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────
   HOOK: useInView
───────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─────────────────────────────────────────
   PLATFORM ICONS
───────────────────────────────────────── */
const PlatformIcons = {
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig)"/>
      <defs>
        <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529"/><stop offset="0.5" stopColor="#DD2A7B"/><stop offset="1" stopColor="#515BD4"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  whatsapp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#25D366" opacity="0.15"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5"/>
      <path d="M8.5 8.5c.2-.5.7-.8 1.2-.8.3 0 .5.1.7.3l1.2 2.4c.1.3.1.6-.1.8l-.5.6c.4.8 1.1 1.5 1.9 1.9l.6-.5c.2-.2.5-.2.8-.1l2.4 1.2c.2.1.3.4.3.7 0 .5-.3 1-.8 1.2-1.8.8-5-1-6.3-2.3C8.4 12.7 7.7 10.3 8.5 8.5z" fill="#25D366"/>
    </svg>
  ),
  messenger: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.29 2 11.5c0 2.85 1.37 5.4 3.52 7.12V22l3.36-1.86c.9.25 1.85.36 2.82.36 5.523 0 10-4.29 10-9.5S17.523 2 12 2z" fill="#0099FF" opacity="0.15"/>
      <path d="M12 2C6.477 2 2 6.29 2 11.5c0 2.85 1.37 5.4 3.52 7.12V22l3.36-1.86c.9.25 1.85.36 2.82.36 5.523 0 10-4.29 10-9.5S17.523 2 12 2z" stroke="#0099FF" strokeWidth="1.5"/>
      <path d="M6 14l3.75-4 2.5 2.5L16 9l-3.75 4-2.5-2.5L6 14z" fill="#0099FF"/>
    </svg>
  ),
  telegram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#229ED9" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#229ED9" strokeWidth="1.5"/>
      <path d="M17.5 7L5.5 11.5l4 1.5 1.5 4.5 2-2.5 3.5 2.5L17.5 7z" stroke="#229ED9" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" opacity="0.3"/>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <path d="M17 7h-2.5l-3 4-2.5-4H6l4.5 6L6 17h2.5l3-4 2.5 4H18l-4.5-6L17 7z" fill="white"/>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" opacity="0.15"/>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="#0A66C2" strokeWidth="1.5"/>
      <path d="M7 10v7M7 7v.5M11 17v-3.5c0-1 .7-2 2-2s2 1 2 2V17M11 10v7" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

/* ─────────────────────────────────────────
   THREE.JS PARTICLE CANVAS
───────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight

    canvas.width = W
    canvas.height = H

    // Particles
    const COUNT = 120
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number; pulseSpeed: number }
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }))

    // Mouse
    let mouse = { x: W / 2, y: H / 2 }
    const onMouseMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMouseMove)

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize)

    const TEAL = '104,191,205'
    const CONNECT_DIST = 120

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${TEAL},${pulseAlpha})`
        ctx.fill()
      }

      // Connect lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${TEAL},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
        // Mouse repulsion
        const mdx = particles[i].x - mouse.x
        const mdy = particles[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 100) {
          const force = (1 - mdist / 100) * 0.8
          particles[i].vx += (mdx / mdist) * force * 0.05
          particles[i].vy += (mdy / mdist) * force * 0.05
        }
        // Damping
        particles[i].vx *= 0.99
        particles[i].vy *= 0.99
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

/* ─────────────────────────────────────────
   POSTER PARALLAX SCENE
   — The poster is pinned full-screen.
   — Hero text floats over it with parallax.
   — A frosted "panel" section slides UP over the poster as you scroll.
   — After the panel covers it fully, the poster scrolls away with everything else.
───────────────────────────────────────── */
function PosterScene({ children }: { children: React.ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)
  const [scrollRatio, setScrollRatio] = useState(0) // 0→1 as panel slides up

  useEffect(() => {
    const onScroll = () => {
      const scene = sceneRef.current
      if (!scene) return
      const rect = scene.getBoundingClientRect()
      const total = scene.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const ratio = Math.max(0, Math.min(1, scrolled / (total * 0.6)))
      setScrollRatio(ratio)

      // Poster parallax
      if (posterRef.current) {
        const parallax = scrolled * 0.25
        posterRef.current.style.transform = `translateY(${parallax}px) scale(1.05)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={sceneRef} style={{ position: 'relative', height: '280vh' }}>
      {/* Sticky container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Poster layer — always behind */}
        <div
          ref={posterRef}
          style={{
            position: 'absolute', inset: 0,
            zIndex: 1,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        >
          <Image
            src="/images/Linkra-poster.png"
            alt="Linkra"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Dark overlay that deepens as panel slides up */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `rgba(10,22,40,${0.35 + scrollRatio * 0.5})`,
            transition: 'background 0.1s',
          }} />
        </div>

        {/* Hero content layer — fades out as panel arrives */}
        <div style={{
          position: 'absolute', inset: 0,
          zIndex: 2,
          opacity: Math.max(0, 1 - scrollRatio * 2.5),
          transform: `translateY(${-scrollRatio * 80}px)`,
          transition: 'opacity 0.05s linear, transform 0.05s linear',
          pointerEvents: scrollRatio > 0.3 ? 'none' : 'auto',
        }}>
          {children}
        </div>

        {/* Rising panel — slides up from bottom */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          bottom: 0,
          zIndex: 3,
          height: `${100 + scrollRatio * 120}vh`,
          transform: `translateY(${(1 - scrollRatio) * 100}%)`,
          transition: 'transform 0.05s linear',
          background: 'linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.97) 8%, #0a1628 18%)',
          borderTopLeftRadius: scrollRatio < 0.05 ? '0px' : '0px',
        }}>
          {/* Glowing line at panel top edge */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '70%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.6), transparent)',
            opacity: Math.min(1, scrollRatio * 5),
          }} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'all 0.5s',
      background: scrolled ? 'rgba(10,22,40,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(104,191,205,0.07)' : 'none',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem',
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/images/logo.svg" alt="Linkra" width={38} height={38} />
          <span style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
          }}>Linkra</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              color: 'rgba(200,221,226,0.6)', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.01em',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#68bfcd')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,221,226,0.6)')}
            >{link.label}</a>
          ))}
        </div>

        {/* CTA group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <a href="#" style={{
            color: 'rgba(200,221,226,0.5)', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,221,226,0.5)')}
          >Log in</a>
          <a href="#waitlist" style={{
            padding: '0.55rem 1.35rem',
            background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
            color: '#0a1628', borderRadius: 50, textDecoration: 'none',
            fontSize: '0.82rem', fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.01em',
            transition: 'box-shadow 0.3s, transform 0.2s',
            display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 28px rgba(104,191,205,0.45)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          >Get Early Access</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(200,221,226,0.7)', padding: 8,
          display: 'none',
        }} className="mobile-menu-btn" aria-label="Menu">
          {menuOpen
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          }
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        overflow: 'hidden',
        maxHeight: menuOpen ? 280 : 0,
        transition: 'max-height 0.3s',
        background: 'rgba(10,22,40,0.98)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(104,191,205,0.07)',
      }}>
        <div style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'rgba(200,221,226,0.7)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif" }}>
              {link.label}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setMenuOpen(false)} style={{
            padding: '0.7rem', textAlign: 'center',
            background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
            color: '#0a1628', borderRadius: 12, textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}>Get Early Access</a>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────
   HERO (sits inside PosterScene)
───────────────────────────────────────── */
function HeroContent() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const platforms = [
    { name: 'Instagram', icon: PlatformIcons.instagram },
    { name: 'WhatsApp', icon: PlatformIcons.whatsapp },
    { name: 'Messenger', icon: PlatformIcons.messenger },
    { name: 'Telegram', icon: PlatformIcons.telegram },
    { name: 'X / Twitter', icon: PlatformIcons.twitter },
    { name: 'LinkedIn', icon: PlatformIcons.linkedin },
  ]

  return (
    <div style={{
      height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '5rem 2rem 2rem',
      position: 'relative', zIndex: 10,
    }}>
      {/* Live badge */}
      <div className="fade-in-up" style={{ animationDelay: '0s' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px',
          border: '1px solid rgba(104,191,205,0.3)',
          background: 'rgba(104,191,205,0.08)',
          borderRadius: 50,
          backdropFilter: 'blur(12px)',
          marginBottom: '1.75rem',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#68bfcd', display: 'inline-block', animation: 'pingSlow 2.5s ease-in-out infinite' }} />
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#68bfcd',
            fontFamily: "'DM Sans', sans-serif",
          }}>Now in Beta · Free to Join</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="fade-in-up" style={{
        animationDelay: '0.1s',
        fontFamily: "'Lora', Georgia, serif",
        fontSize: 'clamp(3rem, 7vw, 6rem)',
        fontWeight: 700, lineHeight: 1.04,
        marginBottom: '0.1em',
      }}>
        <span style={{ display: 'block', color: '#fff', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>All Your DMs.</span>
        <span style={{
          display: 'block',
          background: 'linear-gradient(135deg, #68bfcd 20%, #b8eaf0 55%, #4aa8b8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(104,191,205,0.4))',
        }}>One Inbox.</span>
      </h1>

      {/* Sub */}
      <p className="fade-in-up" style={{
        animationDelay: '0.2s',
        maxWidth: 540,
        color: 'rgba(200,221,226,0.65)',
        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
        lineHeight: 1.75,
        margin: '1.5rem auto 0',
        fontFamily: "'DM Sans', sans-serif",
        textShadow: '0 2px 20px rgba(0,0,0,0.7)',
      }}>
        Linkra connects your Instagram, WhatsApp, Messenger, Telegram, X, and LinkedIn DMs into one unified inbox — so you never miss a message again.
      </p>

      {/* Platform pills */}
      <div className="fade-in-up" style={{
        animationDelay: '0.28s',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10,
        margin: '2rem 0',
      }}>
        {platforms.map(p => (
          <span key={p.name} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 13px',
            border: '1px solid rgba(104,191,205,0.18)',
            background: 'rgba(10,22,40,0.55)',
            borderRadius: 50,
            backdropFilter: 'blur(10px)',
            fontSize: '0.75rem', color: 'rgba(200,221,226,0.55)',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {p.icon} {p.name}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div id="waitlist" className="fade-in-up" style={{ animationDelay: '0.35s', width: '100%', maxWidth: 420 }}>
        {submitted ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '1rem 1.5rem',
            border: '1px solid rgba(104,191,205,0.35)',
            background: 'rgba(104,191,205,0.1)',
            borderRadius: 14, color: '#68bfcd', fontWeight: 600,
            backdropFilter: 'blur(12px)',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#68bfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            You're on the list! We'll be in touch.
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }}
            style={{ display: 'flex', gap: 10 }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address" required
              style={{
                flex: 1, padding: '0.85rem 1.25rem',
                background: 'rgba(10,22,40,0.6)',
                border: '1px solid rgba(104,191,205,0.2)',
                borderRadius: 12, color: '#fff',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none', backdropFilter: 'blur(12px)',
              }}
            />
            <button type="submit" style={{
              padding: '0.85rem 1.4rem',
              background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
              border: 'none', borderRadius: 12,
              color: '#0a1628', fontSize: '0.85rem', fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'box-shadow 0.3s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(104,191,205,0.5)'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
            >Join Waitlist →</button>
          </form>
        )}
        <p style={{
          marginTop: 10, fontSize: '0.7rem', color: 'rgba(200,221,226,0.2)',
          fontFamily: "'DM Sans', sans-serif", textAlign: 'center',
        }}>No credit card needed. Free plan available forever.</p>
      </div>

      {/* Scroll hint */}
      <div className="fade-in-up" style={{ animationDelay: '0.6s', marginTop: '2rem' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(200,221,226,0.25)', fontSize: '0.7rem',
          fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          <span>Scroll to explore</span>
          <div style={{ animation: 'bounceDown 1.8s ease-in-out infinite' }}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <rect x="6" y="0" width="4" height="10" rx="2" stroke="rgba(104,191,205,0.4)" strokeWidth="1.5"/>
              <circle cx="8" cy="4" r="1.5" fill="rgba(104,191,205,0.6)" style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}/>
              <path d="M4 15l4 4 4-4" stroke="rgba(104,191,205,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   INBOX MOCKUP
───────────────────────────────────────── */
function InboxMockup() {
  const { ref, visible } = useInView(0.1)
  const messages = [
    { platformIcon: PlatformIcons.instagram, name: 'Sarah K.', msg: 'Hey! Loved your latest post 🔥', time: '2m', color: '#DD2A7B', unread: true },
    { platformIcon: PlatformIcons.whatsapp, name: 'Mom', msg: 'Are you coming home this weekend?', time: '5m', color: '#25D366', unread: true },
    { platformIcon: PlatformIcons.messenger, name: 'Alex R.', msg: "Got your message — let me check!", time: '12m', color: '#0099FF', unread: false },
    { platformIcon: PlatformIcons.whatsapp, name: 'Design Team', msg: 'Figma file updated, review by EOD', time: '1h', color: '#25D366', unread: true },
    { platformIcon: PlatformIcons.instagram, name: 'Jake W.', msg: 'Thanks for the collab 🙏', time: '2h', color: '#DD2A7B', unread: false },
    { platformIcon: PlatformIcons.telegram, name: 'Startup News', msg: 'New funding rounds in AI space...', time: '3h', color: '#229ED9', unread: false },
  ]

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(48px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      maxWidth: 700, margin: '0 auto', position: 'relative',
    }}>
      {/* Glow under mockup */}
      <div style={{
        position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
        width: '65%', height: 60,
        background: '#68bfcd', filter: 'blur(50px)', opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div style={{
        borderRadius: 22,
        border: '1px solid rgba(104,191,205,0.1)',
        background: 'rgba(15,31,53,0.88)',
        backdropFilter: 'blur(32px)',
        overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(104,191,205,0.07), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        {/* Browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '10px 16px',
          borderBottom: '1px solid rgba(104,191,205,0.07)',
          background: 'rgba(10,22,40,0.7)',
        }}>
          {[['#ff6058','#ffbd2e','#28ca42']].flat().map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.6 }} />
          ))}
          <div style={{
            flex: 1, margin: '0 12px',
            padding: '4px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            fontSize: '0.68rem', fontFamily: 'monospace',
            color: 'rgba(104,191,205,0.38)',
          }}>app.linkra.io/inbox</div>
        </div>

        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <div style={{
            width: 188, borderRight: '1px solid rgba(104,191,205,0.07)',
            padding: 12, flexShrink: 0,
          }}>
            <p style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(104,191,205,0.3)',
              padding: '0 8px', marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>Connected</p>
            {[
              { name: 'Instagram', icon: PlatformIcons.instagram, count: 3 },
              { name: 'WhatsApp', icon: PlatformIcons.whatsapp, count: 7 },
              { name: 'Messenger', icon: PlatformIcons.messenger, count: 1 },
              { name: 'Telegram', icon: PlatformIcons.telegram, count: 0 },
              { name: 'X / Twitter', icon: PlatformIcons.twitter, count: 2 },
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 8px', borderRadius: 10, cursor: 'default',
                transition: 'background 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  {p.icon}
                  <span style={{ fontSize: '0.73rem', color: 'rgba(200,221,226,0.5)', fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                </div>
                {p.count > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, padding: '0 4px',
                    background: '#68bfcd', color: '#0a1628',
                    borderRadius: 50, fontSize: '0.6rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{p.count}</span>
                )}
              </div>
            ))}
          </div>

          {/* Feed */}
          <div style={{ flex: 1, padding: 12 }}>
            <p style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(104,191,205,0.3)',
              padding: '0 8px', marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>All Messages · 13 unread</p>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 8px', borderRadius: 12, marginBottom: 2,
                background: m.unread ? 'rgba(104,191,205,0.05)' : 'transparent',
                cursor: 'default', transition: 'background 0.2s',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(104,191,205,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700, color: '#68bfcd',
                    fontFamily: "'Lora', Georgia, serif",
                  }}>{m.name[0]}</div>
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    width: 15, height: 15, borderRadius: '50%',
                    background: '#0f1f35',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ transform: 'scale(0.6)' }}>{m.platformIcon}</div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{
                      fontSize: '0.73rem',
                      fontWeight: m.unread ? 600 : 400,
                      color: m.unread ? '#fff' : 'rgba(200,221,226,0.38)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{m.name}</span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(200,221,226,0.18)', fontFamily: "'DM Sans', sans-serif" }}>{m.time}</span>
                  </div>
                  <p style={{
                    fontSize: '0.68rem', color: 'rgba(200,221,226,0.28)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{m.msg}</p>
                </div>
                {m.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   WHAT IS LINKRA
───────────────────────────────────────── */
function WhatIsLinkra() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} style={{ padding: '8rem 2rem 6rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 860, margin: '0 auto', textAlign: 'center',
      }}>
        <SectionLabel>What is Linkra?</SectionLabel>
        <h2 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 700, color: '#fff', lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          Stop app-switching.<br />Start actually responding.
        </h2>
        <p style={{
          color: 'rgba(200,221,226,0.52)',
          fontSize: '1.08rem', lineHeight: 1.8,
          maxWidth: 680, margin: '0 auto',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Linkra is a unified messaging hub that securely connects your social media DMs across Instagram, WhatsApp, Facebook Messenger, Telegram, X (Twitter), and LinkedIn — giving you one clean inbox to read, reply, and manage all your conversations. No more missed messages buried in six different apps.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 10, marginTop: '2.5rem',
        }}>
          {['Creators & Influencers', 'Small Business Owners', 'Customer Support Teams', 'Freelancers', 'Social Media Managers', 'Entrepreneurs'].map((tag, i) => (
            <span key={tag} style={{
              padding: '7px 18px',
              border: '1px solid rgba(104,191,205,0.16)',
              background: 'rgba(104,191,205,0.055)',
              borderRadius: 50,
              fontSize: '0.82rem', color: 'rgba(104,191,205,0.72)',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'transform 0.2s, border-color 0.2s',
              animationDelay: `${i * 0.05}s`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PLATFORMS
───────────────────────────────────────── */
const platformList = [
  { name: 'Instagram', desc: 'DMs, story replies & message requests', icon: PlatformIcons.instagram, color: '#DD2A7B', status: 'Live' },
  { name: 'WhatsApp', desc: 'Personal & business messages, groups', icon: PlatformIcons.whatsapp, color: '#25D366', status: 'Live' },
  { name: 'Messenger', desc: 'Facebook DMs & group conversations', icon: PlatformIcons.messenger, color: '#0099FF', status: 'Live' },
  { name: 'Telegram', desc: 'Chats, channels & bot messages', icon: PlatformIcons.telegram, color: '#229ED9', status: 'Live' },
  { name: 'X / Twitter', desc: 'Direct messages & conversation threads', icon: PlatformIcons.twitter, color: '#ffffff', status: 'Beta' },
  { name: 'LinkedIn', desc: 'Professional messages & InMail', icon: PlatformIcons.linkedin, color: '#0A66C2', status: 'Coming Soon' },
]

function Platforms() {
  const { ref, visible } = useInView()
  return (
    <section id="platforms" ref={ref} style={{ padding: '5rem 2rem 7rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 1140, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <SectionLabel>Supported Platforms</SectionLabel>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Connect every platform you use
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(200,221,226,0.42)', fontSize: '1.05rem', maxWidth: 460, margin: '1rem auto 0', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            Linkra uses official platform APIs and secure OAuth — we never store your passwords.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {platformList.map((p, i) => (
            <PlatformCard key={p.name} p={p} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformCard({ p, delay }: { p: typeof platformList[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const statusColor = p.status === 'Live' ? '#68bfcd' : p.status === 'Beta' ? '#F59E0B' : 'rgba(255,255,255,0.3)'
  const statusBorder = p.status === 'Live' ? 'rgba(104,191,205,0.3)' : p.status === 'Beta' ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        borderRadius: 20,
        border: `1px solid ${hovered ? 'rgba(104,191,205,0.22)' : 'rgba(104,191,205,0.08)'}`,
        background: hovered ? 'rgba(15,31,53,0.75)' : 'rgba(15,31,53,0.45)',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(104,191,205,0.1)' : 'none',
        transition: `all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${delay}ms`,
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(104,191,205,0.04), transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.3s',
        }}>
          <div style={{ transform: 'scale(1.2)' }}>{p.icon}</div>
        </div>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 50,
          border: `1px solid ${statusBorder}`, color: statusColor,
          fontFamily: "'DM Sans', sans-serif",
        }}>{p.status}</span>
      </div>
      <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{p.name}</h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.36)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
    </div>
  )
}

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
const featureData = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="2" y="6" width="22" height="16" rx="3" stroke="#68bfcd" strokeWidth="1.8"/><path d="M2 11h22" stroke="#68bfcd" strokeWidth="1.3" opacity="0.4"/><rect x="5" y="14" width="6" height="1.5" rx="0.75" fill="#68bfcd" opacity="0.8"/><rect x="5" y="17" width="4" height="1.5" rx="0.75" fill="#68bfcd" opacity="0.4"/><circle cx="20" cy="8" r="4" fill="#DD2A7B"/><path d="M18.5 8l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Unified Inbox', desc: 'All messages from all platforms in one chronological feed. Filter by platform, read status, or keyword — respond without ever switching apps.', tag: 'Core',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#68bfcd" strokeWidth="1.8"/><path d="M9 13l2.5 2.5L17 10" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 3v3M13 20v3M3 13h3M20 13h3" stroke="#68bfcd" strokeWidth="1.3" opacity="0.3" strokeLinecap="round"/></svg>,
    title: 'OAuth-Only Login', desc: 'We connect via official OAuth and verified API access. Your passwords are never seen or stored by Linkra — ever.', tag: 'Security',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="4" width="20" height="18" rx="3" stroke="#68bfcd" strokeWidth="1.8"/><path d="M7 9h12M7 13h8M7 17h5" stroke="#68bfcd" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/><circle cx="21" cy="6" r="4" fill="#4aa8b8"/><path d="M19.5 6h3M21 4.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    title: 'Smart Reply', desc: 'AI-assisted reply suggestions based on conversation context. Draft, edit, and send responses to any platform directly from Linkra.', tag: 'AI',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="7" r="4" stroke="#68bfcd" strokeWidth="1.8"/><path d="M5 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 3l2 2-2 2" stroke="#a8d8e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 5h-4" stroke="#a8d8e0" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Contact Profiles', desc: 'Auto-merge the same contact across platforms into one unified profile. See their full history regardless of which app they messaged from.', tag: 'Pro',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#68bfcd" strokeWidth="1.8"/><path d="M13 7v6l4 2" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="6" r="3" fill="#25D366"/><path d="M18.8 6l1 1 1.5-1.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Real-Time Sync', desc: 'Messages appear in your inbox within seconds. Push notifications keep you updated the moment someone reaches out, on any platform.', tag: 'Core',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="3" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8"/><rect x="14" y="3" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8" opacity="0.6"/><rect x="3" y="14" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8" opacity="0.6"/><rect x="14" y="14" width="9" height="9" rx="2" stroke="#4aa8b8" strokeWidth="1.8"/><path d="M16.5 18.5l1.5 1.5 3-3" stroke="#4aa8b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Team Inbox', desc: 'Assign conversations to teammates, add internal notes, and set status tags. Perfect for customer support teams managing DMs across multiple brand accounts.', tag: 'Pro',
  },
]

function Features() {
  const { ref, visible } = useInView()
  return (
    <section id="features" ref={ref} style={{ padding: '5rem 2rem 7rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 1140, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <SectionLabel>Everything You Need</SectionLabel>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Built for people who live in their DMs
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(200,221,226,0.42)', fontSize: '1.05rem', maxWidth: 440, margin: '1rem auto 0', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            Powerful enough for teams. Simple enough for solo creators.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {featureData.map((f, i) => <FeatureCard key={f.title} f={f} delay={i * 55} />)}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ f, delay }: { f: typeof featureData[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem', borderRadius: 20, cursor: 'default',
        border: `1px solid ${hovered ? 'rgba(104,191,205,0.2)' : 'rgba(104,191,205,0.08)'}`,
        background: 'rgba(15,31,53,0.45)',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(104,191,205,0.05)' : 'none',
        transition: `all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${delay}ms`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: 'rgba(104,191,205,0.08)', border: '1px solid rgba(104,191,205,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: hovered ? '0 0 24px rgba(104,191,205,0.18)' : 'none',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}>{f.icon}</div>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '3px 9px', borderRadius: 50,
          border: '1px solid rgba(104,191,205,0.2)', color: 'rgba(104,191,205,0.5)',
          fontFamily: "'DM Sans', sans-serif",
        }}>{f.tag}</span>
      </div>
      <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.38)', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
      <div style={{
        position: 'absolute', bottom: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(104,191,205,0.08), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
function StatsStrip() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 920, margin: '0 auto',
      }}>
        <div style={{
          borderRadius: 28,
          border: '1px solid rgba(104,191,205,0.14)',
          padding: '3rem 2rem',
          background: 'linear-gradient(135deg, rgba(104,191,205,0.07), rgba(74,168,184,0.03))',
          backdropFilter: 'blur(24px)',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: '2rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.55), transparent)',
          }} />
          {[
            { value: '6+', label: 'Platforms connected' },
            { value: '50k+', label: 'Beta users' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '<2s', label: 'Message sync speed' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#68bfcd', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(200,221,226,0.32)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
function HowItWorks() {
  const { ref, visible } = useInView()
  const steps = [
    { num: '01', title: 'Create your Linkra account', desc: 'Sign up for free in under 60 seconds. No credit card required.' },
    { num: '02', title: 'Connect your social apps', desc: 'Authorize Linkra via official OAuth on each platform. We never touch your passwords.' },
    { num: '03', title: 'Open your unified inbox', desc: 'Every DM from every platform flows into one clean, searchable inbox — in real time.' },
    { num: '04', title: 'Reply without switching apps', desc: 'Read and respond to messages from any platform directly inside Linkra.' },
  ]
  return (
    <section ref={ref} style={{ padding: '5rem 2rem 7rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 860, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Set up in under 2 minutes
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {steps.map((s, i) => <StepCard key={s.num} s={s} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}

function StepCard({ s, delay }: { s: { num: string; title: string; desc: string }; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '1.25rem', padding: '1.5rem', borderRadius: 18,
        border: `1px solid ${hovered ? 'rgba(104,191,205,0.2)' : 'rgba(104,191,205,0.08)'}`,
        background: 'rgba(15,31,53,0.4)', backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: `all 0.3s ease ${delay}ms`,
        cursor: 'default',
      }}
    >
      <span style={{
        flexShrink: 0, width: 40, height: 40, borderRadius: 11,
        border: '1px solid rgba(104,191,205,0.25)',
        background: 'rgba(104,191,205,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Lora', Georgia, serif", fontSize: '0.82rem', fontWeight: 700, color: '#68bfcd',
      }}>{s.num}</span>
      <div>
        <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, color: '#fff', marginBottom: 6, fontSize: '0.95rem' }}>{s.title}</h3>
        <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.38)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
const plans = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Perfect for individuals who want to unify their personal DMs.',
    features: ['Connect up to 3 platforms', 'Unified inbox (30-day history)', 'Basic notifications', 'Reply from Linkra', 'Community support'],
    cta: 'Start for Free', highlight: false,
  },
  {
    name: 'Pro', price: '$9', period: '/ month',
    desc: 'For creators, freelancers, and professionals managing DMs at scale.',
    features: ['Connect all 6+ platforms', 'Full unlimited message history', 'AI-powered smart replies', 'Contact profile merging', 'Message search & filters', 'Priority push notifications', 'Priority email support'],
    cta: 'Start Pro Trial', highlight: true,
  },
  {
    name: 'Team', price: '$29', period: '/ month',
    desc: 'For customer support teams and agencies managing multiple brands.',
    features: ['Everything in Pro', 'Up to 10 team members', 'Shared team inbox', 'Conversation assignment', 'Internal notes & tagging', 'Multiple brand accounts', 'Analytics & response times', 'Dedicated account manager'],
    cta: 'Contact Sales', highlight: false,
  },
]

function Pricing() {
  const { ref, visible } = useInView()
  return (
    <section id="pricing" ref={ref} style={{ padding: '5rem 2rem 7rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 1000, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Simple, honest pricing
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(200,221,226,0.38)', fontSize: '1.05rem', fontFamily: "'DM Sans', sans-serif" }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 22, alignItems: 'start' }}>
          {plans.map((plan, i) => <PlanCard key={plan.name} plan={plan} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, delay }: { plan: typeof plans[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 22, padding: '2rem',
        border: `1px solid ${plan.highlight ? 'rgba(104,191,205,0.4)' : 'rgba(104,191,205,0.08)'}`,
        background: plan.highlight
          ? 'linear-gradient(160deg, rgba(104,191,205,0.1), rgba(74,168,184,0.04))'
          : 'rgba(15,31,53,0.45)',
        backdropFilter: 'blur(16px)',
        boxShadow: plan.highlight ? '0 0 60px rgba(104,191,205,0.1)' : hovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: `all 0.35s ease ${delay}ms`,
        position: 'relative',
        cursor: 'default',
      }}
    >
      {plan.highlight && (
        <div style={{
          position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
          padding: '4px 16px',
          background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
          borderRadius: 50, color: '#0a1628',
          fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.1em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          fontFamily: "'DM Sans', sans-serif",
        }}>Most Popular</div>
      )}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(200,221,226,0.35)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 6 }}>
          <span style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '3rem', fontWeight: 700, lineHeight: 1,
            color: plan.highlight ? '#68bfcd' : '#fff',
          }}>{plan.price}</span>
          <span style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.3)', marginBottom: 7, fontFamily: "'DM Sans', sans-serif" }}>{plan.period}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.35)', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{plan.desc}</p>
      </div>
      <ul style={{ listStyle: 'none', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {plan.features.map(feat => (
          <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <svg style={{ marginTop: 2, flexShrink: 0 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#68bfcd" opacity="0.1"/>
              <path d="M4 7l2 2 4-4" stroke="#68bfcd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.55)', lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{feat}</span>
          </li>
        ))}
      </ul>
      <a href="#waitlist" style={{
        display: 'block', width: '100%', padding: '0.875rem',
        borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, textAlign: 'center',
        textDecoration: 'none', cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        ...(plan.highlight
          ? { background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)', color: '#0a1628', border: 'none' }
          : { background: 'transparent', border: '1px solid rgba(104,191,205,0.15)', color: 'rgba(200,221,226,0.55)' }
        ),
        transition: 'box-shadow 0.3s, transform 0.2s',
      }}
      onMouseEnter={e => {
        if (plan.highlight) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(104,191,205,0.4)'
        else { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(104,191,205,0.35)'; (e.currentTarget as HTMLElement).style.color = '#68bfcd' }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none'
        if (!plan.highlight) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(104,191,205,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(200,221,226,0.55)' }
      }}
      >{plan.cta}</a>
    </div>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
  const { ref, visible } = useInView()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <section ref={ref} style={{ padding: '5rem 2rem 7rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 680, margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{
          borderRadius: 32,
          border: '1px solid rgba(104,191,205,0.2)',
          padding: '4.5rem 3rem',
          background: 'linear-gradient(160deg, rgba(104,191,205,0.09), rgba(10,22,40,0.7))',
          backdropFilter: 'blur(32px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '55%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.65), transparent)',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '45%',
            background: 'radial-gradient(ellipse at top, rgba(104,191,205,0.07), transparent 65%)',
          }} />
          <div style={{ position: 'relative' }}>
            <SectionLabel>Get Early Access</SectionLabel>
            <h2 style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.12, marginBottom: '1.25rem',
            }}>
              One inbox for<br />every conversation.
            </h2>
            <p style={{
              color: 'rgba(200,221,226,0.45)', fontSize: '1.05rem',
              marginBottom: '2.5rem', lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Join 50,000+ users already on the Linkra beta. Early members get 3 months of Pro free.
            </p>
            {submitted ? (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '0.875rem 1.5rem',
                border: '1px solid rgba(104,191,205,0.35)',
                background: 'rgba(104,191,205,0.1)',
                borderRadius: 14, color: '#68bfcd', fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#68bfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                You're in! Check your inbox shortly.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" required
                    style={{
                      flex: 1, padding: '0.875rem 1.25rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(104,191,205,0.18)',
                      borderRadius: 12, color: '#fff', fontSize: '0.875rem',
                      fontFamily: "'DM Sans', sans-serif", outline: 'none',
                    }}
                  />
                  <button type="submit" style={{
                    padding: '0.875rem 1.5rem',
                    background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
                    border: 'none', borderRadius: 12,
                    color: '#0a1628', fontSize: '0.85rem', fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'box-shadow 0.3s, transform 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(104,191,205,0.45)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                  >Claim My Spot →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(104,191,205,0.07)',
      padding: '2.5rem 2rem',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/images/logo.svg" alt="Linkra" width={26} height={26} />
          <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Linkra</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'Platforms', href: '#platforms' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Contact', href: 'mailto:hello@linkra.io' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: '0.8rem', color: 'rgba(200,221,226,0.25)', textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#68bfcd')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,221,226,0.25)')}
            >{link.label}</a>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(200,221,226,0.18)', fontFamily: "'DM Sans', sans-serif" }}>
          © {new Date().getFullYear()} Linkra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   SHARED: SECTION LABEL
───────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.25rem' }}>
      <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.4))' }} />
      <span style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#68bfcd',
        fontFamily: "'DM Sans', sans-serif",
      }}>{children}</span>
      <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, rgba(104,191,205,0.4), transparent)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div ref={glowRef} style={{
      position: 'fixed',
      width: 450, height: 450,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 0,
      background: 'radial-gradient(circle, rgba(104,191,205,0.04) 0%, transparent 70%)',
      transform: 'translate(-50%,-50%)',
      transition: 'left 0.15s ease, top 0.15s ease',
    }} />
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{
      background: '#0a1628',
      color: '#c8dde2',
      minHeight: '100vh',
      overflowX: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes pingSlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0; transform: scale(2.4); }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in-up {
          animation: fadeInUp 0.9s ease both;
          opacity: 0;
        }

        ::selection { background: rgba(104,191,205,0.25); color: #fff; }

        input[type="email"] {
          color: #fff !important;
        }
        input[type="email"]::placeholder {
          color: rgba(255,255,255,0.22) !important;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* Fixed layers */}
      <CursorGlow />
      <ParticleCanvas />
      <Navbar />

      {/* ── POSTER PARALLAX SCENE ── */}
      <PosterScene>
        <HeroContent />
      </PosterScene>

      {/* ── REST OF PAGE (solid navy bg, slides over poster) ── */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0a1628' }}>
        {/* Inbox mockup sits right at the seam */}
        <div style={{ padding: '5rem 2rem 2rem', maxWidth: 1140, margin: '0 auto' }}>
          <InboxMockup />
        </div>

        <WhatIsLinkra />
        <Platforms />
        <Features />
        <StatsStrip />
        <HowItWorks />
        <Pricing />
        <CTABanner />
        <Footer />
      </div>
    </div>
  )
}
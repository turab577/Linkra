'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────
   HOOK: useInView
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
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
   PLATFORM ICONS (inline SVGs)
───────────────────────────────────────── */
const PlatformIcons = {
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig2)" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig2)" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig2)"/>
      <defs>
        <linearGradient id="ig2" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529"/>
          <stop offset="0.5" stopColor="#DD2A7B"/>
          <stop offset="1" stopColor="#515BD4"/>
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
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" opacity="0.15"/>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="1.5" opacity="0.6"/>
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
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a1628]/95 backdrop-blur-xl shadow-[0_4px_40px_rgba(104,191,205,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className='flex items-center gap-2.5'>
          <Image src="/images/logo.svg" alt="Linkra" width={40} height={40} />
          <span className='text-[26px] font-bold tracking-tight text-white' style={{ fontFamily: "'Lora', Georgia, serif" }}>Linkra</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Features', href: '#features' },
            { label: 'Platforms', href: '#platforms' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Docs', href: '#docs' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#c8dde2] hover:text-[#68bfcd] text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-[#c8dde2]/70 hover:text-white text-sm font-medium transition-colors px-3 py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Log in
          </a>
          <a
            href="#waitlist"
            className="px-5 py-2.5 rounded-full text-[#0a1628] text-sm font-bold hover:shadow-[0_0_28px_rgba(104,191,205,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)', fontFamily: "'DM Sans', sans-serif" }}
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#c8dde2] hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
        <div className="bg-[#0a1628]/98 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {['Features', 'Platforms', 'Pricing', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#c8dde2] hover:text-[#68bfcd] text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 px-5 py-2.5 rounded-full text-[#0a1628] text-sm font-bold text-center"
            style={{ background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)' }}
            onClick={() => setMenuOpen(false)}
          >
            Get Early Access
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  const platforms = [
    { name: 'Instagram', icon: PlatformIcons.instagram },
    { name: 'WhatsApp', icon: PlatformIcons.whatsapp },
    { name: 'Messenger', icon: PlatformIcons.messenger },
    { name: 'Telegram', icon: PlatformIcons.telegram },
    { name: 'X / Twitter', icon: PlatformIcons.twitter },
    { name: 'LinkedIn', icon: PlatformIcons.linkedin },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #68bfcd 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #4aa8b8 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] opacity-4 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #68bfcd 0%, transparent 60%)' }} />
        {/* Organic wavy lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0,200 C360,300 720,100 1440,250" stroke="#68bfcd" strokeWidth="1" fill="none"/>
          <path d="M0,400 C400,500 800,300 1440,450" stroke="#68bfcd" strokeWidth="1" fill="none"/>
          <path d="M0,600 C300,700 900,500 1440,650" stroke="#68bfcd" strokeWidth="1" fill="none"/>
        </svg>
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
      </div>

      {/* Floating soft orbs */}
      <div className="absolute top-32 right-[22%] w-3 h-3 rounded-full bg-[#68bfcd] shadow-[0_0_20px_rgba(104,191,205,0.7)] animate-float" />
      <div className="absolute bottom-40 left-[22%] w-2 h-2 rounded-full bg-[#a8d8e0] shadow-[0_0_15px_rgba(168,216,224,0.7)] animate-float2" />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#68bfcd] shadow-[0_0_12px_rgba(104,191,205,0.8)] animate-float3" />
      <div className="absolute top-1/2 left-[18%] w-2 h-2 rounded-full bg-[#4aa8b8] shadow-[0_0_15px_rgba(74,168,184,0.7)] animate-float" />

      {/* Badge */}
      <div className="relative mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-[#68bfcd]/25 bg-[#68bfcd]/8 backdrop-blur-sm animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-[#68bfcd] animate-ping-slow" />
        <span className="text-[#68bfcd] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Now in Beta · Free to Join</span>
      </div>

      {/* Headline — warm, human serif */}
      <h1 className="relative text-center leading-[1.08] animate-fade-in-up" style={{ animationDelay: '0.1s', fontFamily: "'Lora', Georgia, serif" }}>
        <span className="block text-5xl sm:text-7xl lg:text-[82px] font-bold text-white">All Your DMs.</span>
        <span className="block text-5xl sm:text-7xl lg:text-[82px] font-bold" style={{ color: '#68bfcd' }}>
          One Inbox.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="relative mt-7 max-w-[580px] text-center text-[#c8dde2]/65 text-lg sm:text-xl leading-[1.7] animate-fade-in-up"
        style={{ animationDelay: '0.2s', fontFamily: "'DM Sans', sans-serif" }}
      >
        Linkra connects your Instagram, WhatsApp, Messenger, Telegram, X, and LinkedIn DMs into a single unified inbox — so you never miss a message across platforms again.
      </p>

      {/* Platform pills */}
      <div className="relative mt-8 flex flex-wrap justify-center gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        {platforms.map((p) => (
          <span
            key={p.name}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#68bfcd]/15 bg-[#68bfcd]/5 text-[#c8dde2]/55 text-xs font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {p.icon}
            {p.name}
          </span>
        ))}
      </div>

      {/* CTA form */}
      <div className="relative mt-10 w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.3s' }} id="waitlist">
        {submitted ? (
          <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-[#68bfcd]/35 bg-[#68bfcd]/10 text-[#68bfcd] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#68bfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            You're on the list! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 text-black placeholder:text-gray-500 px-5 py-3.5 rounded-xl bg-white/4 border border-[#68bfcd]/15 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#68bfcd]/50 focus:bg-[#68bfcd]/5 transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl text-[#0a1628] text-sm font-bold whitespace-nowrap hover:shadow-[0_0_30px_rgba(104,191,205,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Join Waitlist →
            </button>
          </form>
        )}
        <p className="mt-3 text-center text-[#c8dde2]/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>No credit card needed. Free plan available forever.</p>
      </div>

      {/* Hero mockup */}
      <div
        className="relative mt-16 w-full max-w-2xl animate-fade-in-up"
        style={{ animationDelay: '0.45s' }}
      >
        <div className="rounded-3xl border border-[#68bfcd]/10 bg-[#0f1f35]/80 backdrop-blur-sm overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_0_1px_rgba(104,191,205,0.08)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#68bfcd]/8 bg-[#0a1628]/60">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
            <div className="flex-1 mx-4 px-3 py-1 rounded-lg bg-white/4 text-[#68bfcd]/40 text-xs font-mono">
              app.linkra.io/inbox
            </div>
          </div>

          {/* Unified inbox preview */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 border-r border-[#68bfcd]/8 p-3 space-y-1 hidden sm:block">
              <p className="text-[#68bfcd]/30 text-[10px] font-bold tracking-widest uppercase px-2 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Connected</p>
              {[
                { name: 'Instagram', icon: PlatformIcons.instagram, count: 3 },
                { name: 'WhatsApp', icon: PlatformIcons.whatsapp, count: 7 },
                { name: 'Messenger', icon: PlatformIcons.messenger, count: 1 },
                { name: 'Telegram', icon: PlatformIcons.telegram, count: 0 },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#68bfcd]/5 cursor-default transition-colors">
                  <div className="flex items-center gap-2">
                    {p.icon}
                    <span className="text-[#c8dde2]/55 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                  </div>
                  {p.count > 0 && (
                    <span className="w-4 h-4 rounded-full text-[#0a1628] text-[9px] font-black flex items-center justify-center" style={{ background: '#68bfcd' }}>
                      {p.count}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Message list */}
            <div className="flex-1 p-3 space-y-1">
              <p className="text-[#68bfcd]/30 text-[10px] font-bold tracking-widest uppercase px-2 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>All Messages · 11 unread</p>
              {[
                { platformIcon: PlatformIcons.instagram, name: 'Sarah K.', msg: 'Hey! Loved your latest post 🔥', time: '2m', color: '#DD2A7B', unread: true },
                { platformIcon: PlatformIcons.whatsapp, name: 'Mom', msg: 'Are you coming home this weekend?', time: '5m', color: '#25D366', unread: true },
                { platformIcon: PlatformIcons.messenger, name: 'Alex R.', msg: 'Got your message — let me check!', time: '12m', color: '#0099FF', unread: false },
                { platformIcon: PlatformIcons.whatsapp, name: 'Design Team', msg: 'Figma file updated, review by EOD', time: '1h', color: '#25D366', unread: true },
                { platformIcon: PlatformIcons.instagram, name: 'Jake W.', msg: 'Thanks for the collab 🙏', time: '2h', color: '#DD2A7B', unread: false },
              ].map((m, i) => (
                <div key={i} className={`flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-default transition-colors ${m.unread ? 'bg-[#68bfcd]/5' : ''}`}>
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#68bfcd]/10 flex items-center justify-center text-[#68bfcd] text-xs font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                      {m.name[0]}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0f1f35] flex items-center justify-center">
                      <div className="scale-[0.65]">{m.platformIcon}</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${m.unread ? 'text-white' : 'text-[#c8dde2]/40'}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.name}</span>
                      <span className="text-[#c8dde2]/20 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.time}</span>
                    </div>
                    <p className="text-[#c8dde2]/30 text-xs truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.msg}</p>
                  </div>
                  {m.unread && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-2xl opacity-20" style={{ background: '#68bfcd' }} />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   WHAT IS LINKRA
───────────────────────────────────────── */
function WhatIsLinkra() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className="py-28 px-6">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
          <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>What is Linkra?</p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
        </div>
        <h2 className="text-white text-4xl sm:text-5xl font-bold leading-[1.15] mb-6" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Stop app-switching.<br />Start actually responding.
        </h2>
        <p className="text-[#c8dde2]/55 text-lg leading-[1.8] max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Linkra is a unified messaging hub that securely connects your social media DMs across Instagram, WhatsApp, Facebook Messenger, Telegram, X (Twitter), and LinkedIn — giving you one clean inbox to read, reply, and manage all your conversations. No more missed messages buried in six different apps.
        </p>
        {/* Audience pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {['Creators & Influencers', 'Small Business Owners', 'Customer Support Teams', 'Freelancers', 'Social Media Managers', 'Entrepreneurs'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border border-[#68bfcd]/18 bg-[#68bfcd]/6 text-[#68bfcd]/75 text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
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
    <section id="platforms" ref={ref} className="py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
            <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Supported Platforms</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>Connect every platform you use</h2>
          <p className="mt-5 text-[#c8dde2]/45 text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Linkra uses official platform APIs and secure OAuth — we never store your passwords.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformList.map((p, i) => (
            <div
              key={p.name}
              className="group relative p-6 rounded-2xl border border-[#68bfcd]/8 bg-[#0f1f35]/40 hover:border-[#68bfcd]/22 hover:bg-[#68bfcd]/4 transition-all duration-300 hover:scale-[1.02] cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[#68bfcd]/15">
                  <div className="scale-125">{p.icon}</div>
                </div>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: p.status === 'Live' ? 'rgba(104,191,205,0.3)' : p.status === 'Beta' ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.12)',
                    color: p.status === 'Live' ? '#68bfcd' : p.status === 'Beta' ? '#F59E0B' : 'rgba(255,255,255,0.4)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1.5" style={{ fontFamily: "'Lora', Georgia, serif" }}>{p.name}</h3>
              <p className="text-[#c8dde2]/38 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
const featureData = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="6" width="22" height="16" rx="3" stroke="#68bfcd" strokeWidth="1.8"/>
        <path d="M2 11h22" stroke="#68bfcd" strokeWidth="1.3" opacity="0.4"/>
        <rect x="5" y="14" width="6" height="1.5" rx="0.75" fill="#68bfcd" opacity="0.8"/>
        <rect x="5" y="17" width="4" height="1.5" rx="0.75" fill="#68bfcd" opacity="0.4"/>
        <circle cx="20" cy="8" r="4" fill="#DD2A7B"/>
        <path d="M18.5 8l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Unified Inbox',
    desc: 'All messages from all platforms in one chronological feed. Filter by platform, read status, or keyword — respond without ever switching apps.',
    tag: 'Core',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#68bfcd" strokeWidth="1.8"/>
        <path d="M9 13l2.5 2.5L17 10" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 3v3M13 20v3M3 13h3M20 13h3" stroke="#68bfcd" strokeWidth="1.3" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'OAuth-Only Login',
    desc: 'We connect to platforms using official OAuth and verified API access. Your passwords are never seen or stored by Linkra — ever.',
    tag: 'Security',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="4" width="20" height="18" rx="3" stroke="#68bfcd" strokeWidth="1.8"/>
        <path d="M7 9h12M7 13h8M7 17h5" stroke="#68bfcd" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="21" cy="6" r="4" fill="#4aa8b8"/>
        <path d="M19.5 6h3M21 4.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Smart Reply',
    desc: 'AI-assisted reply suggestions based on conversation context. Draft, edit, and send responses to any platform directly from Linkra.',
    tag: 'AI',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="7" r="4" stroke="#68bfcd" strokeWidth="1.8"/>
        <path d="M5 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M19 3l2 2-2 2" stroke="#a8d8e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 5h-4" stroke="#a8d8e0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Contact Profiles',
    desc: 'Automatically merge the same contact across platforms into one unified profile. See their full conversation history regardless of which app they messaged from.',
    tag: 'Pro',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#68bfcd" strokeWidth="1.8"/>
        <path d="M13 7v6l4 2" stroke="#68bfcd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="6" r="3" fill="#25D366"/>
        <path d="M18.8 6l1 1 1.5-1.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Real-Time Sync',
    desc: 'Messages appear in your Linkra inbox within seconds. Push notifications keep you updated the moment someone reaches out, on any connected platform.',
    tag: 'Core',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8"/>
        <rect x="14" y="3" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8" opacity="0.6"/>
        <rect x="3" y="14" width="9" height="9" rx="2" stroke="#68bfcd" strokeWidth="1.8" opacity="0.6"/>
        <rect x="14" y="14" width="9" height="9" rx="2" stroke="#4aa8b8" strokeWidth="1.8"/>
        <path d="M16.5 18.5l1.5 1.5 3-3" stroke="#4aa8b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Team Inbox',
    desc: 'Assign conversations to teammates, add internal notes, and set status tags. Perfect for customer support teams managing DMs across multiple brand accounts.',
    tag: 'Pro',
  },
]

function Features() {
  const { ref, visible } = useInView()
  return (
    <section id="features" ref={ref} className="py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
            <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Everything You Need</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>Built for people who live in their DMs</h2>
          <p className="mt-5 text-[#c8dde2]/45 text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Powerful enough for teams. Simple enough for solo creators.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureData.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-7 rounded-2xl border border-[#68bfcd]/8 bg-[#0f1f35]/40 hover:border-[#68bfcd]/20 hover:bg-[#68bfcd]/4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(104,191,205,0.07)] cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#68bfcd]/8 border border-[#68bfcd]/12 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(104,191,205,0.12)] transition-all duration-300">
                  {f.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-[#68bfcd]/18 text-[#68bfcd]/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {f.tag}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Lora', Georgia, serif" }}>{f.title}</h3>
              <p className="text-[#c8dde2]/40 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-[#68bfcd]/4 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────── */
function StatsStrip() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className="py-16 px-6">
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="rounded-3xl border border-[#68bfcd]/14 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(104,191,205,0.06), rgba(74,168,184,0.04))' }}>
          {[
            { value: '6+', label: 'Platforms connected' },
            { value: '50k+', label: 'Beta users' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '<2s', label: 'Message sync speed' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-bold text-3xl sm:text-4xl" style={{ color: '#68bfcd', fontFamily: "'Lora', Georgia, serif" }}>{s.value}</p>
              <p className="text-[#c8dde2]/35 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
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
    <section ref={ref} className="py-24 px-6">
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
            <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>How It Works</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>Set up in under 2 minutes</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-5 p-7 rounded-2xl border border-[#68bfcd]/8 bg-[#0f1f35]/40 hover:border-[#68bfcd]/18 transition-all duration-300" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="shrink-0 w-10 h-10 rounded-xl border border-[#68bfcd]/25 flex items-center justify-center text-[#68bfcd] text-sm font-bold"
                style={{ background: 'rgba(104,191,205,0.08)', fontFamily: "'Lora', Georgia, serif" }}>
                {s.num}
              </span>
              <div>
                <h3 className="text-white font-bold mb-1.5" style={{ fontFamily: "'Lora', Georgia, serif" }}>{s.title}</h3>
                <p className="text-[#c8dde2]/40 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for individuals who want to unify their personal DMs across platforms.',
    features: ['Connect up to 3 platforms', 'Unified inbox (30-day history)', 'Basic message notifications', 'Reply from Linkra', 'Community support'],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/ month',
    desc: 'For creators, freelancers, and professionals managing DMs at scale.',
    features: ['Connect all 6+ platforms', 'Full message history (unlimited)', 'AI-powered smart replies', 'Contact profile merging', 'Message search & filters', 'Priority push notifications', 'Priority email support'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/ month',
    desc: 'For customer support teams and agencies managing multiple brand accounts.',
    features: ['Everything in Pro', 'Up to 10 team members', 'Shared team inbox', 'Conversation assignment', 'Internal notes & tagging', 'Multiple brand accounts', 'Analytics & response times', 'Dedicated account manager'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

function Pricing() {
  const { ref, visible } = useInView()
  return (
    <section id="pricing" ref={ref} className="py-24 px-6">
      <div className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
            <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>Simple, honest pricing</h2>
          <p className="mt-4 text-[#c8dde2]/40 text-lg max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight
                  ? 'border-[#68bfcd]/40 shadow-[0_0_60px_rgba(104,191,205,0.1)]'
                  : 'border-[#68bfcd]/8 bg-[#0f1f35]/40 hover:border-[#68bfcd]/15'
              }`}
              style={plan.highlight ? { background: 'linear-gradient(160deg, rgba(104,191,205,0.1), rgba(74,168,184,0.04))' } : {}}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[#0a1628] text-xs font-black tracking-wide uppercase"
                  style={{ background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)', fontFamily: "'DM Sans', sans-serif" }}>
                  Most Popular
                </div>
              )}
              <div className="mb-7">
                <p className="text-[#c8dde2]/40 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-bold ${plan.highlight ? '' : 'text-white'}`}
                    style={{ color: plan.highlight ? '#68bfcd' : undefined, fontFamily: "'Lora', Georgia, serif" }}>{plan.price}</span>
                  <span className="text-[#c8dde2]/35 text-sm mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.period}</span>
                </div>
                <p className="mt-3 text-[#c8dde2]/38 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="#68bfcd" opacity="0.1"/>
                      <path d="M4 7l2 2 4-4" stroke="#68bfcd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#c8dde2]/55 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block w-full py-3.5 rounded-xl text-sm font-bold text-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                  plan.highlight
                    ? 'text-[#0a1628] hover:shadow-[0_0_30px_rgba(104,191,205,0.35)]'
                    : 'border border-[#68bfcd]/15 text-[#c8dde2]/65 hover:border-[#68bfcd]/35 hover:text-[#68bfcd] hover:bg-[#68bfcd]/5'
                }`}
                style={plan.highlight ? { background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)', fontFamily: "'DM Sans', sans-serif" } : { fontFamily: "'DM Sans', sans-serif" }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
  const { ref, visible } = useInView()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section ref={ref} className="py-24 px-6">
      <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative rounded-3xl border border-[#68bfcd]/18 p-14 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(104,191,205,0.08) 0%, rgba(10,22,40,0.6) 60%)' }}>
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.5), transparent)' }} />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at top, rgba(104,191,205,0.06), transparent 60%)' }} />
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#68bfcd]/40" />
              <p className="text-[#68bfcd] text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get Early Access</p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#68bfcd]/40" />
            </div>
            <h2 className="text-white text-4xl sm:text-5xl font-bold mb-5 leading-[1.15]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              One inbox for<br />every conversation.
            </h2>
            <p className="text-[#c8dde2]/45 text-lg mb-9 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Join 50,000+ users already on the Linkra beta. Early members get 3 months of Pro free.
            </p>
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-[#68bfcd]/35 bg-[#68bfcd]/10 text-[#68bfcd] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4 4 8-8" stroke="#68bfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                You're in! Check your inbox shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 text-black placeholder:text-gray-500 px-5 py-3.5 rounded-xl bg-white/4 border border-[#68bfcd]/15 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#68bfcd]/45 transition-all duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl text-[#0a1628] text-sm font-bold hover:shadow-[0_0_30px_rgba(104,191,205,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #68bfcd, #4aa8b8)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Claim My Spot →
                </button>
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
    <footer className="border-t border-[#68bfcd]/8 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className='flex items-center gap-2.5'>
            <Image src="/images/logo.svg" alt="Linkra" width={24} height={24} />
            <span className='text-[20px] font-bold text-white tracking-tight' style={{ fontFamily: "'Lora', Georgia, serif" }}>Linkra</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Platforms', href: '#platforms' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Contact', href: 'mailto:hello@linkra.io' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#c8dde2]/28 hover:text-[#68bfcd] transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[#c8dde2]/20 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>© {new Date().getFullYear()} Linkra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function LandingParent() {
  return (
    <div className="min-h-screen text-white bg-[url('/images/Linkra-poster.png')] bg-norepeat bg-center " style={{ background: '#0a1628', fontFamily: "'DM Sans', 'sans-serif'" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping-slow { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2.2); opacity: 0; } }

        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float2 { animation: float2 6s ease-in-out infinite 1.2s; }
        .animate-float3 { animation: float3 8s ease-in-out infinite 2.5s; }
        .animate-fade-in { animation: fade-in 0.9s ease both; }
        .animate-fade-in-up { animation: fade-in-up 0.9s ease both; }
        .animate-ping-slow { animation: ping-slow 2.5s ease-in-out infinite; }

        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
      <Navbar />
      <Hero />
      <WhatIsLinkra />
      <Platforms />
      <Features />
      <HowItWorks />
      <StatsStrip />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  )
}
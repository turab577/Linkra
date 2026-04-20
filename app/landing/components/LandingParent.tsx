'use client'

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
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig)"/>
      <defs>
        <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
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
          ? 'bg-[#050D1A]/95 backdrop-blur-xl border-b border-[#00C2FF]/10 shadow-[0_4px_40px_rgba(0,194,255,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.5)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10C4 7 6.5 5 9 5h1V3H9C5.13 3 2 6.13 2 10s3.13 7 7 7h1v-2H9C6.5 15 4 13 4 10z" fill="white"/>
              <path d="M11 3v2h1c2.5 0 5 2 5 5s-2.5 5-5 5h-1v2h1c3.87 0 7-3.13 7-7s-3.13-7-7-7h-1z" fill="white" opacity="0.6"/>
              <rect x="7" y="9" width="6" height="2" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Linkra</span>
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
              className="text-white/60 hover:text-[#00C2FF] text-sm font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors px-3 py-2">
            Log in
          </a>
          <a
            href="#waitlist"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white text-sm font-bold hover:shadow-[0_0_24px_rgba(0,194,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2"
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
        <div className="bg-[#050D1A]/98 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {['Features', 'Platforms', 'Pricing', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-[#00C2FF] text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white text-sm font-bold text-center"
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
    { name: 'Instagram', color: '#DD2A7B', icon: PlatformIcons.instagram },
    { name: 'WhatsApp', color: '#25D366', icon: PlatformIcons.whatsapp },
    { name: 'Messenger', color: '#0099FF', icon: PlatformIcons.messenger },
    { name: 'Telegram', color: '#229ED9', icon: PlatformIcons.telegram },
    { name: 'X / Twitter', color: '#ffffff', icon: PlatformIcons.twitter },
    { name: 'LinkedIn', color: '#0A66C2', icon: PlatformIcons.linkedin },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00C2FF]/6 blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7B2FFF]/8 blur-[110px] animate-pulse-slow2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full bg-[#00C2FF]/3 blur-[80px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,194,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating platform orbs */}
      <div className="absolute top-32 right-1/4 w-3 h-3 rounded-full bg-[#DD2A7B] shadow-[0_0_20px_rgba(221,42,123,0.8)] animate-float" />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.8)] animate-float2" />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.9)] animate-float3" />
      <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-[#7B2FFF] shadow-[0_0_15px_rgba(123,47,255,0.8)] animate-float" />

      {/* Badge */}
      <div className="relative mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/5 backdrop-blur-sm animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-ping-slow" />
        <span className="text-[#00C2FF] text-xs font-semibold tracking-widest uppercase">Now in Beta · Free to Join</span>
      </div>

      {/* Headline */}
      <h1 className="relative text-center font-black leading-[1.05] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">All Your DMs.</span>
        <span className="block text-5xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-[#00C2FF] via-[#a855f7] to-[#DD2A7B] bg-clip-text text-transparent">
          One Inbox.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="relative mt-6 max-w-xl text-center text-white/55 text-lg sm:text-xl leading-relaxed animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        Linkra connects your Instagram, WhatsApp, Messenger, Telegram, X, and LinkedIn DMs into a single unified inbox — so you never miss a message across platforms again.
      </p>

      {/* Platform pills */}
      <div className="relative mt-8 flex flex-wrap justify-center gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        {platforms.map((p) => (
          <span
            key={p.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-white/60 text-xs font-medium"
          >
            {p.icon}
            {p.name}
          </span>
        ))}
      </div>

      {/* CTA form */}
      <div className="relative mt-10 w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.3s' }} id="waitlist">
        {submitted ? (
          <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-[#00C2FF]/40 bg-[#00C2FF]/10 text-[#00C2FF] font-semibold">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00C2FF]/60 focus:bg-[#00C2FF]/5 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white text-sm font-bold whitespace-nowrap hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Join Waitlist →
            </button>
          </form>
        )}
        <p className="mt-3 text-center text-white/30 text-xs">No credit card needed. Free plan available forever.</p>
      </div>

      {/* Hero mockup — unified inbox preview */}
      <div
        className="relative mt-16 w-full max-w-2xl animate-fade-in-up"
        style={{ animationDelay: '0.45s' }}
      >
        <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-white/5 text-white/30 text-xs font-mono">
              app.linkra.io/inbox
            </div>
          </div>

          {/* Unified inbox preview */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/5 p-3 space-y-1 hidden sm:block">
              <p className="text-white/25 text-[10px] font-bold tracking-widest uppercase px-2 mb-2">Connected</p>
              {[
                { name: 'Instagram', icon: PlatformIcons.instagram, count: 3 },
                { name: 'WhatsApp', icon: PlatformIcons.whatsapp, count: 7 },
                { name: 'Messenger', icon: PlatformIcons.messenger, count: 1 },
                { name: 'Telegram', icon: PlatformIcons.telegram, count: 0 },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/4 cursor-default">
                  <div className="flex items-center gap-2">
                    {p.icon}
                    <span className="text-white/60 text-xs">{p.name}</span>
                  </div>
                  {p.count > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#00C2FF] text-[#050D1A] text-[9px] font-black flex items-center justify-center">
                      {p.count}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Message list */}
            <div className="flex-1 p-3 space-y-1">
              <p className="text-white/25 text-[10px] font-bold tracking-widest uppercase px-2 mb-2">All Messages · 11 unread</p>
              {[
                { platform: 'Instagram', platformIcon: PlatformIcons.instagram, name: 'Sarah K.', msg: 'Hey! Loved your latest post 🔥', time: '2m', color: '#DD2A7B', unread: true },
                { platform: 'WhatsApp', platformIcon: PlatformIcons.whatsapp, name: 'Mom', msg: 'Are you coming home this weekend?', time: '5m', color: '#25D366', unread: true },
                { platform: 'Messenger', platformIcon: PlatformIcons.messenger, name: 'Alex R.', msg: 'Got your message — let me check!', time: '12m', color: '#0099FF', unread: false },
                { platform: 'WhatsApp', platformIcon: PlatformIcons.whatsapp, name: 'Design Team', msg: 'Figma file updated, review by EOD', time: '1h', color: '#25D366', unread: true },
                { platform: 'Instagram', platformIcon: PlatformIcons.instagram, name: 'Jake W.', msg: 'Thanks for the collab 🙏', time: '2h', color: '#DD2A7B', unread: false },
              ].map((m, i) => (
                <div key={i} className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-default ${m.unread ? 'bg-white/4' : ''}`}>
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/60 text-xs font-bold">
                      {m.name[0]}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#050D1A] flex items-center justify-center">
                      <div className="scale-[0.65]">{m.platformIcon}</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${m.unread ? 'text-white' : 'text-white/50'}`}>{m.name}</span>
                      <span className="text-white/25 text-[10px]">{m.time}</span>
                    </div>
                    <p className="text-white/35 text-xs truncate">{m.msg}</p>
                  </div>
                  {m.unread && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#7B2FFF]/10 blur-2xl rounded-full" />
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
    <section ref={ref} className="py-24 px-6">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">What is Linkra?</p>
        <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-6">
          Stop app-switching.<br />Start actually responding.
        </h2>
        <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
          Linkra is a unified messaging hub that securely connects your social media DMs across Instagram, WhatsApp, Facebook Messenger, Telegram, X (Twitter), and LinkedIn — giving you one clean inbox to read, reply, and manage all your conversations. No more missed messages buried in six different apps.
        </p>
        {/* Audience pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Creators & Influencers', 'Small Business Owners', 'Customer Support Teams', 'Freelancers', 'Social Media Managers', 'Entrepreneurs'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full border border-[#00C2FF]/20 bg-[#00C2FF]/5 text-[#00C2FF]/80 text-sm font-medium"
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
          <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">Supported Platforms</p>
          <h2 className="text-white text-4xl sm:text-5xl font-black">Connect every platform you use</h2>
          <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
            Linkra uses official platform APIs and secure OAuth — we never store your passwords.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformList.map((p, i) => (
            <div
              key={p.name}
              className="group relative p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4 transition-all duration-300 hover:scale-[1.02] cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <div className="scale-125">{p.icon}</div>
                </div>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: p.status === 'Live' ? '#00C2FF40' : p.status === 'Beta' ? '#F59E0B40' : '#ffffff20',
                    color: p.status === 'Live' ? '#00C2FF' : p.status === 'Beta' ? '#F59E0B' : '#ffffff60',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{p.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
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
        <rect x="2" y="6" width="22" height="16" rx="3" stroke="#00C2FF" strokeWidth="1.8"/>
        <path d="M2 11h22" stroke="#00C2FF" strokeWidth="1.3" opacity="0.4"/>
        <rect x="5" y="14" width="6" height="1.5" rx="0.75" fill="#00C2FF" opacity="0.8"/>
        <rect x="5" y="17" width="4" height="1.5" rx="0.75" fill="#00C2FF" opacity="0.4"/>
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
        <path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#00C2FF" strokeWidth="1.8"/>
        <path d="M9 13l2.5 2.5L17 10" stroke="#00C2FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 3v3M13 20v3M3 13h3M20 13h3" stroke="#00C2FF" strokeWidth="1.3" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'OAuth-Only Login',
    desc: 'We connect to platforms using official OAuth and verified API access. Your passwords are never seen or stored by Linkra — ever.',
    tag: 'Security',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="4" width="20" height="18" rx="3" stroke="#00C2FF" strokeWidth="1.8"/>
        <path d="M7 9h12M7 13h8M7 17h5" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="21" cy="6" r="4" fill="#7B2FFF"/>
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
        <circle cx="13" cy="7" r="4" stroke="#00C2FF" strokeWidth="1.8"/>
        <path d="M5 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#00C2FF" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M19 3l2 2-2 2" stroke="#DD2A7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 5h-4" stroke="#DD2A7B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Contact Profiles',
    desc: 'Automatically merge the same contact across platforms into one unified profile. See their full conversation history regardless of which app they messaged from.',
    tag: 'Pro',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C7.48 3 3 7.48 3 13s4.48 10 10 10 10-4.48 10-10S18.52 3 13 3z" stroke="#00C2FF" strokeWidth="1.8"/>
        <path d="M13 7v6l4 2" stroke="#00C2FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
        <rect x="3" y="3" width="9" height="9" rx="2" stroke="#00C2FF" strokeWidth="1.8"/>
        <rect x="14" y="3" width="9" height="9" rx="2" stroke="#00C2FF" strokeWidth="1.8" opacity="0.6"/>
        <rect x="3" y="14" width="9" height="9" rx="2" stroke="#00C2FF" strokeWidth="1.8" opacity="0.6"/>
        <rect x="14" y="14" width="9" height="9" rx="2" stroke="#7B2FFF" strokeWidth="1.8"/>
        <path d="M16.5 18.5l1.5 1.5 3-3" stroke="#7B2FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
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
          <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">Everything You Need</p>
          <h2 className="text-white text-4xl sm:text-5xl font-black">Built for people who live in their DMs</h2>
          <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
            Powerful enough for teams. Simple enough for solo creators.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureData.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-[#00C2FF]/25 hover:bg-[#00C2FF]/3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,194,255,0.08)] cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/6 border border-[#00C2FF]/12 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,194,255,0.15)] transition-all duration-300">
                  {f.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-[#00C2FF]/20 text-[#00C2FF]/60">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-[#00C2FF]/4 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <div className="rounded-2xl border border-[#00C2FF]/15 bg-gradient-to-r from-[#00C2FF]/5 via-[#7B2FFF]/5 to-[#00C2FF]/5 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '6+', label: 'Platforms connected' },
            { value: '50k+', label: 'Beta users' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '<2s', label: 'Message sync speed' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[#00C2FF] font-black text-3xl sm:text-4xl">{s.value}</p>
              <p className="text-white/40 text-sm mt-1">{s.label}</p>
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
    {
      num: '01',
      title: 'Create your Linkra account',
      desc: 'Sign up for free in under 60 seconds. No credit card required.',
    },
    {
      num: '02',
      title: 'Connect your social apps',
      desc: 'Authorize Linkra via official OAuth on each platform. We never touch your passwords.',
    },
    {
      num: '03',
      title: 'Open your unified inbox',
      desc: 'Every DM from every platform flows into one clean, searchable inbox — in real time.',
    },
    {
      num: '04',
      title: 'Reply without switching apps',
      desc: 'Read and respond to messages from any platform directly inside Linkra.',
    },
  ]
  return (
    <section ref={ref} className="py-24 px-6">
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">How It Works</p>
          <h2 className="text-white text-4xl sm:text-5xl font-black">Set up in under 2 minutes</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-5 p-6 rounded-2xl border border-white/6 bg-white/2" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C2FF]/20 to-[#7B2FFF]/20 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-sm font-black">
                {s.num}
              </span>
              <div>
                <h3 className="text-white font-bold mb-1">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
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
    features: [
      'Connect up to 3 platforms',
      'Unified inbox (30-day history)',
      'Basic message notifications',
      'Reply from Linkra',
      'Community support',
    ],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/ month',
    desc: 'For creators, freelancers, and professionals managing DMs at scale.',
    features: [
      'Connect all 6+ platforms',
      'Full message history (unlimited)',
      'AI-powered smart replies',
      'Contact profile merging',
      'Message search & filters',
      'Priority push notifications',
      'Priority email support',
    ],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/ month',
    desc: 'For customer support teams and agencies managing multiple brand accounts.',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared team inbox',
      'Conversation assignment',
      'Internal notes & tagging',
      'Multiple brand accounts',
      'Analytics & response times',
      'Dedicated account manager',
    ],
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
          <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">Pricing</p>
          <h2 className="text-white text-4xl sm:text-5xl font-black">Simple, honest pricing</h2>
          <p className="mt-4 text-white/45 text-lg max-w-md mx-auto">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight
                  ? 'border-[#00C2FF]/50 bg-gradient-to-b from-[#00C2FF]/10 to-[#7B2FFF]/5 shadow-[0_0_50px_rgba(0,194,255,0.12)]'
                  : 'border-white/8 bg-white/2 hover:border-white/15'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white text-xs font-black tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <p className="text-white/50 text-sm font-semibold mb-2">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-[#00C2FF]' : 'text-white'}`}>{plan.price}</span>
                  <span className="text-white/40 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="mt-3 text-white/40 text-sm leading-relaxed">{plan.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="#00C2FF" opacity="0.12"/>
                      <path d="M4 7l2 2 4-4" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-white/60 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block w-full py-3.5 rounded-xl text-sm font-bold text-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white hover:shadow-[0_0_30px_rgba(0,194,255,0.35)]'
                    : 'border border-white/15 text-white/80 hover:border-[#00C2FF]/40 hover:text-[#00C2FF] hover:bg-[#00C2FF]/5'
                }`}
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
        <div className="relative rounded-3xl border border-[#00C2FF]/20 bg-gradient-to-b from-[#00C2FF]/8 to-transparent p-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.07),transparent_60%)]" />
          <div className="relative">
            <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-4">Get Early Access</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black mb-4">
              One inbox for<br />every conversation.
            </h2>
            <p className="text-white/45 text-lg mb-8">
              Join 50,000+ users already on the Linkra beta. Early members get 3 months of Pro free.
            </p>
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-[#00C2FF]/40 bg-[#00C2FF]/10 text-[#00C2FF] font-semibold">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4 4 8-8" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00C2FF]/60 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B2FFF] text-white text-sm font-bold hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
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
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#7B2FFF] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M4 10C4 7 6.5 5 9 5h1V3H9C5.13 3 2 6.13 2 10s3.13 7 7 7h1v-2H9C6.5 15 4 13 4 10z" fill="white"/>
                <path d="M11 3v2h1c2.5 0 5 2 5 5s-2.5 5-5 5h-1v2h1c3.87 0 7-3.13 7-7s-3.13-7-7-7h-1z" fill="white" opacity="0.6"/>
                <rect x="7" y="9" width="6" height="2" rx="1" fill="white"/>
              </svg>
            </div>
            <span className="text-white/70 font-semibold text-sm">Linkra</span>
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
                className="text-white/35 hover:text-[#00C2FF] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Linkra. All rights reserved.</p>
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
    <div className="min-h-screen bg-[#050D1A] text-white font-sans" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,400&display=swap');

        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes pulse-slow2 { 0%, 100% { opacity: 0.3; transform: scale(1.05); } 50% { opacity: 0.6; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping-slow { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2); opacity: 0; } }

        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slow2 { animation: pulse-slow2 8s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite 1s; }
        .animate-float3 { animation: float3 7s ease-in-out infinite 2s; }
        .animate-fade-in { animation: fade-in 0.8s ease both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease both; }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }

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
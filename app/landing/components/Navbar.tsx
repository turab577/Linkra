'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function Navbar() {
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
          <Image src="/images/Logo.svg" alt="Linkra" width={38} height={38} />
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
          <Link href="/login" style={{
            color: 'rgba(200,221,226,0.5)', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,221,226,0.5)')}
          >Log in</Link>
          <Link href="/register" style={{
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
          >Get Early Access</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(200,221,226,0.7)', padding: 8,
          display: 'none',
        }} className="mobile-menu-btn" aria-label="Menu">
          {menuOpen
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
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
          <Link href="/register" onClick={() => setMenuOpen(false)} style={{
            padding: '0.7rem', textAlign: 'center',
            background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
            color: '#0a1628', borderRadius: 12, textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}>Get Early Access</Link>
        </div>
      </div>
    </nav>
  )
}
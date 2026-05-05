'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function HeroContent() {
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#68bfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                  ; (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
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
              <rect x="6" y="0" width="4" height="10" rx="2" stroke="rgba(104,191,205,0.4)" strokeWidth="1.5" />
              <circle cx="8" cy="4" r="1.5" fill="rgba(104,191,205,0.6)" style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }} />
              <path d="M4 15l4 4 4-4" stroke="rgba(104,191,205,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
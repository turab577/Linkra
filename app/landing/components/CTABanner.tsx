'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function CTABanner() {
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
          border: '1px solid rgba(255,255,255,0.1)',
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
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.05), transparent 65%)',
          }} />
          <div style={{ position: 'relative' }}>
            <SectionLabel>Get Early Access</SectionLabel>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.12, marginBottom: '1.25rem',
            }}>
              One inbox for<br />every conversation.
            </h2>
            <p style={{
              color: 'rgba(200,221,226,0.45)', fontSize: '1.05rem',
              marginBottom: '2.5rem', lineHeight: 1.75,
              fontFamily: "'Inter', sans-serif",
            }}>
              Join 50,000+ users already on the Linkra beta. Early members get 3 months of Pro free.
            </p>
            {submitted ? (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '0.875rem 1.5rem',
                border: '1px solid rgba(104,191,205,0.35)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 8, color: '#68bfcd', fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
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
                      borderRadius: 8, color: '#fff', fontSize: '0.875rem',
                      fontFamily: "'Inter', sans-serif", outline: 'none',
                    }}
                  />
                  <button type="submit" style={{
                    padding: '0.875rem 1.5rem',
                    background: 'linear-gradient(135deg,#68bfcd,#4aa8b8)',
                    border: 'none', borderRadius: 8,
                    color: '#0a1628', fontSize: '0.85rem', fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
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
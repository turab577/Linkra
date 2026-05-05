'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function HowItWorks() {
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
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
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

export function StepCard({ s, delay }: { s: { num: string; title: string; desc: string }; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '1.25rem', padding: '1.5rem', borderRadius: 18,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'}`,
        background: 'rgba(15,31,53,0.4)', backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: `all 0.3s ease ${delay}ms`,
        cursor: 'default',
      }}
    >
      <span style={{
        flexShrink: 0, width: 40, height: 40, borderRadius: 11,
        border: '1px solid rgba(104,191,205,0.25)',
        background: 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 700, color: '#68bfcd',
      }}>{s.num}</span>
      <div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: '#fff', marginBottom: 6, fontSize: '0.95rem' }}>{s.title}</h3>
        <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.38)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{s.desc}</p>
      </div>
    </div>
  )
}
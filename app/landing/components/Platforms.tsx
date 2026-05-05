'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export const platformList = [
  { name: 'Instagram', desc: 'DMs, story replies & message requests', icon: PlatformIcons.instagram, color: '#DD2A7B', status: 'Live' },
  { name: 'WhatsApp', desc: 'Personal & business messages, groups', icon: PlatformIcons.whatsapp, color: '#25D366', status: 'Live' },
  { name: 'Messenger', desc: 'Facebook DMs & group conversations', icon: PlatformIcons.messenger, color: '#0099FF', status: 'Live' },
  { name: 'Telegram', desc: 'Chats, channels & bot messages', icon: PlatformIcons.telegram, color: '#229ED9', status: 'Live' },
  { name: 'X / Twitter', desc: 'Direct messages & conversation threads', icon: PlatformIcons.twitter, color: '#ffffff', status: 'Beta' },
  { name: 'LinkedIn', desc: 'Professional messages & InMail', icon: PlatformIcons.linkedin, color: '#0A66C2', status: 'Coming Soon' },
]

export function Platforms() {
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
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Connect every platform you use
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(200,221,226,0.42)', fontSize: '1.05rem', maxWidth: 460, margin: '1rem auto 0', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
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

export function PlatformCard({ p, delay }: { p: typeof platformList[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const statusColor = p.status === 'Live' ? '#68bfcd' : p.status === 'Beta' ? '#F59E0B' : 'rgba(255,255,255,0.3)'
  const statusBorder = p.status === 'Live' ? 'rgba(255,255,255,0.1)' : p.status === 'Beta' ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        borderRadius: 20,
        border: `1px solid ${hovered ? 'rgba(104,191,205,0.22)' : 'rgba(255,255,255,0.03)'}`,
        background: hovered ? 'rgba(15,31,53,0.75)' : 'rgba(15,31,53,0.45)',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
        transition: `all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transitionDelay: `${delay}ms`,
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(104,191,205,0.04), transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 8,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.3s',
        }}>
          <div style={{ transform: 'scale(1.2)' }}>{p.icon}</div>
        </div>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 8,
          border: `1px solid ${statusBorder}`, color: statusColor,
          fontFamily: "'Inter', sans-serif",
        }}>{p.status}</span>
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{p.name}</h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.36)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{p.desc}</p>
    </div>
  )
}
'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export const featureData = [
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

export function Features() {
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
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Built for people who live in their DMs
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(200,221,226,0.42)', fontSize: '1.05rem', maxWidth: 440, margin: '1rem auto 0', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
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

export function FeatureCard({ f, delay }: { f: typeof featureData[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem', borderRadius: 20, cursor: 'default',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'}`,
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
          width: 50, height: 50, borderRadius: 8,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(104,191,205,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: hovered ? '0 0 24px rgba(104,191,205,0.18)' : 'none',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}>{f.icon}</div>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '3px 9px', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(104,191,205,0.5)',
          fontFamily: "'Inter', sans-serif",
        }}>{f.tag}</span>
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.38)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
      <div style={{
        position: 'absolute', bottom: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />
    </div>
  )
}
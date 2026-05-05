'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export const plans = [
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

export function Pricing() {
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
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>
            Simple, honest pricing
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(200,221,226,0.38)', fontSize: '1.05rem', fontFamily: "'Inter', sans-serif" }}>
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

export function PlanCard({ plan, delay }: { plan: typeof plans[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 22, padding: '2rem',
        border: `1px solid ${plan.highlight ? 'rgba(104,191,205,0.4)' : 'rgba(255,255,255,0.03)'}`,
        background: plan.highlight
          ? 'linear-gradient(160deg, rgba(255,255,255,0.05), rgba(74,168,184,0.04))'
          : 'rgba(15,31,53,0.45)',
        backdropFilter: 'blur(16px)',
        boxShadow: plan.highlight ? '0 0 60px rgba(255,255,255,0.05)' : hovered ? '0 20px 50px rgba(0,0,0,0.3)' : 'none',
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
          borderRadius: 8, color: '#0a1628',
          fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.1em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          fontFamily: "'Inter', sans-serif",
        }}>Most Popular</div>
      )}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(200,221,226,0.35)', marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>{plan.name}</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 6 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '3rem', fontWeight: 700, lineHeight: 1,
            color: plan.highlight ? '#68bfcd' : '#fff',
          }}>{plan.price}</span>
          <span style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.3)', marginBottom: 7, fontFamily: "'Inter', sans-serif" }}>{plan.period}</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.35)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{plan.desc}</p>
      </div>
      <ul style={{ listStyle: 'none', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {plan.features.map(feat => (
          <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <svg style={{ marginTop: 2, flexShrink: 0 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#68bfcd" opacity="0.1"/>
              <path d="M4 7l2 2 4-4" stroke="#68bfcd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: '0.82rem', color: 'rgba(200,221,226,0.55)', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>{feat}</span>
          </li>
        ))}
      </ul>
      <a href="#waitlist" style={{
        display: 'block', width: '100%', padding: '0.875rem',
        borderRadius: 8, fontSize: '0.85rem', fontWeight: 700, textAlign: 'center',
        textDecoration: 'none', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
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
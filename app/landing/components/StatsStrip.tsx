'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function StatsStrip() {
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(74,168,184,0.03))',
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
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#68bfcd', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(200,221,226,0.32)', marginTop: 8, fontFamily: "'Inter', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
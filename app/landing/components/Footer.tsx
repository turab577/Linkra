'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '2.5rem 2rem',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/images/Logo.svg" alt="Linkra" width={26} height={26} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Linkra</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'Platforms', href: '#platforms' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Contact', href: 'mailto:hello@linkra.io' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: '0.8rem', color: 'rgba(200,221,226,0.25)', textDecoration: 'none',
              fontFamily: "'Inter', sans-serif", transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#68bfcd')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,221,226,0.25)')}
            >{link.label}</a>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(200,221,226,0.18)', fontFamily: "'Inter', sans-serif" }}>
          © {new Date().getFullYear()} Linkra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
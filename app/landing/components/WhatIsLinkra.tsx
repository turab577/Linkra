'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function WhatIsLinkra() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} style={{ padding: '8rem 2rem 6rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        maxWidth: 860, margin: '0 auto', textAlign: 'center',
      }}>
        <SectionLabel>What is Linkra?</SectionLabel>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 700, color: '#fff', lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          Stop app-switching.<br />Start actually responding.
        </h2>
        <p style={{
          color: 'rgba(200,221,226,0.52)',
          fontSize: '1.08rem', lineHeight: 1.8,
          maxWidth: 680, margin: '0 auto',
          fontFamily: "'Inter', sans-serif",
        }}>
          Linkra is a unified messaging hub that securely connects your social media DMs across Instagram, WhatsApp, Facebook Messenger, Telegram, X (Twitter), and LinkedIn — giving you one clean inbox to read, reply, and manage all your conversations. No more missed messages buried in six different apps.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 10, marginTop: '2.5rem',
        }}>
          {['Creators & Influencers', 'Small Business Owners', 'Customer Support Teams', 'Freelancers', 'Social Media Managers', 'Entrepreneurs'].map((tag, i) => (
            <span key={tag} style={{
              padding: '7px 18px',
              border: '1px solid rgba(104,191,205,0.16)',
              background: 'rgba(104,191,205,0.055)',
              borderRadius: 8,
              fontSize: '0.82rem', color: 'rgba(104,191,205,0.72)',
              fontFamily: "'Inter', sans-serif",
              transition: 'transform 0.2s, border-color 0.2s',
              animationDelay: `${i * 0.05}s`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
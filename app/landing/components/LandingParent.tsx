'use client'

import React from 'react'
import { CursorGlow } from './CursorGlow'
import { ParticleCanvas } from './ParticleCanvas'
import { Navbar } from './Navbar'
import { PosterScene } from './PosterScene'
import { HeroContent } from './HeroContent'
import { InboxMockup } from './InboxMockup'
import { WhatIsLinkra } from './WhatIsLinkra'
import { Platforms } from './Platforms'
import { Features } from './Features'
import { StatsStrip } from './StatsStrip'
import { HowItWorks } from './HowItWorks'
import { Pricing } from './Pricing'
import { CTABanner } from './CTABanner'
import { Footer } from './Footer'

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{
      background: '#0a1628',
      color: '#c8dde2',
      minHeight: '100vh',
      overflowX: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes pingSlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0; transform: scale(2.4); }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in-up {
          animation: fadeInUp 0.9s ease both;
          opacity: 0;
        }

        ::selection { background: rgba(104,191,205,0.25); color: #fff; }

        input[type="email"] {
          color: #fff !important;
        }
        input[type="email"]::placeholder {
          color: rgba(255,255,255,0.22) !important;
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* Fixed layers */}
      <CursorGlow />
      <ParticleCanvas />
      <Navbar />

      {/* ── POSTER PARALLAX SCENE ── */}
      <PosterScene>
        <HeroContent />
      </PosterScene>

      {/* ── REST OF PAGE (solid navy bg, slides over poster) ── */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0a1628' }}>
        {/* Inbox mockup sits right at the seam */}
        <div style={{ padding: '5rem 2rem 2rem', maxWidth: 1140, margin: '0 auto' }}>
          <InboxMockup />
        </div>

        <WhatIsLinkra />
        <Platforms />
        <Features />
        <StatsStrip />
        <HowItWorks />
        <Pricing />
        <CTABanner />
        <Footer />
      </div>
    </div>
  )
}
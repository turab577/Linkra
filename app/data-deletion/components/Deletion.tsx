'use client'

import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050D1A]/95 backdrop-blur-xl border-b border-[#00C2FF]/10 shadow-[0_4px_40px_rgba(0,194,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#7B2FFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.4)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10C4 7 6.5 5 9 5h1V3H9C5.13 3 2 6.13 2 10s3.13 7 7 7h1v-2H9C6.5 15 4 13 4 10z" fill="white"/>
              <path d="M11 3v2h1c2.5 0 5 2 5 5s-2.5 5-5 5h-1v2h1c3.87 0 7-3.13 7-7s-3.13-7-7-7h-1z" fill="white" opacity="0.6"/>
              <rect x="7" y="9" width="6" height="2" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Linkra</span>
        </a>
        <a
          href="/"
          className="flex items-center gap-1.5 text-white/50 hover:text-[#00C2FF] text-sm font-medium transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </a>
      </div>
    </nav>
  )
}

export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/40 to-transparent" />
        <p className="text-[#00C2FF] text-xs font-bold tracking-[0.2em] uppercase mb-3">Legal</p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">Data Deletion Request</h1>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Last updated: <span className="text-white/60 font-semibold">April 20, 2025</span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['GDPR Compliant', 'CCPA Compliant', 'Meta App Review Ready'].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00C2FF]/20 bg-[#00C2FF]/5 text-[#00C2FF]/70 text-xs font-medium">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="#00C2FF" opacity="0.6"/>
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">

        {/* Intro box */}
        <div className="mb-10 p-5 rounded-2xl border border-[#00C2FF]/15 bg-[#00C2FF]/4">
          <p className="text-white/65 text-sm leading-relaxed">
            At Linkra, you have full control over your data at all times. This page explains how to request
            deletion of your personal data, what gets deleted, and how long it takes. We take every deletion
            request seriously and process them promptly.
          </p>
        </div>

        {/* How to request */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-xs font-black">01</span>
            <h2 className="text-white text-xl font-bold leading-snug pt-1">How to Request Data Deletion</h2>
          </div>
          <div className="ml-12 text-white/55 text-sm leading-[1.9] space-y-4">
            <p>You can delete your data in two ways:</p>

            {/* Option A */}
          
            {/* Option B */}
            <div className="p-4 rounded-xl border border-white/8 bg-white/2">
              <p className="text-white/80 font-bold text-sm mb-2">Email Request</p>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Send an email to the address below with the subject line <span className="text-[#00C2FF] font-semibold">"Data Deletion Request"</span>.
                Please include:
              </p>
              <div className="space-y-1.5">
                {[
                  'Your full name',
                  'The email address on your Linkra account',
                  'Your Facebook / Instagram User ID (if you connected Meta platforms)',
                  'Which data you want deleted (specific platform or full account)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="mt-0.5 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" fill="#00C2FF" opacity="0.15"/>
                      <path d="M3.5 6l2 2 3-3" stroke="#00C2FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-white/45 text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-[#00C2FF]/8 border border-[#00C2FF]/15 flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="#00C2FF" strokeWidth="1.2"/>
                  <path d="M1 4.5l6 4 6-4" stroke="#00C2FF" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <a href="mailto:privacy@linkra.io" className="text-[#00C2FF] text-sm font-bold hover:underline">
                  privacy@linkra.io
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* What gets deleted */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-xs font-black">02</span>
            <h2 className="text-white text-xl font-bold leading-snug pt-1">What Gets Deleted</h2>
          </div>
          <div className="ml-12 space-y-2.5">
            {[
              { item: 'Your Linkra account and profile information', deleted: true },
              { item: 'All cached message data from connected platforms', deleted: true },
              { item: 'OAuth access tokens for all connected platforms', deleted: true },
              { item: 'App usage and activity data', deleted: true },
              { item: 'Support communications (after 2 years)', deleted: true },
              { item: 'Billing records', deleted: false, note: 'Kept 7 years for legal/tax compliance' },
              { item: 'Original messages on Instagram, WhatsApp, Facebook, etc.', deleted: false, note: 'Must be deleted directly on those platforms' },
            ].map((row, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${row.deleted ? 'border-emerald-500/10 bg-emerald-500/4' : 'border-white/6 bg-white/2'}`}>
                <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  {row.deleted ? (
                    <>
                      <circle cx="7" cy="7" r="6" fill="#10B981" opacity="0.15"/>
                      <path d="M4 7l2.5 2.5L10 4.5" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  ) : (
                    <>
                      <circle cx="7" cy="7" r="6" fill="#F59E0B" opacity="0.15"/>
                      <path d="M7 4v3.5M7 9.5v.5" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/>
                    </>
                  )}
                </svg>
                <div>
                  <p className="text-white/65 text-sm">{row.item}</p>
                  {row.note && <p className="text-white/30 text-xs mt-0.5">{row.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-xs font-black">03</span>
            <h2 className="text-white text-xl font-bold leading-snug pt-1">Timeline</h2>
          </div>
          <div className="ml-12 space-y-3 text-white/55 text-sm leading-[1.9]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { time: 'Within 3 days', desc: 'We confirm your request via email' },
                { time: 'Within 30 days', desc: 'All personal data permanently deleted' },
                { time: '72 hours', desc: 'Platform OAuth tokens revoked immediately after disconnection' },
              ].map((t) => (
                <div key={t.time} className="p-4 rounded-xl border border-white/6 bg-white/2 text-center">
                  <p className="text-[#00C2FF] font-black text-base mb-1">{t.time}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facebook/Meta specific */}
        <div className="mb-10 p-5 rounded-2xl border border-[#7B2FFF]/20 bg-[#7B2FFF]/5">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#7B2FFF" strokeWidth="1.2"/>
              <path d="M8 5v4M8 10.5v.5" stroke="#7B2FFF" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-white/80 text-sm font-bold mb-1">For Meta / Facebook Platform Users</p>
              <p className="text-white/50 text-xs leading-relaxed">
                If you connected your Facebook or Instagram account to Linkra, you can also trigger data
                deletion directly from Facebook. Go to{' '}
                <span className="text-[#00C2FF]">Facebook Settings → Apps and Websites → Linkra → Remove</span>.
                This will send an automatic deletion request to Linkra. You will receive a confirmation
                with a deletion status URL within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Back links */}
        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 text-white/35 hover:text-[#00C2FF] text-sm transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Linkra
          </a>
          <a href="/privacy" className="flex items-center gap-1.5 text-white/35 hover:text-[#00C2FF] text-sm transition-colors">
            View Privacy Policy
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Linkra Inc. All rights reserved. ·{' '}
          <a href="/" className="hover:text-[#00C2FF] transition-colors">linkra.io</a>
        </p>
      </footer>
    </div>
  )
}
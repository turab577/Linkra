'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function InboxMockup() {
  const { ref, visible } = useInView(0.1)
  const messages = [
    { platformIcon: PlatformIcons.instagram, name: 'Sarah K.', msg: 'Hey! Loved your latest post 🔥', time: '2m', color: '#DD2A7B', unread: true },
    { platformIcon: PlatformIcons.whatsapp, name: 'Mom', msg: 'Are you coming home this weekend?', time: '5m', color: '#25D366', unread: true },
    { platformIcon: PlatformIcons.messenger, name: 'Alex R.', msg: "Got your message — let me check!", time: '12m', color: '#0099FF', unread: false },
    { platformIcon: PlatformIcons.whatsapp, name: 'Design Team', msg: 'Figma file updated, review by EOD', time: '1h', color: '#25D366', unread: true },
    { platformIcon: PlatformIcons.instagram, name: 'Jake W.', msg: 'Thanks for the collab 🙏', time: '2h', color: '#DD2A7B', unread: false },
    { platformIcon: PlatformIcons.telegram, name: 'Startup News', msg: 'New funding rounds in AI space...', time: '3h', color: '#229ED9', unread: false },
  ]

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(48px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      maxWidth: 700, margin: '0 auto', position: 'relative',
    }}>
      {/* Glow under mockup */}
      <div style={{
        position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
        width: '65%', height: 60,
        background: '#68bfcd', filter: 'blur(50px)', opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div style={{
        borderRadius: 22,
        border: '1px solid rgba(104,191,205,0.1)',
        background: 'rgba(15,31,53,0.88)',
        backdropFilter: 'blur(32px)',
        overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(104,191,205,0.07), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        {/* Browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '10px 16px',
          borderBottom: '1px solid rgba(104,191,205,0.07)',
          background: 'rgba(10,22,40,0.7)',
        }}>
          {[['#ff6058', '#ffbd2e', '#28ca42']].flat().map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.6 }} />
          ))}
          <div style={{
            flex: 1, margin: '0 12px',
            padding: '4px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            fontSize: '0.68rem', fontFamily: 'monospace',
            color: 'rgba(104,191,205,0.38)',
          }}>app.linkra.io/inbox</div>
        </div>

        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <div style={{
            width: 188, borderRight: '1px solid rgba(104,191,205,0.07)',
            padding: 12, flexShrink: 0,
          }}>
            <p style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(104,191,205,0.3)',
              padding: '0 8px', marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>Connected</p>
            {[
              { name: 'Instagram', icon: PlatformIcons.instagram, count: 3 },
              { name: 'WhatsApp', icon: PlatformIcons.whatsapp, count: 7 },
              { name: 'Messenger', icon: PlatformIcons.messenger, count: 1 },
              { name: 'Telegram', icon: PlatformIcons.telegram, count: 0 },
              { name: 'X / Twitter', icon: PlatformIcons.twitter, count: 2 },
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 8px', borderRadius: 10, cursor: 'default',
                transition: 'background 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  {p.icon}
                  <span style={{ fontSize: '0.73rem', color: 'rgba(200,221,226,0.5)', fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                </div>
                {p.count > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, padding: '0 4px',
                    background: '#68bfcd', color: '#0a1628',
                    borderRadius: 50, fontSize: '0.6rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{p.count}</span>
                )}
              </div>
            ))}
          </div>

          {/* Feed */}
          <div style={{ flex: 1, padding: 12 }}>
            <p style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(104,191,205,0.3)',
              padding: '0 8px', marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>All Messages · 13 unread</p>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 8px', borderRadius: 12, marginBottom: 2,
                background: m.unread ? 'rgba(104,191,205,0.05)' : 'transparent',
                cursor: 'default', transition: 'background 0.2s',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(104,191,205,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700, color: '#68bfcd',
                    fontFamily: "'Lora', Georgia, serif",
                  }}>{m.name[0]}</div>
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    width: 15, height: 15, borderRadius: '50%',
                    background: '#0f1f35',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ transform: 'scale(0.6)' }}>{m.platformIcon}</div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{
                      fontSize: '0.73rem',
                      fontWeight: m.unread ? 600 : 400,
                      color: m.unread ? '#fff' : 'rgba(200,221,226,0.38)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{m.name}</span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(200,221,226,0.18)', fontFamily: "'DM Sans', sans-serif" }}>{m.time}</span>
                  </div>
                  <p style={{
                    fontSize: '0.68rem', color: 'rgba(200,221,226,0.28)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{m.msg}</p>
                </div>
                {m.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
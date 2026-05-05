'use client'

import React from 'react'

export function PosterScene({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Dark overlay for consistent look */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(10,22,40,0.35)`,
        zIndex: 1,
      }} />

      {/* Hero content layer */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 2,
      }}>
        {children}
      </div>
    </div>
  )
}
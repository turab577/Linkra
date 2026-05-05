import React from 'react'

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.25rem' }}>
      <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, rgba(104,191,205,0.4))' }} />
      <span style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#68bfcd',
        fontFamily: "'Inter', sans-serif",
      }}>{children}</span>
      <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, rgba(104,191,205,0.4), transparent)' }} />
    </div>
  )
}
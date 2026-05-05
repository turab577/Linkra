import React from 'react'

export const PlatformIcons = {
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig)"/>
      <defs>
        <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529"/><stop offset="0.5" stopColor="#DD2A7B"/><stop offset="1" stopColor="#515BD4"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  whatsapp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#25D366" opacity="0.15"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5"/>
      <path d="M8.5 8.5c.2-.5.7-.8 1.2-.8.3 0 .5.1.7.3l1.2 2.4c.1.3.1.6-.1.8l-.5.6c.4.8 1.1 1.5 1.9 1.9l.6-.5c.2-.2.5-.2.8-.1l2.4 1.2c.2.1.3.4.3.7 0 .5-.3 1-.8 1.2-1.8.8-5-1-6.3-2.3C8.4 12.7 7.7 10.3 8.5 8.5z" fill="#25D366"/>
    </svg>
  ),
  messenger: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.29 2 11.5c0 2.85 1.37 5.4 3.52 7.12V22l3.36-1.86c.9.25 1.85.36 2.82.36 5.523 0 10-4.29 10-9.5S17.523 2 12 2z" fill="#0099FF" opacity="0.15"/>
      <path d="M12 2C6.477 2 2 6.29 2 11.5c0 2.85 1.37 5.4 3.52 7.12V22l3.36-1.86c.9.25 1.85.36 2.82.36 5.523 0 10-4.29 10-9.5S17.523 2 12 2z" stroke="#0099FF" strokeWidth="1.5"/>
      <path d="M6 14l3.75-4 2.5 2.5L16 9l-3.75 4-2.5-2.5L6 14z" fill="#0099FF"/>
    </svg>
  ),
  telegram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#229ED9" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#229ED9" strokeWidth="1.5"/>
      <path d="M17.5 7L5.5 11.5l4 1.5 1.5 4.5 2-2.5 3.5 2.5L17.5 7z" stroke="#229ED9" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" opacity="0.3"/>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <path d="M17 7h-2.5l-3 4-2.5-4H6l4.5 6L6 17h2.5l3-4 2.5 4H18l-4.5-6L17 7z" fill="white"/>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" opacity="0.15"/>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="#0A66C2" strokeWidth="1.5"/>
      <path d="M7 10v7M7 7v.5M11 17v-3.5c0-1 .7-2 2-2s2 1 2 2V17M11 10v7" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}
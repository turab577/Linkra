import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Linkra — Shorten, Track & Brand Your Links',
  description: 'Linkra is a modern link management platform. Create custom short links, track clicks with real-time analytics, generate QR codes, and rotate links across campaigns — all in one place.',
  keywords: 'link shortener, URL shortener, link analytics, branded links, QR code generator, link management',
  openGraph: {
    title: 'Linkra — Shorten, Track & Brand Your Links',
    description: 'Powerful link management for creators, marketers, and businesses.',
    url: 'https://linkra.io',
    siteName: 'Linkra',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linkra — Shorten, Track & Brand Your Links',
    description: 'Powerful link management for creators, marketers, and businesses.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}

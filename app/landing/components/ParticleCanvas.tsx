'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight

    canvas.width = W
    canvas.height = H

    // Particles
    const COUNT = 120
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number; pulseSpeed: number }
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }))

    // Mouse
    let mouse = { x: W / 2, y: H / 2 }
    const onMouseMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMouseMove)

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize)

    const TEAL = '104,191,205'
    const CONNECT_DIST = 120

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.pulse += p.pulseSpeed
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${TEAL},${pulseAlpha})`
        ctx.fill()
      }

      // Connect lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${TEAL},${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
        // Mouse repulsion
        const mdx = particles[i].x - mouse.x
        const mdy = particles[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 100) {
          const force = (1 - mdist / 100) * 0.8
          particles[i].vx += (mdx / mdist) * force * 0.05
          particles[i].vy += (mdy / mdist) * force * 0.05
        }
        // Damping
        particles[i].vx *= 0.99
        particles[i].vy *= 0.99
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
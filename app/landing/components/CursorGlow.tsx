'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
import { PlatformIcons } from './shared/PlatformIcons'
import { SectionLabel } from './shared/SectionLabel'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div ref={glowRef} style={{
      position: 'fixed',
      width: 450, height: 450,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 0,
      background: 'radial-gradient(circle, rgba(104,191,205,0.04) 0%, transparent 70%)',
      transform: 'translate(-50%,-50%)',
      transition: 'left 0.15s ease, top 0.15s ease',
    }} />
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Login2FAPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [tempToken, setTempToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
  const [attempts, setAttempts] = useState(0)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [expiresIn, setExpiresIn] = useState<number | null>(null)

  useEffect(() => {
    // Read the temp token and email from sessionStorage
    const token = sessionStorage.getItem('temp_2fa_token')
    const userEmail = sessionStorage.getItem('temp_2fa_email')
    
    if (!token) {
      // Direct access without token, redirect to login
      router.push('/login')
      return
    }
    
    setTempToken(token)
    if (userEmail) setEmail(userEmail)
    // decode token to get expiry for UX countdown
    if (token) {
      try {
        const parts = token.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]))
          if (payload.exp) {
            const secsLeft = payload.exp * 1000 - Date.now()
            setExpiresIn(Math.max(0, Math.floor(secsLeft / 1000)))
          }
        }
      } catch (e) { /* ignore */ }
    }
  }, [router])

  useEffect(() => {
    if (!expiresIn) return
    const t = setInterval(() => {
      setExpiresIn((v) => {
        if (!v) return null
        if (v <= 1) {
          // token expired, force redirect
          sessionStorage.removeItem('temp_2fa_token')
          sessionStorage.removeItem('temp_2fa_email')
          router.push('/login')
          return null
        }
        return v - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [expiresIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tempToken) return
    if (cooldownUntil && Date.now() < cooldownUntil) {
      setError('Too many attempts. Please wait before retrying.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tempToken, otp }),
      })

      if (res.ok) {
        sessionStorage.removeItem('temp_2fa_token')
        sessionStorage.removeItem('temp_2fa_email')
        router.push('/dashboard')
      } else {
        const data = await res.json()
        setError(data.message || 'Invalid OTP. Please try again.')
        setAttempts((a) => a + 1)
        if (attempts + 1 >= 5) {
          setCooldownUntil(Date.now() + 30 * 1000) // 30s cooldown
        }
        // handle session expired messages specifically
        if (data.message && data.message.toLowerCase().includes('session expired')) {
          sessionStorage.removeItem('temp_2fa_token')
          sessionStorage.removeItem('temp_2fa_email')
          router.push('/login')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email && !tempToken) return
    setResendLoading(true)
    setError('')
    
    try {
      const payload: any = {}
      if (tempToken) payload.token = tempToken
      else payload.email = email
      const res = await fetch('/api/auth/resend-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Failed to resend OTP.')
      } else {
        // update token and reset expiry
        if (data.token) {
          sessionStorage.setItem('temp_2fa_token', data.token)
          setTempToken(data.token)
          try {
            const parts = data.token.split('.')
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]))
              if (payload.exp) {
                const secsLeft = payload.exp * 1000 - Date.now()
                setExpiresIn(Math.max(0, Math.floor(secsLeft / 1000)))
              }
            }
          } catch (e) {}
        }
        // disable resend briefly to avoid spam
        setCooldownUntil(Date.now() + 10 * 1000)
      }
    } catch (err) {
      setError('An error occurred while resending OTP.')
    } finally {
      setResendLoading(false)
    }
  }

  if (!tempToken) {
    return null // prevent render flicker before redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-[#c8dde2] font-sans p-4">
      <div className="w-full max-w-md p-10 bg-[#0f1f35]/60 rounded-3xl border border-[#68bfcd]/15 backdrop-blur-md shadow-2xl relative">
        
        <button 
          onClick={() => router.push('/login')}
          className="absolute top-6 left-6 text-[#c8dde2]/60 hover:text-white transition-colors flex items-center justify-center"
          title="Back to login"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl font-bold text-white mb-2 font-serif">Two-Factor Authentication</h1>
          <p className="text-sm text-[#c8dde2]/60">
            Please enter the 6-digit code sent to <br/>
            <span className="text-white font-medium">{email || 'your email'}</span>
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm mb-2 text-[#c8dde2]/80 text-center">Verification Code</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only allow digits
              className="w-full p-4 bg-[#0a1628]/60 border border-[#68bfcd]/20 rounded-xl text-white text-center tracking-[1em] indent-[1em] text-2xl font-mono focus:outline-none focus:border-[#68bfcd] transition-colors"
              placeholder="000000"
              autoComplete="one-time-code"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className={`mt-2 p-3.5 w-full bg-gradient-to-br from-[#68bfcd] to-[#4aa8b8] rounded-xl text-[#0a1628] text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer`}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#c8dde2]/60">
            Didn't receive the code?{' '}
            <button 
              onClick={handleResend} 
              disabled={resendLoading || (cooldownUntil ? Date.now() < cooldownUntil : false)}
              className="text-[#68bfcd] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : (cooldownUntil && Date.now() < cooldownUntil) ? 'Wait...' : 'Resend Code'}
            </button>
          </p>
          {expiresIn != null && (
            <p className="text-xs text-[#c8dde2]/50 mt-2">Expires in {expiresIn}s</p>
          )}
        </div>
      </div>
    </div>
  )
}

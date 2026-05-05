'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('resetEmail')
    if (savedEmail) setEmail(savedEmail)
    else router.push('/forgot-password')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (res.ok) {
        localStorage.setItem('verifiedOtp', otp)
        router.push('/reset-password')
      } else {
        const data = await res.json()
        setError(data.message)
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050D1A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0A1628]/60 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Verify OTP</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Enter the 6-digit OTP sent to {email}</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">OTP Code</label>
            <input 
              type="text" required maxLength={6} value={otp} onChange={e => setOtp(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00C2FF] transition-colors text-center tracking-widest text-xl"
              placeholder="000000"
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#00C2FF] text-[#050D1A] font-bold rounded-xl transition-all shadow-lg hover:shadow-[#00C2FF]/30 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

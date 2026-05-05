'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('resetEmail')
    const savedOtp = localStorage.getItem('verifiedOtp')
    if (savedEmail && savedOtp) {
      setEmail(savedEmail)
      setOtp(savedOtp)
    } else {
      router.push('/forgot-password')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password })
      })

      if (res.ok) {
        localStorage.removeItem('resetEmail')
        localStorage.removeItem('verifiedOtp')
        router.push('/login')
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
        <h1 className="text-2xl font-bold text-white mb-2 text-center">New Password</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Create a new secure password.</p>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-[#00C2FF] transition-colors"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-[#00C2FF] transition-colors"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#00C2FF] text-[#050D1A] font-bold rounded-xl transition-all shadow-lg hover:shadow-[#00C2FF]/30 disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

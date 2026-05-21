'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingFacebook, setLoadingFacebook] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      // server may return 200 with requiresTwoFactor=true (short-lived token)
      if (data.requiresTwoFactor) {
        // persist short-lived token and email to sessionStorage for the /login-2fa page
        if (data.token) sessionStorage.setItem('temp_2fa_token', data.token)
        sessionStorage.setItem('temp_2fa_email', email)
        router.push('/login-2fa')
      } else if (res.ok) {
        router.push('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-[#c8dde2] font-sans p-4">
      <div className="w-full max-w-md p-10 bg-[#0f1f35]/60 rounded-3xl border border-[#68bfcd]/15 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-serif">Welcome Back</h1>
          <p className="text-sm text-[#c8dde2]/60">Enter your details to sign in</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <>
            <>
              <div>
                <label className="block text-sm mb-2 text-[#c8dde2]/80">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 bg-[#0a1628]/60 border border-[#68bfcd]/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#68bfcd] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-[#c8dde2]/80">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3.5 pl-4 pr-12 bg-[#0a1628]/60 border border-[#68bfcd]/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#68bfcd] transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link href="/forgot-password" className="text-xs text-[#68bfcd] font-semibold hover:underline">Forgot password?</Link>
                </div>
              </div>
            </>
          </>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 p-3.5 w-full bg-gradient-to-br from-[#68bfcd] to-[#4aa8b8] rounded-xl text-[#0a1628] text-sm font-bold transition-all hover:scale-[1.02] ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-[#c8dde2]/50 uppercase tracking-wider">Or continue with</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setLoadingGoogle(true)
              router.push('/api/auth/google/redirect')
            }}
            disabled={loadingGoogle}
            className={`w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors ${loadingGoogle ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            {loadingGoogle ? 'Continuing with Google...' : 'Google'}
          </button>
          <button
            type="button"
            onClick={() => {
              setLoadingFacebook(true)
              router.push('/api/auth/facebook/redirect')
            }}
            disabled={loadingFacebook}
            className={`w-full p-3.5 bg-[#1877F2] rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-3 hover:bg-[#1877F2]/90 transition-colors ${loadingFacebook ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            {loadingFacebook ? 'Continuing with Facebook...' : 'Facebook'}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-[#c8dde2]/60">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#68bfcd] font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

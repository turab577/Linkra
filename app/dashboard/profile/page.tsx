'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Save, CheckCircle2, AlertCircle, Mail, User } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [initial, setInitial] = useState({ name: '', image: '' })
  const router = useRouter()

  useEffect(() => {
    fetch('/api/user/profile').then(r => r.json()).then(data => {
      if (data.id) {
        setProfile(data)
        setName(data.name || '')
        setImage(data.image || '')
        setInitial({ name: data.name || '', image: data.image || '' })
      }
    })
  }, [])

  const isChanged = useMemo(() =>
    name.trim() !== initial.name.trim() || image.trim() !== initial.image.trim()
  , [name, image, initial])

  const readFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setError('File too large. Max 5MB.'); return }
    setError('')
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image })
      })
      if (res.ok) {
        setSuccess('Profile updated successfully!')
        const updated = await fetch('/api/user/profile').then(r => r.json())
        if (updated?.id) {
          setProfile(updated); setName(updated.name || ''); setImage(updated.image || '')
          setInitial({ name: updated.name || '', image: updated.image || '' })
          try { router.refresh() } catch {}
          try { window.dispatchEvent(new CustomEvent('profile:update', { detail: updated })) } catch {}
        }
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  if (!profile) return (
    <div className="flex items-center w-full h-full justify-center gap-3 p-8 text-gray-500">
      <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-[#00C2FF] animate-spin" />
      <span className="text-sm">Loading profile…</span>
    </div>
  )

  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <div className="p-4 md:p-8 pb-20 w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information and profile picture.</p>
      </header>

      <div className="bg-[#0A1628]/60 rounded-3xl border border-white/5 backdrop-blur-md overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-[#00C2FF] via-[#006FFF] to-transparent" />

        <div className="p-6 md:p-8 space-y-8">

          {/* Avatar + upload */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/5">
            <div
              className="relative group cursor-pointer flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-[#00C2FF]/50 to-[#006FFF]/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0D1F3C] flex items-center justify-center">
                  {image
                    ? <img src={image} alt="Profile" className="w-full h-full object-cover" />
                    : <span className="text-2xl font-bold text-[#00C2FF]">{initials}</span>
                  }
                </div>
              </div>
              <div className="absolute inset-[2px] rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="font-semibold text-white mb-1">Profile Picture</p>
              <p className="text-sm text-gray-500 mb-3">PNG, JPG or GIF · Max 5MB</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm text-white/70 hover:border-[#00C2FF]/40 hover:text-[#00C2FF] transition-colors"
              >
                <Camera size={14} /> Upload Photo
              </button>
              <input
                type="file" accept="image/*" ref={fileInputRef}
                onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f) }}
                className="hidden"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-sm">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-[#050D1A] border border-white/8 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#00C2FF]/40 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                  <input
                    type="email" value={profile.email} disabled
                    className="w-full bg-[#050D1A]/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-gray-600 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit" disabled={loading || !isChanged}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C2FF] hover:bg-[#22CFFF] text-[#050D1A] font-bold text-sm rounded-xl transition-colors shadow-[0_4px_20px_rgba(0,194,255,0.2)] disabled:opacity-35 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><div className="w-3.5 h-3.5 rounded-full border-2 border-[#050D1A]/30 border-t-[#050D1A] animate-spin" /> Saving…</>
                  : <><Save size={15} /> Save Changes</>
                }
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
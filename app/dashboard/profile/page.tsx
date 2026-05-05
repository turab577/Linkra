'use client'

import { useState, useEffect, useRef } from 'react'
import { User, Camera, Save } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setProfile(data)
          setName(data.name || '')
          setImage(data.image || '')
        }
      })
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
        setSuccess('Profile updated successfully! Refreshing...')
        setTimeout(() => window.location.reload(), 1500)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) return <div className="p-8 text-gray-400">Loading profile...</div>

  return (
    <div className="p-4 md:p-8 space-y-8  mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your personal information and profile picture.</p>
      </header>

      <form onSubmit={handleSave} className="bg-[#0A1628]/60 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-md space-y-8">

        {/* Avatar Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/5">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-white/10" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] font-bold text-3xl border-2 border-[#00C2FF]/30">
                {name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" />
            </div>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="font-bold text-white">Profile Picture</h3>
            <p className="text-sm text-gray-400 mb-2">Enter an image URL or choose a file to update your photo.</p>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="w-full sm:flex-1 bg-[#050D1A] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
              <span className="text-gray-500 text-sm hidden sm:inline">or</span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#050D1A] border border-white/10 hover:border-[#00C2FF] rounded-xl text-white text-sm transition-colors whitespace-nowrap"
              >
                Choose from Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050D1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Email Address (Read Only)</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-[#050D1A]/50 border border-white/5 rounded-xl py-3 px-4 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm text-center">
              {success}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-[#050D1A] font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}

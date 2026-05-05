'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Instagram, MessageCircle, Send, Phone, Search,
  MoreVertical, CheckCheck, Loader2,
  Bell, Hash, ArrowLeft, ChevronDown,
  Paperclip, Camera, Mic, X, Pause, Play
} from 'lucide-react'

// Dummy Data
const DUMMY_MESSAGES = [
  { id: 1, platform: 'whatsapp', sender: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=1', lastMessage: 'Hey! Are we still meeting tomorrow?', time: '10:30 AM', unread: 2, online: true },
  { id: 2, platform: 'instagram', sender: 'john_doe_99', avatar: 'https://i.pravatar.cc/150?u=2', lastMessage: 'Loved your recent post!', time: '9:15 AM', unread: 0, online: false },
  { id: 3, platform: 'telegram', sender: 'Crypto Group', avatar: 'https://i.pravatar.cc/150?u=3', lastMessage: 'Bitcoin just hit 100k!', time: 'Yesterday', unread: 15, online: true },
  { id: 4, platform: 'messenger', sender: 'Mom', avatar: 'https://i.pravatar.cc/150?u=4', lastMessage: 'Call me when you are free.', time: 'Yesterday', unread: 0, online: false },
  { id: 5, platform: 'whatsapp', sender: 'Tech Team', avatar: 'https://i.pravatar.cc/150?u=5', lastMessage: 'PR is merged to main branch.', time: 'Tue', unread: 0, online: true },
]

export default function InboxPage() {
  const router = useRouter()
  const [activePlatform, setActivePlatform] = useState('all')
  const [messages, setMessages] = useState<typeof DUMMY_MESSAGES>([])
  const [loading, setLoading] = useState(true)
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  type ChatMessage = {
    id: number;
    text: string;
    sender: 'me' | 'them';
    time: string;
    attachment?: { url: string; type: string };
  }
  const [activeConversation, setActiveConversation] = useState<ChatMessage[]>([])
  const [messageText, setMessageText] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      if (activePlatform === 'all') {
        setMessages(DUMMY_MESSAGES)
      } else {
        setMessages(DUMMY_MESSAGES.filter(m => m.platform === activePlatform))
      }
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [activePlatform])

  useEffect(() => {
    if (activeChat) {
      const chat = messages.find(m => m.id === activeChat)
      if (chat) {
        setActiveConversation([
          { id: 1, text: chat.lastMessage, sender: 'them', time: chat.time },
          { id: 2, text: "Sounds great! I'll get back to you shortly with the details.", sender: 'me', time: 'Just now' }
        ])
      }
    }
  }, [activeChat, messages])

  const [selectedFile, setSelectedFile] = useState<{ url: string, type: string } | null>(null)

  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false)
  const [isRecordingPaused, setIsRecordingPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioVolumes, setAudioVolumes] = useState<number[]>(Array(20).fill(5))

  const isRecordingPausedRef = useRef(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | null>(null)

  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      setIsCameraOpen(true)
      // Small timeout to allow video element to render
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      }, 100)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Camera access denied or unavailable.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraOpen(false)
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setSelectedFile({ url, type: 'image/jpeg' })
            stopCamera()
          }
        }, 'image/jpeg')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedFile({ url, type: file.type })
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Audio Visualization Setup
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass()
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 64
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)

        audioContextRef.current = audioCtx
        analyserRef.current = analyser

        const dataArray = new Uint8Array(analyser.frequencyBinCount)

        const updateVolumes = () => {
          if (!analyserRef.current) return

          if (!isRecordingPausedRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray)

            const newVolumes = []
            for (let i = 0; i < 20; i++) {
              let sum = 0
              sum += dataArray[i] || 0
              newVolumes.push(Math.max(5, (sum / 255) * 32))
            }
            setAudioVolumes(newVolumes)
          } else {
            setAudioVolumes(Array(20).fill(5))
          }
          animationRef.current = requestAnimationFrame(updateVolumes)
        }
        updateVolumes()
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setSelectedFile({ url: audioUrl, type: 'audio/webm' })
      }

      mediaRecorder.start()
      setIsRecording(true)
      setIsRecordingPaused(false)
      isRecordingPausedRef.current = false
      setRecordingTime(0)

      recordingIntervalRef.current = setInterval(() => {
        if (!isRecordingPausedRef.current) {
          setRecordingTime(prev => prev + 1)
        }
      }, 1000)

    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert("Microphone access denied or unavailable.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isRecordingPausedRef.current) {
        mediaRecorderRef.current.resume()
      }
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      setIsRecordingPaused(false)
      isRecordingPausedRef.current = false
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current)

      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setAudioVolumes(Array(20).fill(5))
    }
  }

  const togglePauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isRecordingPausedRef.current) {
        mediaRecorderRef.current.resume()
        isRecordingPausedRef.current = false
        setIsRecordingPaused(false)
      } else {
        mediaRecorderRef.current.pause()
        isRecordingPausedRef.current = true
        setIsRecordingPaused(true)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const getPlatformIcon = (platform: string, size = 18) => {
    switch (platform) {
      case 'whatsapp': return <Phone size={size} className="text-green-500" />
      case 'instagram': return <Instagram size={size} className="text-pink-500" />
      case 'telegram': return <Send size={size} className="text-blue-400" />
      case 'messenger': return <MessageCircle size={size} className="text-blue-500" />
      default: return <MessageCircle size={size} className="text-gray-400" />
    }
  }

  const activeChatData = activeChat ? messages.find(m => m.id === activeChat) : null

  const handleSend = () => {
    if (!messageText.trim() && !selectedFile) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: messageText.trim(),
      sender: 'me',
      time: 'Just now',
      attachment: selectedFile || undefined
    }

    setActiveConversation(prev => [...prev, newMessage])
    setMessageText("")
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const newValue = messageText.substring(0, start) + "\n" + messageText.substring(end);
        setMessageText(newValue);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 1;
        }, 0);
      } else if (!e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          const url = URL.createObjectURL(file);
          setSelectedFile({ url, type: file.type });
          break; // Support one file paste at a time
        }
      }
    }
  }

  const PLATFORMS = [
    { id: 'all', name: 'All Messages', icon: <MessageCircle size={16} /> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <Phone size={16} className="text-green-500" /> },
    { id: 'instagram', name: 'Instagram', icon: <Instagram size={16} className="text-pink-500" /> },
    { id: 'telegram', name: 'Telegram', icon: <Send size={16} className="text-blue-400" /> },
  ]
  const currentPlatform = PLATFORMS.find(p => p.id === activePlatform) || PLATFORMS[0]

  return (
    <div className="flex h-full bg-[#050D1A] text-white overflow-hidden font-sans relative">

      {/* Mobile Header (Back button when in chat) */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-[#0A1628]/90 backdrop-blur-md z-40 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#69c0d2] to-blue-500 flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <span className="font-bold">Inbox</span>
        </div>
        {activeChat && (
          <button onClick={() => setActiveChat(null)} className="text-sm font-medium text-[#69c0d2]">
            Back to List
          </button>
        )}
      </div>

      {/* Inbox List - Hidden on mobile if chat is active */}
      <div className={`
        w-full md:w-80 border-r border-white/10 bg-[#0A1628]/30 flex-col backdrop-blur-md pt-16 md:pt-0 h-full min-h-0
        ${activeChat ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl font-bold hidden md:block">Messages</h2>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors ml-auto md:ml-0">
              <Bell size={16} className="text-gray-300" />
            </div>
          </div>
          <div className="mb-4 relative z-20">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#050D1A]/60 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-xl py-3 px-4 text-sm text-gray-200 transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  {currentPlatform.icon}
                </div>
                <span className="font-semibold">{currentPlatform.name}</span>
              </div>
              <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setActivePlatform(platform.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activePlatform === platform.id
                          ? 'bg-[#69c0d2]/10 text-[#69c0d2] font-medium'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      <div className={`p-1.5 rounded-lg ${activePlatform === platform.id ? 'bg-[#69c0d2]/20' : 'bg-white/5'}`}>
                        {platform.icon}
                      </div>
                      {platform.name}
                      {activePlatform === platform.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#69c0d2] ml-auto shadow-[0_0_8px_#69c0d2]"></div>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#69c0d2]/50 focus:bg-black/40 transition-all text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-400">
              <Loader2 size={32} className="animate-spin text-[#69c0d2]" />
            </div>
          ) : (
            <div className="p-3 space-y-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setActiveChat(msg.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border ${activeChat === msg.id
                      ? 'bg-gradient-to-r from-white/10 to-transparent border-white/10'
                      : 'border-transparent hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={msg.avatar} alt={msg.sender} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                      <div className="absolute -bottom-1 -right-1 bg-[#0A1628] rounded-full p-0.5">
                        {getPlatformIcon(msg.platform, 14)}
                      </div>
                      {msg.online && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A1628]"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-sm truncate">{msg.sender}</h3>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400 truncate pr-2">{msg.lastMessage}</p>
                        {msg.unread > 0 && (
                          <span className="bg-[#69c0d2] text-[#050D1A] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {msg.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area - Hidden on mobile if NO chat is active */}
      <div className={`
        flex-1 flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative min-h-0
        ${!activeChat ? 'hidden md:flex' : 'flex'} pt-16 md:pt-0
      `}>
        {activeChatData ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/95 via-[#050D1A]/98 to-[#050D1A] z-0"></div>

            {/* Chat Header */}
            <div className="h-16 md:h-20 border-b border-white/10 px-4 md:px-6 flex items-center justify-between bg-[#0A1628]/80 backdrop-blur-md z-10 sticky top-0 hidden md:flex">
              <div className="flex items-center gap-4">
                <img src={activeChatData.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-white/10" />
                <div>
                  <h2 className="font-bold text-md flex items-center gap-2">
                    {activeChatData.sender}
                    {getPlatformIcon(activeChatData.platform, 16)}
                  </h2>
                  <p className="text-xs text-[#69c0d2]">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Search size={20} className="cursor-pointer hover:text-white transition-colors" />
                <MoreVertical size={20} className="cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Messages Window */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 flex flex-col">
              <div className="text-center">
                <span className="text-xs font-medium text-gray-500 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                  Today
                </span>
              </div>

              {activeConversation.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 max-w-[90%] md:max-w-[80%] ${msg.sender === 'me' ? 'ml-auto justify-end' : ''}`}>
                  {msg.sender === 'them' && (
                    <img src={activeChatData.avatar} className="w-8 h-8 rounded-full mb-1 hidden sm:block" />
                  )}
                  <div className={`${msg.sender === 'me'
                      ? 'bg-[#69c0d2] rounded-br-sm shadow-[0_4px_20px_rgba(105,192,210,0.3)]'
                      : 'bg-white/10 backdrop-blur-sm border border-white/10 rounded-bl-sm shadow-lg'
                    } p-3 md:p-4 rounded-2xl text-sm ${msg.sender === 'me' ? 'text-[#050D1A] font-medium' : 'text-gray-100'}`}>

                    {msg.attachment && (
                      <div className="mb-2">
                        {msg.attachment.type.startsWith('image/') ? (
                          <img src={msg.attachment.url} alt="Attachment" className="max-w-full rounded-xl border border-white/20" />
                        ) : msg.attachment.type.startsWith('audio/') ? (
                          <audio src={msg.attachment.url} controls className="h-10 w-full" />
                        ) : (
                          <div className={`flex items-center gap-2 p-2 rounded-lg border ${msg.sender === 'me' ? 'bg-[#050D1A]/10 border-[#050D1A]/20' : 'bg-black/20 border-white/10'}`}>
                            <Paperclip size={16} />
                            <span className="text-xs truncate">Attachment</span>
                          </div>
                        )}
                      </div>
                    )}

                    {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                    <div className={`flex items-center gap-1 mt-2 text-[10px] ${msg.sender === 'me' ? 'text-[#050D1A]/60 justify-end font-semibold' : 'text-gray-400'}`}>
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck size={14} className="text-[#050D1A]/80" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} className="mt-auto"></div>
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-[#0A1628]/80 backdrop-blur-md border-t border-white/10 z-10 flex flex-col gap-3">
              {/* Hidden Inputs */}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={cameraInputRef}
                onChange={handleFileChange}
              />

              {/* Attachment Preview */}
              {selectedFile && (
                <div className="max-w-4xl mx-auto w-full flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    {selectedFile.type.startsWith('image/') ? (
                      <img src={selectedFile.url} alt="Attachment" className="h-12 w-12 object-cover rounded-lg border border-white/20" />
                    ) : selectedFile.type.startsWith('audio/') ? (
                      <audio src={selectedFile.url} controls className="h-10" />
                    ) : (
                      <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                        <Paperclip size={20} className="text-[#69c0d2]" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-white truncate max-w-[150px] md:max-w-xs">Attachment ready</span>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="max-w-4xl mx-auto w-full flex items-end gap-1 md:gap-2 bg-black/20 p-1.5 md:p-2 rounded-2xl border border-white/5 shadow-inner">
                {!isRecording ? (
                  <>
                    <div className="flex">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 md:p-3 text-gray-400 hover:text-[#69c0d2] transition-colors rounded-xl hover:bg-white/5"
                        title="Attach File"
                      >
                        <Paperclip size={20} />
                      </button>
                      <button
                        onClick={startCamera}
                        className="p-2 md:p-3 text-gray-400 hover:text-[#69c0d2] transition-colors rounded-xl hover:bg-white/5"
                        title="Camera"
                      >
                        <Camera size={20} />
                      </button>
                    </div>

                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      rows={1}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent resize-none focus:outline-none py-2.5 md:py-3 text-sm text-white placeholder-gray-500 max-h-32 px-2 overflow-y-auto"
                    />

                    <div className="flex items-center">
                      <button
                        onClick={startRecording}
                        className="p-2 md:p-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5 mr-1 md:mr-2"
                        title="Voice Message"
                      >
                        <Mic size={20} />
                      </button>
                      <button
                        onClick={handleSend}
                        className="p-2 md:p-3 bg-gradient-to-r from-[#69c0d2] to-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(105,192,210,0.3)] hover:shadow-blue-500/50 transition-all transform hover:scale-105 active:scale-95"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-[#69c0d2]/10 rounded-xl px-4 py-2 border border-[#69c0d2]/20 shadow-[0_0_15px_rgba(105,192,210,0.1)]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2.5 h-2.5 bg-[#69c0d2] rounded-full animate-pulse shadow-[0_0_8px_#69c0d2] mr-1"></div>

                      {/* Live Audio Waves */}
                      <div className="flex items-center gap-[2px] h-10 w-24 md:w-32">
                        {audioVolumes.map((vol, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#69c0d2]/40 to-[#69c0d2] rounded-full transition-all duration-75 shadow-[0_0_5px_rgba(105,192,210,0.4)]"
                            style={{ height: `${vol}px` }}
                          />
                        ))}
                      </div>

                      <span className="text-[#69c0d2] font-mono font-bold ml-1 tracking-wider">{formatTime(recordingTime)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={togglePauseRecording}
                        className="p-1.5 bg-white/5 hover:bg-white/10 text-[#69c0d2] rounded-lg transition-all"
                        title={isRecordingPaused ? "Resume" : "Pause"}
                      >
                        {isRecordingPaused ? <Play size={18} /> : <Pause size={18} />}
                      </button>
                      <button
                        onClick={stopRecording}
                        className="px-4 py-1.5 bg-[#0A1628] hover:bg-white/10 text-[#69c0d2] text-sm font-bold rounded-lg border border-[#69c0d2]/30 hover:border-[#69c0d2]/60 transition-all"
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#050D1A] z-10 relative h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#050D1A] via-[#0A1628] to-[#050D1A] z-0"></div>
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#69c0d2]/10 rounded-full blur-3xl z-0 animate-pulse"></div>
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_0_40px_rgba(105,192,210,0.1)] flex items-center justify-center mb-6 backdrop-blur-md">
                <MessageCircle size={40} className="text-[#69c0d2] drop-shadow-[0_0_15px_rgba(105,192,210,0.5)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Inbox, Elevated</h3>
              <p className="text-gray-400 max-w-sm text-center text-sm leading-relaxed">
                Select a conversation from the left to start messaging, sharing media, and collaborating in real-time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Camera Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-8">
            <button
              onClick={stopCamera}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"
            >
              <X size={28} />
            </button>
            <button
              onClick={captureImage}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 shadow-[0_0_20px_rgba(255,255,255,0.5)] active:scale-95 transition-transform flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full border-2 border-black/10"></div>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

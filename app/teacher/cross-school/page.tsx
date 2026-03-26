'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import { Search, Globe, MessageSquare, Send, ArrowLeft, Users, Building2 } from 'lucide-react'
import { apiFetch } from '@/lib/api'

interface Lecturer {
  _id: string
  firstName: string
  lastName: string
  email?: string
  department?: string
  username: string
}

export default function CrossSchoolPage() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [messageText, setMessageText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const uStr = sessionStorage.getItem('user')
    if (uStr) setCurrentUser(JSON.parse(uStr))
  }, [])

  useEffect(() => {
    const loadLecturers = async () => {
      try {
        const isMock = false
        if (isMock) {
          setLecturers([
            { _id: '1', firstName: 'Dr. Amaka', lastName: 'Obi', department: 'Computer Science', username: 'amaka@uni.edu' },
            { _id: '2', firstName: 'Prof. Chidi', lastName: 'Nwosu', department: 'Physics', username: 'chidi@uni.edu' },
            { _id: '3', firstName: 'Dr. Fatima', lastName: 'Bello', department: 'Mathematics', username: 'fatima@uni.edu' },
            { _id: '4', firstName: 'Dr. Emeka', lastName: 'Eze', department: 'Computer Science', username: 'emeka@uni.edu' },
            { _id: '5', firstName: 'Prof. Ngozi', lastName: 'Adekunle', department: 'Chemistry', username: 'ngozi@uni.edu' },
            { _id: '6', firstName: 'Dr. Tunde', lastName: 'Adeyemi', department: 'Physics', username: 'tunde@uni.edu' },
          ])
          setIsLoading(false)
          return
        }

        const res = await apiFetch('/users')
        if (!res.isMock) {
          const teachers = (res.data?.data || []).filter(
            (u: any) => u.role === 'teacher' && u._id !== currentUser?._id && u._id !== currentUser?.id
          )
          setLecturers(teachers)
        }
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }
    loadLecturers()
  }, [currentUser])

  // Load messages when a lecturer is selected
  useEffect(() => {
    if (!selectedLecturer) return
    const loadMessages = async () => {
      try {
        const isMock = false
        if (isMock) {
          setMessages([
            { _id: 'm1', body: 'Hello, I wanted to discuss the upcoming faculty seminar.', senderId: { _id: selectedLecturer._id, firstName: selectedLecturer.firstName }, createdAt: new Date(Date.now() - 3600000).toISOString() },
            { _id: 'm2', body: 'Sure, when works for you?', senderId: { _id: 'me', firstName: 'You' }, createdAt: new Date(Date.now() - 1800000).toISOString() },
          ])
          return
        }

        const res = await apiFetch('/messages')
        if (!res.isMock) {
          const uid = currentUser?._id || currentUser?.id
          const thread = (res.data?.data || []).filter((m: any) => {
            const sId = typeof m.senderId === 'object' ? m.senderId._id : m.senderId
            const rId = typeof m.receiverId === 'object' ? m.receiverId._id : m.receiverId
            return (sId === uid && rId === selectedLecturer._id) || (sId === selectedLecturer._id && rId === uid)
          })
          setMessages(thread)
        }
      } catch (err) {
        console.error(err)
      }
    }
    loadMessages()
  }, [selectedLecturer, currentUser])

  const handleSend = async () => {
    if (!messageText.trim() || !selectedLecturer) return
    setIsSending(true)
    try {
      const res = await apiFetch('/messages', {
        method: 'POST',
        body: JSON.stringify({
          receiverId: selectedLecturer._id,
          subject: 'Cross-School',
          body: messageText,
        })
      })
      if (!res.isMock) {
        setMessages(prev => [...prev, {
          _id: Date.now().toString(),
          body: messageText,
          senderId: { _id: currentUser?._id || currentUser?.id || 'me', firstName: 'You' },
          receiverId: { _id: selectedLecturer._id },
          createdAt: new Date().toISOString()
        }])
      }
      setMessageText('')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  // Group lecturers by department
  const departments = lecturers.reduce<Record<string, Lecturer[]>>((acc, l) => {
    const dept = l.department || 'General'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(l)
    return acc
  }, {})

  const filteredDepts = Object.entries(departments)
    .map(([dept, members]) => ({
      dept,
      members: members.filter(m =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(d => d.members.length > 0)
    .sort((a, b) => a.dept.localeCompare(b.dept))

  if (selectedLecturer) {
    const uid = currentUser?._id || currentUser?.id || 'me'
    return (
      <div className="space-y-6">
        <PillButton variant="outline" onClick={() => { setSelectedLecturer(null); setMessages([]) }}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Directory
        </PillButton>

        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                {selectedLecturer.firstName.charAt(0)}
              </div>
              <div>
                <CardTitle>{selectedLecturer.firstName} {selectedLecturer.lastName}</CardTitle>
                <CardDescription>{selectedLecturer.department || 'General'} Department</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => {
                  const sId = typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId
                  const isMe = sId === uid || sId === 'me'
                  return (
                    <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-emerald-500 text-white rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}>
                        <p>{msg.body}</p>
                        <p className={`text-xs mt-1 ${isMe ? 'text-emerald-100' : 'text-muted-foreground'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 flex items-center gap-3">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <PillButton onClick={handleSend} disabled={isSending || !messageText.trim()}>
                <Send className="h-4 w-4" />
              </PillButton>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
          <Globe className="h-8 w-8 text-emerald-500" />
          Cross-School Communication
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse and message lecturers across all departments.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-muted-foreground animate-pulse">Loading directory...</div>
      ) : filteredDepts.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-muted-foreground">No lecturers found matching your search.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {filteredDepts.map(({ dept, members }) => (
            <div key={dept}>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">{dept}</h2>
                <Badge variant="secondary" className="ml-2">{members.length} lecturer{members.length > 1 ? 's' : ''}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((l) => (
                  <Card
                    key={l._id}
                    className="cursor-pointer hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
                    onClick={() => setSelectedLecturer(l)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">
                          {l.firstName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{l.firstName} {l.lastName}</p>
                          <p className="text-xs text-muted-foreground truncate">{l.email || l.username}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Send Message
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

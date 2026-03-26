'use client'

import { useState, useEffect } from 'react'
import { Send, Search, Paperclip } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { apiFetch } from '@/lib/api'

interface Contact {
  id: string
  name: string
  avatar: string
  relationship: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface ChatMessage {
  id: string
  sender: string
  content: string
  timestamp: string
  isMe: boolean
  createdAt: string
}

export default function ParentMessagesPage() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [allMessages, setAllMessages] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const uStr = sessionStorage.getItem('user')
    if (uStr) {
      setCurrentUser(JSON.parse(uStr))
    }

    const loadMessages = async () => {
      try {
        const res = await apiFetch('/messages')
        if (res.isMock) {
          setContacts([
            { id: '1', name: 'John Smith', avatar: 'JS', relationship: 'Teacher', lastMessage: 'Great progress on recent exams!', timestamp: new Date().toISOString(), unread: true },
            { id: '2', name: 'Emily Davis', avatar: 'ED', relationship: 'Teacher', lastMessage: 'Quarterly progress report ready', timestamp: new Date(Date.now() - 3600000).toISOString(), unread: false },
          ])
          setAllMessages([
            { _id: 'm1', senderId: { _id: '1', firstName: 'John', lastName: 'Smith' }, receiverId: { _id: 'me', role: 'parent' }, body: 'Great progress on recent exams!', createdAt: new Date().toISOString() },
            { _id: 'm2', senderId: { _id: '2', firstName: 'Emily', lastName: 'Davis' }, receiverId: { _id: 'me', role: 'parent' }, body: 'Quarterly progress report ready', createdAt: new Date(Date.now() - 3600000).toISOString() },
          ])
        } else {
          const msgs = res.data?.data || []
          setAllMessages(msgs)

          const uDataStr = sessionStorage.getItem('user')
          const uData = uDataStr ? JSON.parse(uDataStr) : null;

          const contactsMap = new Map<string, Contact>()

          msgs.forEach((m: any) => {
            let contactUser = m.senderId
            let isMe = false

            const myId = uData?._id || uData?.id

            if (myId && m.senderId && m.senderId._id === myId) {
              contactUser = m.receiverId
              isMe = true
            } else if (!myId && m.senderId && (m.senderId.role === 'parent' || m.senderId.role === 'admin')) {
              contactUser = m.receiverId
              isMe = true
            }

            if (!contactUser) return;
            const cid = contactUser._id

            if (!contactsMap.has(cid)) {
              contactsMap.set(cid, {
                id: cid,
                name: `${contactUser.firstName} ${contactUser.lastName}`,
                avatar: `${contactUser.firstName?.[0] || 'U'}${contactUser.lastName?.[0] || ''}`,
                relationship: contactUser.role === 'teacher' ? 'Lecturer' : 'Admin',
                lastMessage: m.body,
                timestamp: m.createdAt,
                unread: !isMe && !m.isRead
              })
            } else {
              const existing = contactsMap.get(cid)!
              if (new Date(m.createdAt) > new Date(existing.timestamp)) {
                existing.lastMessage = m.body;
                existing.timestamp = m.createdAt;
                if (!isMe && !m.isRead) existing.unread = true;
              }
            }
          })

          setContacts(Array.from(contactsMap.values()).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadMessages()
  }, [])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedContactData = selectedContact ? contacts.find(c => c.id === selectedContact) : null

  const chatMessages: ChatMessage[] = allMessages
    .filter(m => {
      if (m.senderId && m.senderId._id === selectedContact) return true
      if (m.receiverId && m.receiverId._id === selectedContact) return true
      if (m.senderId && typeof m.senderId === 'string' && m.senderId === selectedContact) return true
      if (m.receiverId && typeof m.receiverId === 'string' && m.receiverId === selectedContact) return true
      return false
    })
    .map(m => {
      const uDataStr = sessionStorage.getItem('user')
      const uData = uDataStr ? JSON.parse(uDataStr) : null;
      const myId = uData?._id || uData?.id
      const isMe = (m.senderId && m.senderId._id === myId) || (typeof m.senderId === 'string' && m.senderId === myId)

      return {
        id: m._id,
        sender: isMe ? 'You' : `${m.senderId.firstName || 'Sender'}`,
        content: m.body,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe,
        createdAt: m.createdAt
      }
    })
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedContact) return;

    if (allMessages.length > 0 && allMessages[0]._id.startsWith('m')) {
      alert('Cannot send live messages in dummy mode. Please switch to Live API.');
      return;
    }

    setIsSending(true)
    try {
      const res = await apiFetch('/messages', {
        method: 'POST',
        body: JSON.stringify({
          receiverId: selectedContact,
          subject: 'Reply',
          body: messageText
        })
      })

      if (!res.isMock) {
        setAllMessages(prev => [...prev, {
          ...res.data.data,
          senderId: { _id: currentUser?._id || 'me', firstName: 'You' },
          receiverId: { _id: selectedContact }
        }])

        setContacts(prev => prev.map(c =>
          c.id === selectedContact ? { ...c, lastMessage: messageText, timestamp: new Date().toISOString(), unread: false } : c
        ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))

        setMessageText('')
      }
    } catch (e) {
      alert('Failed to send message')
      console.error(e)
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    if (selectedContact) {
      allMessages.forEach(m => {
        if (m.senderId && m.senderId._id === selectedContact && !m.isRead) {
          apiFetch(`/messages/${m._id}/read`, { method: 'PUT', body: '{}' }).catch(console.error)
          m.isRead = true;
        }
      })
      setContacts(prev => prev.map(c => c.id === selectedContact ? { ...c, unread: false } : c))
    }
  }, [selectedContact, allMessages])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Messages
        </h1>
        <p className="text-muted-foreground">
          Communicate with lecturers about your child&apos;s progress
        </p>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Staff Contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedContact === contact.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted'
                    }`}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={selectedContact === contact.id ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary'}>
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`font-medium text-sm truncate ${contact.unread ? 'font-bold' : ''}`}>{contact.name}</p>
                        {contact.unread && (
                          <Badge className="bg-destructive h-5 px-1 py-0 text-[10px]" variant="destructive">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs truncate ${selectedContact === contact.id ? 'opacity-90' : 'text-muted-foreground'} ${contact.unread ? 'text-foreground font-medium' : ''}`}>
                        {contact.lastMessage}
                      </p>
                      <p className={`text-[10px] mt-1 ${selectedContact === contact.id ? 'opacity-75' : 'text-muted-foreground'}`}>
                        {new Date(contact.timestamp).toLocaleDateString()} {new Date(contact.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <div className="text-center text-xs text-muted-foreground pt-4">No conversations found.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        {selectedContactData ? (
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">{selectedContactData.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedContactData.name}</CardTitle>
                  <CardDescription>{selectedContactData.relationship}</CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isMe
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'opacity-70' : 'text-muted-foreground'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {chatMessages.length === 0 && (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  No messages yet. Send one to start the conversation!
                </div>
              )}
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2 items-end">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="min-h-[40px] max-h-32"
                />
                <PillButton
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || isSending}
                  size="icon"
                >
                  <Send className="h-5 w-5" />
                </PillButton>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-muted-foreground opacity-50 ml-1" />
              </div>
              <p className="text-muted-foreground font-medium">Select a conversation to start messaging</p>
              <p className="text-xs text-muted-foreground">Click on a contact from the inbox list on the left.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

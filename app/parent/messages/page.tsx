'use client'

import { useState } from 'react'
import { Send, Search, Paperclip } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Teacher {
  id: string
  name: string
  subject: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export default function ParentMessagesPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<string>('1')
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'John Smith',
      subject: 'Mathematics',
      avatar: 'JS',
      lastMessage: 'Great progress on recent exams!',
      timestamp: '2 hours ago',
      unread: true,
    },
    {
      id: '2',
      name: 'Emily Davis',
      subject: 'English',
      avatar: 'ED',
      lastMessage: 'Quarterly progress report ready',
      timestamp: 'Yesterday',
      unread: true,
    },
    {
      id: '3',
      name: 'James Wilson',
      subject: 'Science',
      avatar: 'JW',
      lastMessage: 'Excellent lab work!',
      timestamp: '2 days ago',
      unread: false,
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      subject: 'History',
      avatar: 'SJ',
      lastMessage: 'Research paper was outstanding',
      timestamp: '3 days ago',
      unread: false,
    },
  ])

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'John Smith',
      content: 'Hi! I wanted to reach out about Emma\'s performance.',
      timestamp: '2 hours ago',
      isMe: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hello! How is she doing?',
      timestamp: '2 hours ago',
      isMe: true,
    },
    {
      id: '3',
      sender: 'John Smith',
      content: 'Great progress on recent exams! She scored 92% on the mid-term.',
      timestamp: '2 hours ago',
      isMe: false,
    },
    {
      id: '4',
      sender: 'You',
      content: 'That\'s wonderful! We\'re very proud of her hard work.',
      timestamp: '1 hour ago',
      isMe: true,
    },
  ])

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedTeacherData = teachers.find(t => t.id === selectedTeacher)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'You',
        content: messageText,
        timestamp: 'Just now',
        isMe: true,
      }
      setChatMessages([...chatMessages, newMessage])
      setMessageText('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Messages
        </h1>
        <p className="text-muted-foreground">
          Communicate with teachers about Emma's progress
        </p>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Teachers List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Teachers</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            {/* Teachers */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTeacher === teacher.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={selectedTeacher === teacher.id ? 'bg-primary-foreground text-primary' : ''}>
                        {teacher.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm">{teacher.name}</p>
                        {teacher.unread && (
                          <Badge className="bg-destructive h-5 px-1" variant="destructive">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                      <p className={`text-xs truncate mt-1 ${selectedTeacher === teacher.id ? 'opacity-90' : 'text-muted-foreground'}`}>
                        {teacher.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        {selectedTeacherData && (
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedTeacherData.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedTeacherData.name}</CardTitle>
                  <CardDescription>{selectedTeacherData.subject}</CardDescription>
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
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.isMe
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
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <PillButton size="icon-sm" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </PillButton>
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handleSendMessage()
                    }
                  }}
                  className="min-h-10 max-h-20"
                />
                <PillButton
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  size="icon"
                >
                  <Send className="h-5 w-5" />
                </PillButton>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

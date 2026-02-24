'use client'

import { useState } from 'react'
import { Send, Search, Paperclip, Smile } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  sender: string
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
}

export default function TeacherMessagesPage() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [contacts, setContacts] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      avatar: 'SJ',
      relationship: 'Parent of Emma Smith',
      lastMessage: 'Thank you for the update on Emma\'s progress',
      timestamp: '2 hours ago',
      unread: true,
    },
    {
      id: '2',
      sender: 'Michael Brown',
      avatar: 'MB',
      relationship: 'Parent of Liam Brown',
      lastMessage: 'When is the next exam scheduled?',
      timestamp: '5 hours ago',
      unread: true,
    },
    {
      id: '3',
      sender: 'Robert Wilson',
      avatar: 'RW',
      relationship: 'Parent of Noah Wilson',
      lastMessage: 'Great! Looking forward to the progress report',
      timestamp: '1 day ago',
      unread: false,
    },
    {
      id: '4',
      sender: 'Emily Davis',
      avatar: 'ED',
      relationship: 'Parent of Olivia Brown',
      lastMessage: 'Could you clarify the homework assignment?',
      timestamp: '2 days ago',
      unread: false,
    },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hi John, I wanted to check on Emma\'s progress in Mathematics',
      timestamp: '2 hours ago',
      isMe: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hi Sarah! Emma is doing really well. She scored 92% on the last exam.',
      timestamp: '2 hours ago',
      isMe: true,
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'That\'s wonderful! She\'s been studying hard at home too.',
      timestamp: '2 hours ago',
      isMe: false,
    },
    {
      id: '4',
      sender: 'Sarah Johnson',
      content: 'Thank you for the update on Emma\'s progress',
      timestamp: '2 hours ago',
      isMe: false,
    },
  ])

  const filteredContacts = contacts.filter(contact =>
    contact.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedContactData = selectedContact ? contacts.find(c => c.id === selectedContact) : null

  const handleSendMessage = () => {
    if (messageText.trim() && selectedContact) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        content: messageText,
        timestamp: 'Just now',
        isMe: true,
      }
      setChatMessages([...chatMessages, newMessage])
      setMessageText('')

      // Update contact with new message
      setContacts(contacts.map(c =>
        c.id === selectedContact
          ? { ...c, lastMessage: messageText, timestamp: 'Just now', unread: false }
          : c
      ))
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
          Communicate with parents and students
        </p>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search messages..."
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
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact === contact.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={selectedContact === contact.id ? 'bg-primary-foreground text-primary' : ''}>
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm">{contact.sender}</p>
                        {contact.unread && (
                          <Badge className="bg-destructive h-5 px-1" variant="destructive">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs truncate ${selectedContact === contact.id ? 'opacity-90' : 'text-muted-foreground'}`}>
                        {contact.lastMessage}
                      </p>
                      <p className={`text-xs mt-1 ${selectedContact === contact.id ? 'opacity-75' : 'text-muted-foreground'}`}>
                        {contact.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                  <AvatarFallback>{selectedContactData.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedContactData.sender}</CardTitle>
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
                <PillButton size="icon-sm" variant="ghost">
                  <Smile className="h-5 w-5" />
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
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

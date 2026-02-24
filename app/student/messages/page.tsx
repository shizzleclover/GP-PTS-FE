'use client'

import { useState } from 'react'
import { Send, Search, Paperclip, Smile } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Lecturer {
    id: string
    name: string
    course: string
    avatar: string
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

export default function StudentMessagesPage() {
    const [selectedLecturer, setSelectedLecturer] = useState<string>('1')
    const [searchQuery, setSearchQuery] = useState('')
    const [messageText, setMessageText] = useState('')
    const [lecturers, setLecturers] = useState<Lecturer[]>([
        {
            id: '1',
            name: 'Prof. John Smith',
            course: 'CSC 301',
            avatar: 'JS',
            lastMessage: 'Your assignment has been graded.',
            timestamp: '2 hours ago',
            unread: true,
        },
        {
            id: '2',
            name: 'Dr. Emily Davis',
            course: 'CSC 305',
            avatar: 'ED',
            lastMessage: 'See you in the lab tomorrow.',
            timestamp: 'Yesterday',
            unread: false,
        },
        {
            id: '3',
            name: 'Prof. James Wilson',
            course: 'MTH 201',
            avatar: 'JW',
            lastMessage: 'Make sure to review chapter 4.',
            timestamp: '2 days ago',
            unread: false,
        },
        {
            id: '4',
            name: 'Dr. Sarah Johnson',
            course: 'PHY 203',
            avatar: 'SJ',
            lastMessage: 'The group presentation is next week.',
            timestamp: '3 days ago',
            unread: false,
        },
    ])

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: 'Prof. John Smith',
            content: 'Hello Emma, I have reviewed your submission for Assignment 3.',
            timestamp: '2 hours ago',
            isMe: false,
        },
        {
            id: '2',
            sender: 'You',
            content: 'Thank you Professor! Was there any specific feedback on the algorithm efficiency?',
            timestamp: '2 hours ago',
            isMe: true,
        },
        {
            id: '3',
            sender: 'Prof. John Smith',
            content: 'Yes, I added comments directly to your code repository. Overall, good approach but the time complexity could be improved from O(N^2) to O(N log N) using divide and conquer.',
            timestamp: '1 hour ago',
            isMe: false,
        },
        {
            id: '4',
            sender: 'Prof. John Smith',
            content: 'Your assignment has been graded.',
            timestamp: '1 hour ago',
            isMe: false,
        },
    ])

    const filteredLecturers = lecturers.filter(lecturer =>
        lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.course.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const selectedLecturerData = lecturers.find(l => l.id === selectedLecturer)

    const handleSendMessage = () => {
        if (messageText.trim() && selectedLecturer) {
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'You',
                content: messageText,
                timestamp: 'Just now',
                isMe: true,
            }
            setChatMessages([...chatMessages, newMessage])
            setMessageText('')

            setLecturers(lecturers.map(l =>
                l.id === selectedLecturer
                    ? { ...l, lastMessage: messageText, timestamp: 'Just now', unread: false }
                    : l
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
                    Communicate with your lecturers
                </p>
            </div>

            {/* Messages Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Lecturers List */}
                <Card className="lg:col-span-1 overflow-hidden flex flex-col">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Lecturers</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input
                                placeholder="Search lecturers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 text-sm"
                            />
                        </div>

                        {/* Lecturers */}
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {filteredLecturers.map((lecturer) => (
                                <div
                                    key={lecturer.id}
                                    onClick={() => setSelectedLecturer(lecturer.id)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedLecturer === lecturer.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted/50 hover:bg-muted'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <Avatar className="h-8 w-8 flex-shrink-0">
                                            <AvatarFallback className={selectedLecturer === lecturer.id ? 'bg-primary-foreground text-primary' : ''}>
                                                {lecturer.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <p className="font-medium text-sm">{lecturer.name}</p>
                                                {lecturer.unread && (
                                                    <Badge className="bg-destructive h-5 px-1" variant="destructive">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">{lecturer.course}</p>
                                            <p className={`text-xs mt-1 truncate ${selectedLecturer === lecturer.id ? 'opacity-90 text-primary-foreground' : 'text-muted-foreground'}`}>
                                                {lecturer.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Area */}
                {selectedLecturerData ? (
                    <Card className="lg:col-span-2 overflow-hidden flex flex-col">
                        {/* Chat Header */}
                        <CardHeader className="pb-3 border-b">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{selectedLecturerData.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{selectedLecturerData.name}</CardTitle>
                                    <CardDescription>{selectedLecturerData.course}</CardDescription>
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
                                                : 'bg-muted text-foreground'
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

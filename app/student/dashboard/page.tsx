'use client'

import { BookOpen, TrendingUp, Calendar, MessageSquare, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function StudentDashboard() {
    const student = {
        name: 'Emma Smith',
        program: 'Computer Science',
        level: '300 Level',
        semester: '2nd Semester',
        cgpa: '4.2/5.0',
        attendance: '91%',
    }

    const stats = [
        { title: 'CGPA', value: student.cgpa, description: 'Cumulative GPA', icon: <TrendingUp className="h-8 w-8" />, color: 'bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500' },
        { title: 'Courses', value: '6', description: 'Enrolled this semester', icon: <BookOpen className="h-8 w-8" />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
        { title: 'Attendance', value: student.attendance, description: 'This semester', icon: <Calendar className="h-8 w-8" />, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
        { title: 'Messages', value: '1', description: 'Unread from lecturers', icon: <MessageSquare className="h-8 w-8" />, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                    Welcome back, Emma
                </h1>
                <p className="text-muted-foreground">
                    Here's your academic overview for {student.semester}
                </p>
            </div>

            {/* Student Info Card */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl">{student.name}</CardTitle>
                            <CardDescription>{student.program} — {student.level}</CardDescription>
                        </div>
                        <Badge variant="success">Active</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <p className="text-xs text-muted-foreground font-medium">Program</p>
                            <p className="text-sm font-bold text-foreground mt-1">{student.program}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/20">
                            <p className="text-xs text-muted-foreground font-medium">CGPA</p>
                            <p className="text-lg font-bold text-foreground mt-1">{student.cgpa}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                            <p className="text-xs text-muted-foreground font-medium">Attendance</p>
                            <p className="text-lg font-bold text-foreground mt-1">{student.attendance}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                            <p className="text-xs text-muted-foreground font-medium">Semester</p>
                            <p className="text-sm font-bold text-foreground mt-1">{student.semester}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                            <div>
                                <CardDescription>{stat.title}</CardDescription>
                                <CardTitle className="text-3xl mt-2">{stat.value}</CardTitle>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enrolled Courses */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            My Courses
                        </CardTitle>
                        <CardDescription>Enrolled courses this semester</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-muted/50 border border-border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-sm text-foreground">CSC 301 — Data Structures</p>
                                        <p className="text-xs text-muted-foreground">Prof. John Smith • 3 Units</p>
                                    </div>
                                    <Badge>3 Units</Badge>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border border-border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-sm text-foreground">CSC 305 — Operating Systems</p>
                                        <p className="text-xs text-muted-foreground">Dr. Emily Davis • 3 Units</p>
                                    </div>
                                    <Badge>3 Units</Badge>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border border-border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-sm text-foreground">MTH 201 — Linear Algebra</p>
                                        <p className="text-xs text-muted-foreground">Prof. James Wilson • 4 Units</p>
                                    </div>
                                    <Badge>4 Units</Badge>
                                </div>
                            </div>
                        </div>
                        <Link href="/student/courses">
                            <PillButton fullWidth variant="secondary">
                                View All Courses
                            </PillButton>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                            Recent Grades
                        </CardTitle>
                        <CardDescription>Latest assessment results</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">Data Structures — Mid-Semester</p>
                                <p className="text-xs text-muted-foreground">CSC 301</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-emerald-500">85%</p>
                                <p className="text-xs text-muted-foreground">A</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">Operating Systems — Quiz 2</p>
                                <p className="text-xs text-muted-foreground">CSC 305</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-blue-600">78%</p>
                                <p className="text-xs text-muted-foreground">B+</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">Linear Algebra — Assignment 3</p>
                                <p className="text-xs text-muted-foreground">MTH 201</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-emerald-500">92%</p>
                                <p className="text-xs text-muted-foreground">A</p>
                            </div>
                        </div>
                        <Link href="/student/grades">
                            <PillButton fullWidth variant="secondary">
                                View All Grades
                            </PillButton>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                        Upcoming Deadlines
                    </CardTitle>
                    <CardDescription>Important dates and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">CSC 301 — Lab Assignment 4</p>
                                <p className="text-xs text-muted-foreground">Submit via portal</p>
                            </div>
                            <Badge variant="warning">Due Mar 5</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">CSC 305 — Mid-Semester Exam</p>
                                <p className="text-xs text-muted-foreground">Hall B, 9:00 AM</p>
                            </div>
                            <Badge variant="info">Mar 10</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                            <div>
                                <p className="font-medium text-sm text-foreground">MTH 201 — Group Project</p>
                                <p className="text-xs text-muted-foreground">Team presentation</p>
                            </div>
                            <Badge variant="outline">Mar 15</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

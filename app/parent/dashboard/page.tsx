'use client'

import { BookOpen, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function ParentDashboard() {
  const child = {
    name: 'Emma Smith',
    program: 'Computer Science',
    level: '300 Level',
    semester: '2nd Semester',
    gpa: '4.2/5.0',
    attendance: '91%',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Welcome back, Sarah
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of {child.name}'s academic performance and school activities
        </p>
      </div>

      {/* Child Info Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{child.name}</CardTitle>
              <CardDescription>{child.program} — {child.level}</CardDescription>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="text-xs text-muted-foreground font-medium">Program</p>
              <p className="text-sm font-bold text-foreground mt-1">{child.program}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/20">
              <p className="text-xs text-muted-foreground font-medium">CGPA</p>
              <p className="text-lg font-bold text-foreground mt-1">{child.gpa}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
              <p className="text-xs text-muted-foreground font-medium">Attendance</p>
              <p className="text-lg font-bold text-foreground mt-1">{child.attendance}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <p className="text-xs text-muted-foreground font-medium">Semester</p>
              <p className="text-sm font-bold text-foreground mt-1">{child.semester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Latest CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">{child.gpa}</div>
            <p className="text-xs text-muted-foreground mt-1">Strong performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Attendance Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{child.attendance}</div>
            <p className="text-xs text-muted-foreground mt-1">3 absences this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unread Messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground mt-1">From lecturers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">0</div>
            <p className="text-xs text-muted-foreground mt-1">All clear</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recent Grades
            </CardTitle>
            <CardDescription>Latest assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Mathematics Exam</p>
                <p className="text-xs text-muted-foreground">Mid-term exam</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-500">92%</p>
                <p className="text-xs text-muted-foreground">Excellent</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Science Project</p>
                <p className="text-xs text-muted-foreground">Group project</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-500">88%</p>
                <p className="text-xs text-muted-foreground">Very Good</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">English Essay</p>
                <p className="text-xs text-muted-foreground">Written assignment</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-600">85%</p>
                <p className="text-xs text-muted-foreground">Good</p>
              </div>
            </div>
            <Link href="/parent/academics">
              <PillButton fullWidth variant="secondary">
                View Full Academic Record
              </PillButton>
            </Link>
          </CardContent>
        </Card>

        {/* Messages & Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-secondary" />
              Messages
            </CardTitle>
            <CardDescription>Communication with lecturers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm text-foreground">Mr. John Smith</p>
                <Badge variant="info" className="text-xs">Mathematics</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">Great progress on recent exams!</p>
              <p className="text-xs text-accent mt-1">2 hours ago</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm text-foreground">Ms. Emily Davis</p>
                <Badge variant="secondary" className="text-xs">English</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">Quarterly progress report ready</p>
              <p className="text-xs text-accent mt-1">Yesterday</p>
            </div>
            <Link href="/parent/messages">
              <PillButton fullWidth variant="secondary">
                View All Messages
              </PillButton>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Behavior & Discipline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-emerald-500" />
            Behavior & Discipline
          </CardTitle>
          <CardDescription>School conduct records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-500/10">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-emerald-600 dark:text-emerald-100">Excellent Conduct</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-200 mt-1">
                  Emma is demonstrating positive behavior and showing respect to peers and faculty.
                </p>
              </div>
            </div>
          </div>
          <Link href="/parent/discipline">
            <PillButton fullWidth variant="secondary" className="mt-4">
              View Detailed Records
            </PillButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

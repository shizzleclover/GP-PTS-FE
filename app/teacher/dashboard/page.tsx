'use client'

import { Calendar, Users, BookOpen, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function TeacherDashboard() {
  const stats = [
    { title: 'Courses', value: '3', description: 'CSC 301, CSC 305, MTH 201', icon: <BookOpen className="h-8 w-8" />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { title: 'Students', value: '84', description: 'Total across all courses', icon: <Users className="h-8 w-8" />, color: 'bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500' },
    { title: 'Unread Messages', value: '12', description: 'From students and parents', icon: <MessageSquare className="h-8 w-8" />, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
    { title: 'Pending Tasks', value: '5', description: 'Grades to submit', icon: <Calendar className="h-8 w-8" />, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Welcome Back, John
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your classes today
        </p>
      </div>

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              My Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-foreground">CSC 301 — Data Structures</p>
                    <p className="text-xs text-muted-foreground">28 students</p>
                  </div>
                  <Badge>3 Units</Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-foreground">CSC 305 — Operating Systems</p>
                    <p className="text-xs text-muted-foreground">30 students</p>
                  </div>
                  <Badge>3 Units</Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-foreground">MTH 201 — Linear Algebra</p>
                    <p className="text-xs text-muted-foreground">26 students</p>
                  </div>
                  <Badge>4 Units</Badge>
                </div>
              </div>
            </div>
            <Link href="/teacher/classes">
              <PillButton fullWidth variant="secondary">
                Manage Classes
              </PillButton>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-500" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <div className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium text-sm text-foreground">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground truncate">Question about homework assignment</p>
                <p className="text-xs text-accent mt-1">2 hours ago</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium text-sm text-foreground">Michael Brown</p>
                <p className="text-xs text-muted-foreground truncate">Concern about exam preparation</p>
                <p className="text-xs text-accent mt-1">5 hours ago</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors cursor-pointer">
                <p className="font-medium text-sm text-foreground">Robert Wilson</p>
                <p className="text-xs text-muted-foreground truncate">Child's progress update</p>
                <p className="text-xs text-accent mt-1">Yesterday</p>
              </div>
            </div>
            <Link href="/teacher/messages">
              <PillButton fullWidth variant="secondary">
                View All Messages
              </PillButton>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>
            Items requiring your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Submit mid-term grades</p>
                <p className="text-xs text-muted-foreground">Deadline: March 15, 2024</p>
              </div>
              <Badge variant="warning">Urgent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Update attendance records</p>
                <p className="text-xs text-muted-foreground">March 5-10 absences</p>
              </div>
              <Badge variant="info">Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Review discipline reports</p>
                <p className="text-xs text-muted-foreground">3 new reports this week</p>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

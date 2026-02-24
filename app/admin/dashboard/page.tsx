'use client'

import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import Link from 'next/link'

interface StatCard {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: 'blue' | 'emerald' | 'amber' | 'purple'
}

export default function AdminDashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Users',
      value: '247',
      description: 'Parents, lecturers, and staff',
      icon: <Users className="h-8 w-8" />,
      color: 'blue',
    },
    {
      title: 'Active Courses',
      value: '18',
      description: 'Across all departments',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'emerald',
    },
    {
      title: 'Linked Accounts',
      value: '156',
      description: 'Parent-student connections',
      icon: <UserCheck className="h-8 w-8" />,
      color: 'amber',
    },
    {
      title: 'Active Sessions',
      value: '42',
      description: 'Users online right now',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'purple',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      emerald: 'bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500 dark:text-emerald-400',
      amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage users, courses, and parent-student connections
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
              <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
            <CardDescription>
              Create and manage user accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground">
              Add new parents, lecturers, and students to the system. Manage permissions and access levels.
            </p>
            <Link href="/admin/users">
              <PillButton variant="secondary" fullWidth>
                Manage Users
              </PillButton>
            </Link>
          </CardContent>
        </Card>

        {/* Course Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Course Management
            </CardTitle>
            <CardDescription>
              Organize academic programs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground">
              Create and manage courses, assign lecturers, and configure programs and departments.
            </p>
            <Link href="/admin/courses">
              <PillButton variant="secondary" fullWidth>
                Manage Courses
              </PillButton>
            </Link>
          </CardContent>
        </Card>

        {/* Account Linking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-amber-600" />
              Link Accounts
            </CardTitle>
            <CardDescription>
              Connect parents to students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground">
              Establish relationships between parent and student accounts for proper visibility of academic information.
            </p>
            <Link href="/admin/link-accounts">
              <PillButton variant="secondary" fullWidth>
                Link Accounts
              </PillButton>
            </Link>
          </CardContent>
        </Card>

        {/* System Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              System Reports
            </CardTitle>
            <CardDescription>
              View analytics and logs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground">
              Generate reports on system usage, user activity, and communication statistics.
            </p>
            <PillButton variant="secondary" fullWidth disabled>
              View Reports (Coming Soon)
            </PillButton>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system events and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">New user registered</p>
                <p className="text-xs text-muted-foreground">Sarah Johnson (Parent) - 2 hours ago</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500 dark:text-emerald-400 font-medium">Success</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Course created</p>
                <p className="text-xs text-muted-foreground">Mathematics Grade 10 - 4 hours ago</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">Created</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-sm text-foreground">Account linked successfully</p>
                <p className="text-xs text-muted-foreground">Parent John Smith → Student Emma Smith - 1 day ago</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500 dark:text-emerald-400 font-medium">Linked</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

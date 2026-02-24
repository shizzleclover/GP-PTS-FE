'use client'

import { BookOpen, Users, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'

interface Class {
  id: string
  name: string
  grade: string
  section: string
  students: number
  schedule: string
  color: string
}

export default function TeacherClassesPage() {
  const classes: Class[] = [
    {
      id: '1',
      name: 'Mathematics',
      grade: 'Grade 10',
      section: 'Section A',
      students: 28,
      schedule: 'MWF 9:00 AM',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      id: '2',
      name: 'Science',
      grade: 'Grade 10',
      section: 'Section B',
      students: 30,
      schedule: 'TTh 10:30 AM',
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: '3',
      name: 'English',
      grade: 'Grade 9',
      section: 'Section C',
      students: 26,
      schedule: 'MWF 1:00 PM',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          My Classes
        </h1>
        <p className="text-muted-foreground">
          View and manage your courses
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-full ${cls.color} mb-3`}>
                  <BookOpen className="h-6 w-6" />
                </div>
                <Badge>{cls.grade}</Badge>
              </div>
              <CardTitle>{cls.name}</CardTitle>
              <CardDescription>{cls.section}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Class Info */}
              <div className="space-y-2 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{cls.students} Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{cls.schedule}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-xs text-muted-foreground">Avg Grade</p>
                  <p className="text-lg font-bold text-foreground">82%</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-lg font-bold text-foreground">94%</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <PillButton variant="outline" size="sm" fullWidth>
                  Grades
                </PillButton>
                <PillButton variant="secondary" size="sm" fullWidth>
                  Attendance
                </PillButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Class Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>
            Manage your classes and student information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-3xl font-bold text-primary mb-1">84</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="p-4 rounded-lg border border-border text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-3xl font-bold text-secondary mb-1">12</p>
              <p className="text-sm text-muted-foreground">Pending Grades</p>
            </div>
            <div className="p-4 rounded-lg border border-border text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-3xl font-bold text-emerald-600 mb-1">3</p>
              <p className="text-sm text-muted-foreground">Classes Teaching</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

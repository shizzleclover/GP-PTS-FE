'use client'

import { CheckCircle, AlertCircle, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ParentDisciplinePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Behavior & Conduct
        </h1>
        <p className="text-muted-foreground">
          School behavior records and discipline status
        </p>
      </div>

      {/* Overall Status */}
      <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-full bg-emerald-600">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle>Excellent Conduct</CardTitle>
              <CardDescription>Emma is demonstrating positive behavior</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            Emma has maintained excellent conduct throughout the term. She is showing respect, responsibility, and positive engagement with peers and faculty members.
          </p>
        </CardContent>
      </Card>

      {/* Conduct Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Discipline Records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600">0</div>
            <p className="text-xs text-muted-foreground mt-2">No incidents recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600">0</div>
            <p className="text-xs text-muted-foreground mt-2">No warnings issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Attendance Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">94%</div>
            <p className="text-xs text-muted-foreground mt-2">4 absences this term</p>
          </CardContent>
        </Card>
      </div>

      {/* Positive Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Positive Conduct Notes</CardTitle>
          <CardDescription>Recognition from teachers and staff</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground">Excellent Team Player</p>
              <p className="text-sm text-muted-foreground mt-1">
                Emma worked exceptionally well with her group during the science project, showing cooperation and leadership.
              </p>
              <p className="text-xs text-muted-foreground mt-1">By James Wilson • Science • Feb 18</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground">Respectful Classroom Behavior</p>
              <p className="text-sm text-muted-foreground mt-1">
                Emma consistently demonstrates respect for peers and teachers, following classroom rules and contributing positively to discussions.
              </p>
              <p className="text-xs text-muted-foreground mt-1">By Emily Davis • English • Feb 15</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground">Outstanding Participation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Emma is an active participant in class activities and shows enthusiasm for learning. Her contributions enhance classroom discussions.
              </p>
              <p className="text-xs text-muted-foreground mt-1">By Sarah Johnson • History • Feb 10</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Attendance Record
          </CardTitle>
          <CardDescription>This academic term</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border text-center">
              <p className="text-xs text-muted-foreground font-medium">Days Present</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">94</p>
            </div>
            <div className="p-4 rounded-lg border border-border text-center">
              <p className="text-xs text-muted-foreground font-medium">Days Absent</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">4</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <p className="font-medium text-sm text-foreground mb-3">Absences This Term</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">February 5, 2024</span>
                <Badge variant="warning">Excused</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">January 28, 2024</span>
                <Badge variant="warning">Excused</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">January 15, 2024</span>
                <Badge variant="warning">Excused</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">January 8, 2024</span>
                <Badge variant="warning">Excused</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-foreground">
              Emma is an exemplary student demonstrating excellent behavior, strong academic engagement, and positive conduct both in and out of the classroom. 
              The school community is pleased with her progress and looks forward to her continued success.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

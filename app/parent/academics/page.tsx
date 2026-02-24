'use client'

import { BookOpen, TrendingUp, Calendar, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface GradeRecord {
  code: string
  title: string
  units: number
  score: number
  grade: string
}

interface SemesterRecord {
  id: string
  name: string
  session: string
  gpa: string
  totalUnits: number
  courses: GradeRecord[]
}

export default function ParentAcademicsPage() {
  const child = {
    name: 'Emma Smith',
    cgpa: '4.28'
  }

  const gradeHistory: SemesterRecord[] = [
    {
      id: 'sem_300_1',
      name: 'First Semester',
      session: '2023/2024 Academic Session (300 Level)',
      gpa: '4.50',
      totalUnits: 18,
      courses: [
        { code: 'CSC 301', title: 'Data Structures', units: 3, score: 85, grade: 'A' },
        { code: 'CSC 303', title: 'Database Systems', units: 3, score: 92, grade: 'A' },
        { code: 'CSC 305', title: 'Operating Systems', units: 3, score: 78, grade: 'B' },
        { code: 'MTH 301', title: 'Advanced Calculus', units: 4, score: 65, grade: 'C' },
      ]
    },
    {
      id: 'sem_200_2',
      name: 'Second Semester',
      session: '2022/2023 Academic Session (200 Level)',
      gpa: '4.25',
      totalUnits: 20,
      courses: [
        { code: 'CSC 202', title: 'Object Oriented Programming', units: 3, score: 90, grade: 'A' },
        { code: 'MTH 202', title: 'Differential Equations', units: 4, score: 82, grade: 'A' },
        { code: 'STA 202', title: 'Statistics for Physical Sciences', units: 3, score: 70, grade: 'B' },
      ]
    },
    {
      id: 'sem_200_1',
      name: 'First Semester',
      session: '2022/2023 Academic Session (200 Level)',
      gpa: '4.10',
      totalUnits: 19,
      courses: [
        { code: 'CSC 201', title: 'Computer Programming I', units: 3, score: 84, grade: 'A' },
        { code: 'MTH 201', title: 'Linear Algebra', units: 4, score: 71, grade: 'B' },
        { code: 'PHY 201', title: 'General Physics III', units: 3, score: 62, grade: 'C' },
      ]
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
    if (score >= 75) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    if (score >= 60) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    return 'bg-destructive/10 text-destructive'
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
      case 'B': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'C': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
      case 'D': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
      case 'F': return 'bg-destructive/10 text-destructive'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Academic Performance
        </h1>
        <p className="text-muted-foreground">
          {child.name}'s grades and academic history
        </p>
      </div>

      {/* CGPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Current CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600">{child.cgpa}</div>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Latest Semester GPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{gradeHistory[0].gpa}</div>
            <p className="text-xs text-muted-foreground mt-3">Current 300 Level</p>
            <Badge variant="success" className="mt-2">Outstanding</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="text-3xl font-bold text-emerald-600">+0.25</p>
                <p className="text-xs text-muted-foreground">vs. last semester</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester History */}
      <h2 className="text-2xl font-heading font-bold text-foreground pt-4">Grade History</h2>
      <div className="space-y-6">
        {gradeHistory.map((semester) => (
          <Card key={semester.id}>
            <CardHeader className="border-b border-border bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{semester.name}</CardTitle>
                  <CardDescription className="mt-1">{semester.session}</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Semester GPA</p>
                    <p className="text-lg font-bold text-primary">{semester.gpa}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Units Cleared</p>
                    <p className="text-lg font-bold text-foreground">{semester.totalUnits}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Course</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="text-center">Units</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center w-[100px]">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semester.courses.map((course) => (
                      <TableRow key={course.code}>
                        <TableCell className="font-medium whitespace-nowrap">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell className="text-center">{course.units}</TableCell>
                        <TableCell className="text-center">
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(course.score)}`}>
                            {course.score}%
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`mx-auto w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

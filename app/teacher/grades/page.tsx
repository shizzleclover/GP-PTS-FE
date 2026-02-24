'use client'

import { useState } from 'react'
import { BarChart3, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Student {
  id: string
  name: string
  rollNo: string
  mathematics: number | null
  science: number | null
  english: number | null
}

export default function TeacherGradesPage() {
  const [selectedClass, setSelectedClass] = useState('math')
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Emma Smith', rollNo: '001', mathematics: 92, science: null, english: null },
    { id: '2', name: 'Liam Johnson', rollNo: '002', mathematics: 85, science: null, english: null },
    { id: '3', name: 'Olivia Brown', rollNo: '003', mathematics: null, science: null, english: null },
    { id: '4', name: 'Noah Wilson', rollNo: '004', mathematics: 88, science: null, english: null },
    { id: '5', name: 'Ava Davis', rollNo: '005', mathematics: 95, science: null, english: null },
  ])

  const handleGradeChange = (id: string, grade: number) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, mathematics: grade } : s
    ))
  }

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'bg-muted text-muted-foreground'
    if (grade >= 90) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
    if (grade >= 80) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    if (grade >= 70) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    return 'bg-destructive/10 text-destructive'
  }

  const submittedCount = students.filter(s => s.mathematics !== null).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Grade Management
          </h1>
          <p className="text-muted-foreground">
            Enter and manage student grades
          </p>
        </div>
        <PillButton>
          <Download className="h-5 w-5 mr-2" />
          Export Grades
        </PillButton>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">CSC 301 — Data Structures</SelectItem>
                  <SelectItem value="science">CSC 305 — Operating Systems</SelectItem>
                  <SelectItem value="english">MTH 201 — Linear Algebra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Assessment</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">Mid-term Exam</SelectItem>
                  <SelectItem value="quiz">Quiz 1</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Grades Submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{submittedCount}/{students.length}</div>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(submittedCount / students.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Class Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {students.filter(s => s.mathematics !== null).length > 0
                ? (students.filter(s => s.mathematics !== null).reduce((acc, s) => acc + (s.mathematics || 0), 0) / submittedCount).toFixed(1)
                : '-'}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">Based on submitted grades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Highest Grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.max(...students.filter(s => s.mathematics !== null).map(s => s.mathematics || 0), 0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">In this class</p>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
          <CardDescription>
            Enter and manage grades for CSC 301 — Data Structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={student.mathematics || ''}
                        onChange={(e) => handleGradeChange(student.id, parseInt(e.target.value) || 0)}
                        placeholder="Enter grade"
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      {student.mathematics !== null ? (
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.mathematics)}`}>
                            {student.mathematics}%
                          </div>
                          <Badge variant="success">Submitted</Badge>
                        </div>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex gap-2">
            <PillButton>Save Grades</PillButton>
            <PillButton variant="outline">Cancel</PillButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

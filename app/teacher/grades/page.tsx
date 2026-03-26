'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiFetch } from '@/lib/api'

interface GradeStudent {
  id: string
  name: string
  rollNo: string
  score: number | null
  gradeId?: string
}

export default function TeacherGradesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedAssessment, setSelectedAssessment] = useState('Mid-term Exam')
  const [students, setStudents] = useState<GradeStudent[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await apiFetch('/courses')
        if (!res.isMock && res.data?.data) {
          setCourses(res.data.data)
          if (res.data.data.length > 0) {
            setSelectedClass(res.data.data[0]._id)
          }
        } else {
          setCourses([
            { _id: 'math', courseName: 'CSC 301 — Data Structures' },
            { _id: 'science', courseName: 'CSC 305 — Operating Systems' },
            { _id: 'english', courseName: 'MTH 201 — Linear Algebra' },
          ])
          setSelectedClass('math')
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadCourses()
  }, [])

  // Load students + grades
  useEffect(() => {
    if (!selectedClass) return;

    const loadData = async () => {
      try {
        // Mock fallback check
        const isMathMock = selectedClass === 'math' || selectedClass === 'science' || selectedClass === 'english'

        if (isMathMock) {
          setStudents([
            { id: '1', name: 'Emma Smith', rollNo: '001', score: 92 },
            { id: '2', name: 'Liam Johnson', rollNo: '002', score: 85 },
            { id: '3', name: 'Olivia Brown', rollNo: '003', score: null },
            { id: '4', name: 'Noah Wilson', rollNo: '004', score: 88 },
            { id: '5', name: 'Ava Davis', rollNo: '005', score: 95 },
          ])
          return
        }

        const [studentsRes, gradesRes] = await Promise.all([
          apiFetch(`/students?courseIds=${selectedClass}`),
          apiFetch(`/grades?courseId=${selectedClass}&assignmentName=${encodeURIComponent(selectedAssessment)}`)
        ])

        if (!studentsRes.isMock) {
          const fetchedStudents = studentsRes.data.data;
          const fetchedGrades = gradesRes.data?.data || [];

          setStudents(fetchedStudents.map((s: any) => {
            const gradeRecord = fetchedGrades.find((g: any) => g.studentId === s._id)
            return {
              id: s._id,
              name: `${s.firstName} ${s.lastName}`,
              rollNo: s.studentId,
              score: gradeRecord ? gradeRecord.score : null,
              gradeId: gradeRecord ? gradeRecord._id : undefined
            }
          }))
        }
      } catch (err) {
        console.error(err)
      }
    }
    loadData()
  }, [selectedClass, selectedAssessment])

  const handleGradeChange = (id: string, gradeStr: string) => {
    const grade = gradeStr === '' ? null : parseInt(gradeStr);
    setStudents(students.map(s =>
      s.id === id ? { ...s, score: grade } : s
    ))
  }

  const saveGrades = async () => {
    if (courses.length > 0 && (courses[0]._id === 'math' || courses[0]._id === 'science' || courses[0]._id === 'english')) {
      alert('Cannot save grades in dummy mode. Switch to Live API.');
      return;
    }
    setIsSaving(true)
    try {
      const promises = students.filter(s => s.score !== null).map(s => {
        if (s.gradeId) {
          return apiFetch(`/grades/${s.gradeId}`, {
            method: 'PUT',
            body: JSON.stringify({ score: s.score })
          })
        } else {
          return apiFetch('/grades', {
            method: 'POST',
            body: JSON.stringify({
              studentId: s.id,
              courseId: selectedClass,
              assignmentName: selectedAssessment,
              score: s.score,
              totalPoints: 100
            })
          })
        }
      })
      await Promise.all(promises)
      alert('Grades saved successfully!')

      // Update UI to have gradeIds (reload lazy way)
      window.location.reload()
    } catch (e) {
      alert('Error saving grades')
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'bg-muted text-muted-foreground'
    if (grade >= 90) return 'bg-emerald-100 dark:bg-emerald-500/30 text-emerald-500 dark:text-emerald-400'
    if (grade >= 80) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    if (grade >= 70) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    return 'bg-destructive/10 text-destructive'
  }

  const submittedCount = students.filter(s => s.score !== null).length

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
                  <SelectValue placeholder="Select class..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c._id} value={c._id}>{c.courseName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Assessment</label>
              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mid-term Exam">Mid-term Exam</SelectItem>
                  <SelectItem value="Quiz 1">Quiz 1</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
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
            <div className="text-3xl font-bold">{submittedCount}/{students.length || 0}</div>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${students.length ? (submittedCount / students.length) * 100 : 0}%` }}
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
              {submittedCount > 0
                ? (students.filter(s => s.score !== null).reduce((acc, s) => acc + (s.score || 0), 0) / submittedCount).toFixed(1)
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
              {submittedCount > 0 ? Math.max(...students.filter(s => s.score !== null).map(s => s.score || 0), 0) : '-'}%
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
            Enter and manage grades for {courses.find(c => c._id === selectedClass)?.courseName || selectedClass}
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
                        value={student.score !== null ? student.score : ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        placeholder="Enter grade"
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      {student.score !== null ? (
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.score)}`}>
                            {student.score}%
                          </div>
                          {student.gradeId ? <Badge variant="success">Saved</Badge> : <Badge variant="warning">Unsaved</Badge>}
                        </div>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-6">No students found in this course.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex gap-2">
            <PillButton onClick={saveGrades} disabled={isSaving || submittedCount === 0}>
              {isSaving ? 'Saving...' : 'Save Grades'}
            </PillButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

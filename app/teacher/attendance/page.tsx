'use client'

import { useState, useEffect } from 'react'
import { Calendar, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { apiFetch } from '@/lib/api'

interface AttendanceRecord {
  id: string
  rollNo: string
  name: string
  present: boolean | null
  attendanceId?: string
}

export default function TeacherAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [courses, setCourses] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState('')
  const [records, setRecords] = useState<AttendanceRecord[]>([])
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

  // Load students + attendance
  useEffect(() => {
    if (!selectedClass) return;

    const loadData = async () => {
      try {
        const isMathMock = selectedClass === 'math' || selectedClass === 'science' || selectedClass === 'english'

        if (isMathMock) {
          setRecords([
            { id: '1', rollNo: '001', name: 'Emma Smith', present: true },
            { id: '2', rollNo: '002', name: 'Liam Johnson', present: true },
            { id: '3', rollNo: '003', name: 'Olivia Brown', present: false },
            { id: '4', rollNo: '004', name: 'Noah Wilson', present: true },
            { id: '5', rollNo: '005', name: 'Ava Davis', present: null },
          ])
          return
        }

        const [studentsRes, attRes] = await Promise.all([
          apiFetch(`/students?courseIds=${selectedClass}`),
          apiFetch(`/attendance`)
        ])

        if (!studentsRes.isMock) {
          const fetchedStudents = studentsRes.data.data;
          const allAtt = attRes.data?.data || [];

          const fetchedAtt = allAtt.filter((a: any) => a.date && new Date(a.date).toISOString().split('T')[0] === selectedDate)

          setRecords(fetchedStudents.map((s: any) => {
            const aRecord = fetchedAtt.find((a: any) => a.studentId === s._id)
            return {
              id: s._id,
              name: `${s.firstName} ${s.lastName}`,
              rollNo: s.studentId,
              present: aRecord ? (aRecord.status === 'present' ? true : false) : null,
              attendanceId: aRecord ? aRecord._id : undefined
            }
          }))
        }
      } catch (err) {
        console.error(err)
      }
    }
    loadData()
  }, [selectedClass, selectedDate])

  const handleAttendanceChange = (id: string, present: boolean) => {
    setRecords(records.map(r =>
      r.id === id ? { ...r, present } : r
    ))
  }

  const saveAttendance = async () => {
    if (courses.length > 0 && (courses[0]._id === 'math' || courses[0]._id === 'science' || courses[0]._id === 'english')) {
      alert('Cannot save in dummy mode. Switch to Live API.');
      return;
    }
    setIsSaving(true)
    try {
      const promises = records.filter(r => r.present !== null).map(r => {
        const status = r.present ? 'present' : 'absent'
        if (r.attendanceId) {
          return apiFetch(`/attendance/${r.attendanceId}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
          })
        } else {
          return apiFetch('/attendance', {
            method: 'POST',
            body: JSON.stringify({
              studentId: r.id,
              date: selectedDate,
              status
            })
          })
        }
      })
      await Promise.all(promises)
      alert('Attendance saved successfully!')
      window.location.reload()
    } catch (e) {
      alert('Error saving attendance')
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const presentCount = records.filter(r => r.present === true).length
  const absentCount = records.filter(r => r.present === false).length
  const pendingCount = records.filter(r => r.present === null).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Attendance Management
        </h1>
        <p className="text-muted-foreground">
          Mark and track student attendance
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{records.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Present</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">{presentCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {records.length > 0 ? ((presentCount / records.length) * 100).toFixed(0) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Absent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{absentCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {records.length > 0 ? ((absentCount / records.length) * 100).toFixed(0) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {records.length > 0 ? ((pendingCount / records.length) * 100).toFixed(0) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            Record attendance for {selectedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                  <TableHead className="text-center">Absent</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.rollNo}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={record.present === true}
                        onCheckedChange={() => handleAttendanceChange(record.id, true)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={record.present === false}
                        onCheckedChange={() => handleAttendanceChange(record.id, false)}
                      />
                    </TableCell>
                    <TableCell>
                      {record.present === true ? (
                        <Badge variant="success" className="flex items-center gap-1 w-fit">
                          <Check className="h-3 w-3" />
                          Present
                        </Badge>
                      ) : record.present === false ? (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <X className="h-3 w-3" />
                          Absent
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Marked</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {records.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">No students found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex gap-2">
            <PillButton onClick={saveAttendance} disabled={isSaving || (presentCount + absentCount === 0)}>
              {isSaving ? 'Saving...' : 'Save Attendance'}
            </PillButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Calendar, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

interface AttendanceRecord {
  id: string
  rollNo: string
  name: string
  present: boolean | null
}

export default function TeacherAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('math')
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { id: '1', rollNo: '001', name: 'Emma Smith', present: true },
    { id: '2', rollNo: '002', name: 'Liam Johnson', present: true },
    { id: '3', rollNo: '003', name: 'Olivia Brown', present: false },
    { id: '4', rollNo: '004', name: 'Noah Wilson', present: true },
    { id: '5', rollNo: '005', name: 'Ava Davis', present: null },
  ])

  const handleAttendanceChange = (id: string, present: boolean) => {
    setRecords(records.map(r =>
      r.id === id ? { ...r, present } : r
    ))
  }

  const presentCount = records.filter(r => r.present === true).length
  const absentCount = records.filter(r => r.present === false).length
  const pendingCount = records.filter(r => r.present === null).length

  const getAttendancePercentage = () => {
    const marked = records.filter(r => r.present !== null)
    if (marked.length === 0) return 0
    return ((presentCount / marked.length) * 100).toFixed(1)
  }

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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">CSC 301 — Data Structures</SelectItem>
                  <SelectItem value="science">CSC 305 — Operating Systems</SelectItem>
                  <SelectItem value="english">MTH 201 — Linear Algebra</SelectItem>
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
            <div className="text-3xl font-bold text-emerald-600">{presentCount}</div>
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
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex gap-2">
            <PillButton>Save Attendance</PillButton>
            <PillButton variant="outline">Cancel</PillButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

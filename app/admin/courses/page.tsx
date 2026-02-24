'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Course {
  id: string
  name: string
  code: string
  grade: string
  teacher: string
  students: number
  section: string
}

const mockCourses: Course[] = [
  { id: '1', name: 'Mathematics', code: 'MATH101', grade: '10', teacher: 'John Smith', students: 28, section: 'A' },
  { id: '2', name: 'English Literature', code: 'ENG102', grade: '10', teacher: 'Emily Davis', students: 25, section: 'B' },
  { id: '3', name: 'Science', code: 'SCI103', grade: '10', teacher: 'James Wilson', students: 30, section: 'A' },
  { id: '4', name: 'History', code: 'HIST104', grade: '9', teacher: 'Sarah Johnson', students: 27, section: 'C' },
  { id: '5', name: 'Biology', code: 'BIO105', grade: '11', teacher: 'Michael Brown', students: 26, section: 'B' },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<string>('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    grade: '10',
    teacher: '',
    section: 'A',
  })

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade
    return matchesSearch && matchesGrade
  })

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.code && newCourse.teacher) {
      const course: Course = {
        id: Math.random().toString(),
        ...newCourse,
        students: 0,
      }
      setCourses([...courses, course])
      setNewCourse({ name: '', code: '', grade: '10', teacher: '', section: 'A' })
      setIsCreateOpen(false)
    }
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      '9': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      '10': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      '11': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      '12': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    }
    return colors[grade] || colors['10']
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Course Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage academic courses
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <PillButton size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Course
            </PillButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add a new course to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cname">Course Name</Label>
                <Input
                  id="cname"
                  placeholder="Mathematics"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  placeholder="MATH101"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select value={newCourse.grade} onValueChange={(value) => setNewCourse({ ...newCourse, grade: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select value={newCourse.section} onValueChange={(value) => setNewCourse({ ...newCourse, section: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="teacher">Teacher</Label>
                <Input
                  id="teacher"
                  placeholder="Teacher Name"
                  value={newCourse.teacher}
                  onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <PillButton variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </PillButton>
              <PillButton onClick={handleAddCourse}>
                Create Course
              </PillButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by course name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            Total: {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm">{course.code}</code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(course.grade)}>
                        Grade {course.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>Section {course.section}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {course.students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PillButton size="icon-sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </PillButton>
                        <PillButton
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </PillButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

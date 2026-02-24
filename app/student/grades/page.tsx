'use client'

import { TrendingUp, Award, BookOpen } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface GradeRecord {
    code: string
    title: string
    units: number
    score: number
    grade: string
    points: number
}

interface SemesterRecord {
    id: string
    name: string
    session: string
    gpa: string
    totalUnits: number
    courses: GradeRecord[]
}

const gradeHistory: SemesterRecord[] = [
    {
        id: 'sem_300_1',
        name: 'First Semester',
        session: '2023/2024 Academic Session (300 Level)',
        gpa: '4.50',
        totalUnits: 18,
        courses: [
            { code: 'CSC 301', title: 'Data Structures', units: 3, score: 85, grade: 'A', points: 5 },
            { code: 'CSC 303', title: 'Database Systems', units: 3, score: 92, grade: 'A', points: 5 },
            { code: 'CSC 305', title: 'Operating Systems', units: 3, score: 78, grade: 'B', points: 4 },
            { code: 'MTH 301', title: 'Advanced Calculus', units: 4, score: 65, grade: 'C', points: 3 },
            { code: 'ENT 301', title: 'Entrepreneurship', units: 2, score: 88, grade: 'A', points: 5 },
            { code: 'GST 301', title: 'Logic & Philosophy', units: 3, score: 81, grade: 'A', points: 5 },
        ]
    },
    {
        id: 'sem_200_2',
        name: 'Second Semester',
        session: '2022/2023 Academic Session (200 Level)',
        gpa: '4.25',
        totalUnits: 20,
        courses: [
            { code: 'CSC 202', title: 'Object Oriented Programming', units: 3, score: 90, grade: 'A', points: 5 },
            { code: 'CSC 204', title: 'Computer Architecture', units: 3, score: 75, grade: 'B', points: 4 },
            { code: 'MTH 202', title: 'Differential Equations', units: 4, score: 82, grade: 'A', points: 5 },
            { code: 'PHY 204', title: 'Electromagnetism', units: 3, score: 68, grade: 'C', points: 3 },
            { code: 'STA 202', title: 'Statistics for Physical Sciences', units: 3, score: 70, grade: 'B', points: 4 },
            { code: 'GST 202', title: 'Peace & Conflict Studies', units: 2, score: 86, grade: 'A', points: 5 },
            { code: 'ENT 202', title: 'Venture Creation', units: 2, score: 77, grade: 'B', points: 4 },
        ]
    },
    {
        id: 'sem_200_1',
        name: 'First Semester',
        session: '2022/2023 Academic Session (200 Level)',
        gpa: '4.10',
        totalUnits: 19,
        courses: [
            { code: 'CSC 201', title: 'Computer Programming I', units: 3, score: 84, grade: 'A', points: 5 },
            { code: 'MTH 201', title: 'Linear Algebra', units: 4, score: 71, grade: 'B', points: 4 },
            { code: 'PHY 201', title: 'General Physics III', units: 3, score: 62, grade: 'C', points: 3 },
            { code: 'CSC 205', title: 'Systems Programming', units: 3, score: 88, grade: 'A', points: 5 },
            { code: 'CSC 207', title: 'Web Development', units: 2, score: 94, grade: 'A', points: 5 },
            { code: 'GST 201', title: 'Communication Skills', units: 2, score: 78, grade: 'B', points: 4 },
            { code: 'STA 201', title: 'Introduction to Statistics', units: 2, score: 80, grade: 'A', points: 5 },
        ]
    }
]

export default function StudentGradesPage() {
    const cgpa = '4.28' // Mock CGPA calculated across all semesters

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
                    Academic Results
                </h1>
                <p className="text-muted-foreground">
                    View your grade history and cumulative performance
                </p>
            </div>

            {/* CGPA Overview */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900">
                                <Award className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Current CGPA</p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{cgpa}</h2>
                                    <span className="text-xl text-emerald-600/60 dark:text-emerald-400/60">/ 5.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Semesters</p>
                                <p className="text-2xl font-bold">{gradeHistory.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Units Cleared</p>
                                <p className="text-2xl font-bold">57</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Semester History */}
            <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-foreground pt-4">Grade History</h2>

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
                                        <p className="text-xs text-muted-foreground">Units Recorded</p>
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
                                            <TableHead className="w-[100px]">Course Code</TableHead>
                                            <TableHead>Course Title</TableHead>
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
                                                <TableCell className="text-center font-medium">{course.score}%</TableCell>
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

'use client'

import { Calendar, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function StudentAttendancePage() {
    const attendanceData = [
        { code: 'CSC 301', title: 'Data Structures', totalClasses: 24, attended: 22, percentage: 91 },
        { code: 'CSC 305', title: 'Operating Systems', totalClasses: 20, attended: 19, percentage: 95 },
        { code: 'MTH 201', title: 'Linear Algebra', totalClasses: 28, attended: 20, percentage: 71 },
        { code: 'PHY 203', title: 'General Physics III', totalClasses: 18, attended: 17, percentage: 94 },
        { code: 'GST 201', title: 'Communication Skills', totalClasses: 12, attended: 12, percentage: 100 },
    ]

    const overallAttendance = Math.round(
        attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length
    )

    const getAttendanceColor = (percentage: number) => {
        if (percentage >= 90) return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'
        if (percentage >= 75) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
        if (percentage >= 60) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30'
        return 'text-destructive bg-destructive/10'
    }

    const getAttendanceBarColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-emerald-600'
        if (percentage >= 75) return 'bg-blue-600'
        if (percentage >= 60) return 'bg-amber-600'
        return 'bg-destructive'
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                    Course Attendance
                </h1>
                <p className="text-muted-foreground">
                    Track your attendance for the current semester
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Overall Attendance</CardTitle>
                        <CardDescription>2nd Semester</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    className="text-muted stroke-current"
                                    strokeWidth="8"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                />
                                <circle
                                    className={`${getAttendanceBarColor(overallAttendance).replace('bg-', 'text-')} stroke-current`}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray={`${overallAttendance * 2.51} 251.2`}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold">{overallAttendance}%</span>
                                <span className="text-xs text-muted-foreground mt-1">Present</span>
                            </div>
                        </div>
                        {overallAttendance >= 75 ? (
                            <Badge variant="success" className="mt-6 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Minimum met
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="mt-6 flex items-center gap-1">
                                <XCircle className="w-3 h-3" /> Below minimum
                            </Badge>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Attendance by Course</CardTitle>
                        <CardDescription>75% minimum attendance required for exams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {attendanceData.map((course) => (
                                <div key={course.code}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">{course.code}</span>
                                            <span className="text-sm text-muted-foreground hidden sm:inline">— {course.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted-foreground">{course.attended} / {course.totalClasses} classes</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getAttendanceColor(course.percentage)}`}>
                                                {course.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${getAttendanceBarColor(course.percentage)}`}
                                            style={{ width: `${course.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

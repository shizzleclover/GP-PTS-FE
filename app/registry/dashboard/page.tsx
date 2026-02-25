'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GraduationCap, Users, UserPlus, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function RegistryDashboardPage() {
    const stats = [
        {
            title: 'Total Students',
            value: '2,845',
            description: '+124 this semester',
            icon: <GraduationCap className="h-4 w-4 text-emerald-500" />,
            href: '/registry/students',
        },
        {
            title: 'Total Lecturers',
            value: '142',
            description: '+8 this semester',
            icon: <Users className="h-4 w-4 text-primary" />,
            href: '/registry/lecturers',
        },
        {
            title: 'Registered Parents',
            value: '1,932',
            description: '+85 this semester',
            icon: <UserPlus className="h-4 w-4 text-blue-500" />,
            href: '/registry/parents',
        },
        {
            title: 'Total Enrollments',
            value: '12,450',
            description: '+4.5% from last year',
            icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
            href: '#',
        },
    ]

    const recentRegistrations = [
        { id: 'STU001', name: 'John Doe', role: 'Student', date: 'Today, 09:41 AM' },
        { id: 'LEC042', name: 'Dr. Sarah Smith', role: 'Lecturer', date: 'Yesterday, 02:15 PM' },
        { id: 'PAR892', name: 'Michael Johnson', role: 'Parent', date: 'Oct 24, 11:30 AM' },
        { id: 'STU002', name: 'Emily Brown', role: 'Student', date: 'Oct 23, 04:20 PM' },
        { id: 'STU003', name: 'David Wilson', role: 'Student', date: 'Oct 22, 10:05 AM' },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Registry Overview</h1>
                <p className="text-muted-foreground mt-1">Manage university user registrations and records.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link href={stat.href} key={i} className="block group">
                        <Card className="hover:border-primary/50 transition-colors h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    {stat.title}
                                </CardTitle>
                                <div className="p-2 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                                    {stat.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Registrations Table */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <CardDescription>The latest accounts added to the system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentRegistrations.map((reg, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {reg.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{reg.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-muted-foreground">{reg.id}</span>
                                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                    {reg.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-foreground">Registered</p>
                                        <p className="text-xs text-muted-foreground mt-1">{reg.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Frequently used registry tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/registry/students" className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-md text-emerald-500 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="font-medium">Register Student</span>
                            </div>
                        </Link>

                        <Link href="/registry/lecturers" className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:scale-110 transition-transform">
                                    <Users className="h-5 w-5" />
                                </div>
                                <span className="font-medium">Register Lecturer</span>
                            </div>
                        </Link>

                        <Link href="/registry/parents" className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-md text-blue-500 group-hover:scale-110 transition-transform">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <span className="font-medium">Register Parent</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

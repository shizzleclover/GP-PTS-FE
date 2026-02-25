'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Search, Plus, UserCheck, MoreVertical, Edit2, Trash2 } from 'lucide-react'

export default function RegistryStudentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    // Mock Students
    const students = [
        { id: 'STU2024001', name: 'Alaxendra Smith', program: 'Computer Science', level: '100 Level', status: 'Active', enrolled: 'Sept 2024' },
        { id: 'STU2024002', name: 'Benjamin Tyler', program: 'Software Engineering', level: '200 Level', status: 'Active', enrolled: 'Sept 2023' },
        { id: 'STU2024003', name: 'Chloe Davis', program: 'Information Systems', level: '300 Level', status: 'Suspended', enrolled: 'Sept 2022' },
        { id: 'STU2024004', name: 'Daniel Miller', program: 'Computer Science', level: '400 Level', status: 'Active', enrolled: 'Sept 2021' },
        { id: 'STU2024005', name: 'Emma Wilson', program: 'Cybersecurity', level: '100 Level', status: 'Active', enrolled: 'Sept 2024' },
    ]

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.program.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Student Registry</h1>
                    <p className="text-muted-foreground mt-1">Manage and register student accounts.</p>
                </div>
                {!isRegistering && (
                    <PillButton onClick={() => setIsRegistering(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Register Student
                    </PillButton>
                )}
            </div>

            {isRegistering ? (
                <Card className="border-emerald-500/20 shadow-md">
                    <CardHeader className="border-b bg-emerald-500/5 pb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Register New Student</CardTitle>
                                <CardDescription className="mt-1">Add a new student profile to the university registry.</CardDescription>
                            </div>
                            <PillButton variant="ghost" onClick={() => setIsRegistering(false)}>Cancel</PillButton>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsRegistering(false) }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="e.g. John" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="e.g. Doe" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input type="email" placeholder="john.doe@university.edu" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date of Birth</label>
                                    <Input type="date" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Program / Major</label>
                                    <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Computer Science</option>
                                        <option>Software Engineering</option>
                                        <option>Information Systems</option>
                                        <option>Cybersecurity</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Current Level</label>
                                    <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>100 Level</option>
                                        <option>200 Level</option>
                                        <option>300 Level</option>
                                        <option>400 Level</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Temporary Password</label>
                                    <Input type="text" defaultValue="TempPass123!" readOnly className="bg-muted text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">This password will be sent to the student. They must change it upon first login.</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <PillButton type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                    Create Student Profile
                                </PillButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search students by name, ID, or program..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground border border-border rounded-md px-3 py-1">
                                    Total Active: <span className="font-bold text-foreground">2,845</span>
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold rounded-tl-md">Student Info</th>
                                        <th className="px-6 py-4 font-semibold">Program</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right rounded-tr-md">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 flex-shrink-0">
                                                            <span className="text-emerald-500 font-semibold">{student.name.charAt(0)}</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-foreground">{student.name}</div>
                                                            <div className="text-muted-foreground text-xs mt-0.5">{student.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-foreground">{student.program}</div>
                                                    <div className="text-muted-foreground text-xs">{student.level}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {student.status === 'Active' ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                                                            <UserCheck className="h-3 w-3 mr-1" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20">
                                                            Suspended
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                        <button className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                                No students found matching "{searchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

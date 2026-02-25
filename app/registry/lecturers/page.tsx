'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Search, Plus, UserCheck, MoreVertical, Edit2, Trash2 } from 'lucide-react'

export default function RegistryLecturersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    // Mock Lecturers
    const lecturers = [
        { id: 'LEC001', name: 'Dr. Sarah Smith', department: 'Computer Science', courses: 3, status: 'Active', joined: 'Aug 2018' },
        { id: 'LEC002', name: 'Prof. James Wilson', department: 'Mathematics', courses: 2, status: 'Active', joined: 'Jan 2015' },
        { id: 'LEC003', name: 'Dr. Emily Chen', department: 'Software Engineering', courses: 4, status: 'Active', joined: 'Sept 2020' },
        { id: 'LEC004', name: 'Mr. Robert Davis', department: 'Information Systems', courses: 2, status: 'On Leave', joined: 'Aug 2021' },
        { id: 'LEC005', name: 'Dr. Michael Brown', department: 'Cybersecurity', courses: 3, status: 'Active', joined: 'Feb 2019' },
    ]

    const filteredLecturers = lecturers.filter(lecturer =>
        lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.department.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Lecturer Registry</h1>
                    <p className="text-muted-foreground mt-1">Manage and register teaching staff accounts.</p>
                </div>
                {!isRegistering && (
                    <PillButton onClick={() => setIsRegistering(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Register Lecturer
                    </PillButton>
                )}
            </div>

            {isRegistering ? (
                <Card className="border-primary/20 shadow-md">
                    <CardHeader className="border-b bg-primary/5 pb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Register New Lecturer</CardTitle>
                                <CardDescription className="mt-1">Add a new lecturer profile to the university registry.</CardDescription>
                            </div>
                            <PillButton variant="ghost" onClick={() => setIsRegistering(false)}>Cancel</PillButton>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsRegistering(false) }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="e.g. Sarah" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="e.g. Smith" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input type="email" placeholder="sarah.smith@university.edu" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Department</label>
                                    <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Computer Science</option>
                                        <option>Software Engineering</option>
                                        <option>Mathematics</option>
                                        <option>Information Systems</option>
                                        <option>Cybersecurity</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Professor</option>
                                        <option>Associate Professor</option>
                                        <option>Assistant Professor</option>
                                        <option>Lecturer</option>
                                        <option>Adjunct</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Temporary Password</label>
                                    <Input type="text" defaultValue="TempPass123!" readOnly className="bg-muted text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">This password will be sent to the lecturer. They must change it upon first login.</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <PillButton type="submit" className="bg-primary hover:bg-primary/90 text-white">
                                    Create Lecturer Profile
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
                                    placeholder="Search lecturers by name, ID, or department..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground border border-border rounded-md px-3 py-1">
                                    Total Active: <span className="font-bold text-foreground">142</span>
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold rounded-tl-md">Lecturer Info</th>
                                        <th className="px-6 py-4 font-semibold">Department</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right rounded-tr-md">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredLecturers.length > 0 ? (
                                        filteredLecturers.map((lecturer) => (
                                            <tr key={lecturer.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                                                            <span className="text-primary font-semibold">{lecturer.name.replace(/[^a-zA-Z ]/g, "").split(" ")[1]?.charAt(0) || lecturer.name.charAt(0)}</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-foreground">{lecturer.name}</div>
                                                            <div className="text-muted-foreground text-xs mt-0.5">{lecturer.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-foreground">{lecturer.department}</div>
                                                    <div className="text-muted-foreground text-xs">{lecturer.courses} Active Courses</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {lecturer.status === 'Active' ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                                                            <UserCheck className="h-3 w-3 mr-1" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                                                            On Leave
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
                                                No lecturers found matching "{searchQuery}"
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

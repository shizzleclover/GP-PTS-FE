'use client'

import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Search, Plus, UserCheck, MoreVertical, Edit2, Trash2 } from 'lucide-react'

export default function RegistryLecturersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    const [lecturers, setLecturers] = useState<any[]>([])
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', department: 'Computer Science', jobTitle: 'Professor'
    })

    const loadLecturers = async () => {
        try {
            const res = await apiFetch('/users')
            if (res.isMock) {
                setLecturers([
                    { id: 'LEC001', name: 'Dr. Sarah Smith', department: 'Computer Science', courses: 3, status: 'Active', joined: 'Aug 2018' },
                    { id: 'LEC002', name: 'Prof. James Wilson', department: 'Mathematics', courses: 2, status: 'Active', joined: 'Jan 2015' },
                ])
            } else {
                // Filter only teachers from the user pool
                const teachers = res.data.data.filter((u: any) => u.role === 'teacher')
                setLecturers(teachers.map((t: any) => ({
                    id: t._id.substring(0, 8).toUpperCase(),
                    name: `${t.firstName} ${t.lastName}`,
                    department: t.department || 'General',
                    courses: 0,
                    status: 'Active',
                    joined: new Date(t.createdAt).toLocaleDateString()
                })))
            }
        } catch (err) {
            console.error('Failed to load lecturers', err)
        }
    }

    useEffect(() => {
        loadLecturers()
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.email,
                    password: 'TempPass123!',
                    role: 'teacher',
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    department: formData.department
                })
            })

            setIsRegistering(false)
            setFormData({ firstName: '', lastName: '', email: '', phone: '', department: 'Computer Science', jobTitle: 'Professor' })
            loadLecturers()
        } catch (err) {
            console.error('Registration failed', err)
            alert('Failed to register lecturer.')
        }
    }

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
                        <form className="space-y-6" onSubmit={handleRegister}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="e.g. Sarah" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="e.g. Smith" required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input type="email" placeholder="sarah.smith@university.edu" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Department</label>
                                    <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Computer Science</option>
                                        <option>Software Engineering</option>
                                        <option>Mathematics</option>
                                        <option>Information Systems</option>
                                        <option>Cybersecurity</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <select value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
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
                                    Total Active: <span className="font-bold text-foreground">{filteredLecturers.length}</span>
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

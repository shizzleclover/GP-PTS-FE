'use client'

import { useState, useEffect } from 'react'
import { apiFetch } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Link as LinkIcon, MoreVertical, Edit2, Trash2, Users } from 'lucide-react'

export default function RegistryParentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [isLinking, setIsLinking] = useState(false)
    const [selectedParentId, setSelectedParentId] = useState('')
    const [selectedStudentId, setSelectedStudentId] = useState('')

    const [parents, setParents] = useState<any[]>([])
    const [students, setStudents] = useState<any[]>([])
    const [allUsers, setAllUsers] = useState<any[]>([])
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: ''
    })

    const loadData = async () => {
        try {
            const [usersRes, studentsRes] = await Promise.all([
                apiFetch('/users'),
                apiFetch('/students')
            ])

            const users = usersRes.data?.data || []
            const studentsRaw = studentsRes.data?.data || []

            setAllUsers(users)
            setStudents(studentsRaw)

            const parentStudentCount = new Map<string, number>()
            studentsRaw.forEach((s: any) => {
                const parentIds = (s.parentIds || []).map((p: any) => (typeof p === 'string' ? p : p?._id)).filter(Boolean)
                parentIds.forEach((pid: string) => {
                    parentStudentCount.set(pid, (parentStudentCount.get(pid) || 0) + 1)
                })
            })

            const parentsList = users.filter((u: any) => u.role === 'parent')
            setParents(parentsList.map((p: any) => ({
                id: p._id.substring(0, 8).toUpperCase(),
                userId: p._id,
                name: `${p.firstName} ${p.lastName}`,
                email: p.email || p.username || 'N/A',
                phone: 'N/A',
                students: parentStudentCount.get(p._id) || 0,
                status: 'Active'
            })))
        } catch (err) {
            console.error('Failed to load parents', err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.email,
                    password: 'password',
                    role: 'parent',
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email
                })
            })

            setIsRegistering(false)
            setFormData({ firstName: '', lastName: '', email: '', phone: '' })
            loadData()
        } catch (err) {
            console.error('Registration failed', err)
            alert('Failed to register parent.')
        }
    }

    const handleCreateLink = async () => {
        if (!selectedParentId || !selectedStudentId) {
            alert('Please select both a parent email and a student email.')
            return
        }
        try {
            const student = students.find((s: any) => s._id === selectedStudentId)
            if (!student) {
                alert('Selected student was not found.')
                return
            }

            const existingParentIds = (student.parentIds || [])
                .map((p: any) => (typeof p === 'string' ? p : p?._id))
                .filter(Boolean)

            const parentIds = Array.from(new Set([...existingParentIds, selectedParentId]))

            await apiFetch(`/students/${selectedStudentId}`, {
                method: 'PUT',
                body: JSON.stringify({ parentIds })
            })

            setIsLinking(false)
            setSelectedParentId('')
            setSelectedStudentId('')
            loadData()
        } catch (err) {
            console.error('Failed to link parent and student', err)
            alert('Failed to create link.')
        }
    }

    const handleUnlink = async (studentId: string, parentId: string) => {
        try {
            const student = students.find((s: any) => s._id === studentId)
            if (!student) {
                alert('Selected link is invalid.')
                return
            }

            const updatedParentIds = (student.parentIds || [])
                .map((p: any) => (typeof p === 'string' ? p : p?._id))
                .filter((pid: string) => pid && pid !== parentId)

            await apiFetch(`/students/${studentId}`, {
                method: 'PUT',
                body: JSON.stringify({ parentIds: updatedParentIds })
            })

            loadData()
        } catch (err) {
            console.error('Failed to unlink parent and student', err)
            alert('Failed to unlink account.')
        }
    }

    const filteredParents = parents.filter(parent =>
        parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const parentOptions = allUsers.filter((u: any) => u.role === 'parent')
    const studentOptions = students
        .map((s: any) => {
            const studentUser = allUsers.find((u: any) => u._id === s.userId && u.role === 'student')
            return {
                id: s._id,
                label: `${s.firstName} ${s.lastName}`,
                email: studentUser?.email || studentUser?.username || 'no-email',
                studentId: s.studentId
            }
        })
        .filter((s: any) => s.email !== 'no-email')

    const existingLinks = students.flatMap((s: any) => {
        const parentIds = (s.parentIds || []).map((p: any) => (typeof p === 'string' ? p : p?._id)).filter(Boolean)
        return parentIds.map((parentId: string) => {
            const parent = allUsers.find((u: any) => u._id === parentId && u.role === 'parent')
            const studentUser = allUsers.find((u: any) => u._id === s.userId && u.role === 'student')
            return {
                id: `${parentId}-${s._id}`,
                parentId,
                studentId: s._id,
                parentEmail: parent?.email || parent?.username || 'N/A',
                parentName: parent ? `${parent.firstName} ${parent.lastName}` : 'Unknown Parent',
                studentEmail: studentUser?.email || studentUser?.username || 'N/A',
                studentName: `${s.firstName} ${s.lastName}`,
                matric: s.studentId
            }
        })
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Parent Registry</h1>
                    <p className="text-muted-foreground mt-1">Manage parent accounts and family links.</p>
                </div>
                {!isRegistering && (
                    <div className="flex items-center gap-2">
                        <PillButton variant="secondary" onClick={() => setIsLinking(true)} className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            Link Accounts
                        </PillButton>
                        <PillButton onClick={() => setIsRegistering(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Register Parent
                        </PillButton>
                    </div>
                )}
            </div>

            <Dialog open={isLinking} onOpenChange={setIsLinking}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Link Parent to Student</DialogTitle>
                        <DialogDescription>
                            Select parent and student accounts by email.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="parentEmail">Parent Email</Label>
                            <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                                <SelectTrigger id="parentEmail">
                                    <SelectValue placeholder="Select parent email" />
                                </SelectTrigger>
                                <SelectContent>
                                    {parentOptions.map((p: any) => (
                                        <SelectItem key={p._id} value={p._id}>
                                            {p.email || p.username}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="studentEmail">Student Email</Label>
                            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                                <SelectTrigger id="studentEmail">
                                    <SelectValue placeholder="Select student email" />
                                </SelectTrigger>
                                <SelectContent>
                                    {studentOptions.map((s: any) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.email} ({s.label} - {s.studentId})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <PillButton variant="outline" onClick={() => setIsLinking(false)}>Cancel</PillButton>
                        <PillButton onClick={handleCreateLink}>Create Link</PillButton>
                    </DialogFooter>

                    <div className="pt-4 border-t space-y-2">
                        <p className="text-sm font-medium">Existing Links</p>
                        <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                            {existingLinks.length === 0 ? (
                                <p className="text-xs text-muted-foreground">No parent-student links found.</p>
                            ) : (
                                existingLinks.map((link: any) => (
                                    <div key={link.id} className="flex items-center justify-between gap-2 border rounded-md p-2">
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium truncate">{link.parentEmail} &rarr; {link.studentEmail}</p>
                                            <p className="text-[11px] text-muted-foreground truncate">
                                                {link.parentName} &rarr; {link.studentName} ({link.matric})
                                            </p>
                                        </div>
                                        <PillButton
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleUnlink(link.studentId, link.parentId)}
                                        >
                                            Unlink
                                        </PillButton>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {isRegistering ? (
                <Card className="border-blue-500/20 shadow-md">
                    <CardHeader className="border-b bg-blue-500/5 pb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Register New Parent</CardTitle>
                                <CardDescription className="mt-1">Create a parent account to grant portal access.</CardDescription>
                            </div>
                            <PillButton variant="ghost" onClick={() => setIsRegistering(false)}>Cancel</PillButton>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="space-y-6" onSubmit={handleRegister}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="e.g. Robert" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="e.g. Taylor" required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input type="email" placeholder="robert.t@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Primary Phone Number</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>

                                <div className="space-y-2 md:col-span-2 border rounded-lg p-4 bg-muted/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <LinkIcon className="h-4 w-4 text-blue-500" />
                                        <label className="text-sm font-medium">Link to Students (Optional)</label>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Use the Link Accounts button above to connect parent and student accounts by email.
                                    </p>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Temporary Password</label>
                                    <Input type="text" defaultValue="password" readOnly className="bg-muted text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">
                                        Parent login is authorized with the child matric number. Keep this as password during setup.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <PillButton type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                                    Create Parent Profile
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
                                    placeholder="Search parents by name, ID, or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground border border-border rounded-md px-3 py-1">
                                    Total Registered: <span className="font-bold text-foreground">{filteredParents.length}</span>
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold rounded-tl-md">Parent Info</th>
                                        <th className="px-6 py-4 font-semibold">Contact / Email</th>
                                        <th className="px-6 py-4 font-semibold">Linked Students</th>
                                        <th className="px-6 py-4 font-semibold text-right rounded-tr-md">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredParents.length > 0 ? (
                                        filteredParents.map((parent) => (
                                            <tr key={parent.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 flex-shrink-0">
                                                            <span className="text-blue-500 font-semibold">{parent.name.charAt(0)}</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-foreground">{parent.name}</div>
                                                            <div className="text-muted-foreground text-xs mt-0.5">{parent.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-foreground">{parent.email}</div>
                                                    <div className="text-muted-foreground text-xs">{parent.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                                                        <Users className="h-3 w-3 mr-1" />
                                                        {parent.students} Student{parent.students !== 1 ? 's' : ''}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 transition-colors" title="Manage Links">
                                                            <LinkIcon className="h-4 w-4" />
                                                        </button>
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
                                                No parents found matching "{searchQuery}"
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

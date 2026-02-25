'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PillButton } from '@/components/ui/pill-button'
import { Search, Plus, Link as LinkIcon, MoreVertical, Edit2, Trash2, Users } from 'lucide-react'

export default function RegistryParentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    // Mock Parents
    const parents = [
        { id: 'PAR001', name: 'Michael Johnson', email: 'michael.j@example.com', phone: '+1 (555) 123-4567', students: 2, status: 'Active' },
        { id: 'PAR002', name: 'Sarah Williams', email: 'swilliams@example.com', phone: '+1 (555) 987-6543', students: 1, status: 'Active' },
        { id: 'PAR003', name: 'David Lee', email: 'david.lee88@example.com', phone: '+1 (555) 456-7890', students: 3, status: 'Active' },
        { id: 'PAR004', name: 'Jennifer Martinez', email: 'jmartinez@example.com', phone: '+1 (555) 234-5678', students: 1, status: 'Inactive' },
        { id: 'PAR005', name: 'Robert Taylor', email: 'rtaylor@example.com', phone: '+1 (555) 876-5432', students: 2, status: 'Active' },
    ]

    const filteredParents = parents.filter(parent =>
        parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Parent Registry</h1>
                    <p className="text-muted-foreground mt-1">Manage parent accounts and family links.</p>
                </div>
                {!isRegistering && (
                    <PillButton onClick={() => setIsRegistering(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Register Parent
                    </PillButton>
                )}
            </div>

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
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsRegistering(false) }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="e.g. Robert" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="e.g. Taylor" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input type="email" placeholder="robert.t@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Primary Phone Number</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" required />
                                </div>

                                <div className="space-y-2 md:col-span-2 border rounded-lg p-4 bg-muted/30">
                                    <div className="flex items-center gap-2 mb-3">
                                        <LinkIcon className="h-4 w-4 text-blue-500" />
                                        <label className="text-sm font-medium">Link to Students (Optional)</label>
                                    </div>
                                    <Input type="text" placeholder="Search and select student ID or Name..." />
                                    <p className="text-xs text-muted-foreground mt-2">You can link students now, or do it later from the Admin {"->"} Link Accounts page.</p>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Temporary Password</label>
                                    <Input type="text" defaultValue="TempPass123!" readOnly className="bg-muted text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">This password will be sent to the parent. They must change it upon first login.</p>
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
                                    Total Registered: <span className="font-bold text-foreground">1,932</span>
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

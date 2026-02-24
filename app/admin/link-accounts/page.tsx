'use client'

import { useState } from 'react'
import { Plus, Search, Link2, Trash2, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Link {
  id: string
  parentName: string
  studentName: string
  relationship: string
  linkedDate: string
}

const mockLinks: Link[] = [
  { id: '1', parentName: 'Sarah Johnson', studentName: 'Emma Johnson', relationship: 'Mother', linkedDate: '2024-01-20' },
  { id: '2', parentName: 'Michael Brown', studentName: 'Liam Brown', relationship: 'Father', linkedDate: '2024-01-22' },
  { id: '3', parentName: 'Robert Wilson', studentName: 'Sophia Wilson', relationship: 'Father', linkedDate: '2024-02-01' },
  { id: '4', parentName: 'Sarah Johnson', studentName: 'James Johnson', relationship: 'Mother', linkedDate: '2024-02-03' },
]

export default function LinkAccountsPage() {
  const [links, setLinks] = useState<Link[]>(mockLinks)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [newLink, setNewLink] = useState({
    parentName: '',
    studentName: '',
    relationship: 'Parent',
  })

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleCreateLink = () => {
    if (newLink.parentName && newLink.studentName) {
      const link: Link = {
        id: Math.random().toString(),
        ...newLink,
        linkedDate: new Date().toISOString().split('T')[0],
      }
      setLinks([...links, link])
      setNewLink({ parentName: '', studentName: '', relationship: 'Parent' })
      setIsLinkOpen(false)
    }
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Link Parent-Student Accounts
          </h1>
          <p className="text-muted-foreground">
            Connect parent accounts to student accounts
          </p>
        </div>
        <Dialog open={isLinkOpen} onOpenChange={setIsLinkOpen}>
          <DialogTrigger asChild>
            <PillButton size="lg">
              <Link2 className="h-5 w-5 mr-2" />
              Create Link
            </PillButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link Parent to Student</DialogTitle>
              <DialogDescription>
                Establish a parent-student relationship
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="parent">Parent Name</Label>
                <Input
                  id="parent"
                  placeholder="Enter parent name"
                  value={newLink.parentName}
                  onChange={(e) => setNewLink({ ...newLink, parentName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="student">Student Name</Label>
                <Input
                  id="student"
                  placeholder="Enter student name"
                  value={newLink.studentName}
                  onChange={(e) => setNewLink({ ...newLink, studentName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={newLink.relationship} onValueChange={(value) => setNewLink({ ...newLink, relationship: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parent">Parent/Guardian</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Guardian">Legal Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <PillButton variant="outline" onClick={() => setIsLinkOpen(false)}>
                Cancel
              </PillButton>
              <PillButton onClick={handleCreateLink}>
                Create Link
              </PillButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{links.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Parent-student connections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Parents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(links.map(l => l.parentName)).size}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique parent accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(links.map(l => l.studentName)).size}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique student accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by parent or student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>Parent-Student Links</CardTitle>
          <CardDescription>
            Showing {filteredLinks.length} of {links.length} links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parent</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Link Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.parentName}</TableCell>
                    <TableCell>{link.studentName}</TableCell>
                    <TableCell>
                      <Badge variant="info">{link.relationship}</Badge>
                    </TableCell>
                    <TableCell>{link.linkedDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-emerald-500 font-medium">Active</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PillButton
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => handleDeleteLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </PillButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredLinks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No parent-student links found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

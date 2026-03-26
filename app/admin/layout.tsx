'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Users, BookOpen, Link2, Home } from 'lucide-react'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [userName, setUserName] = useState('Admin')

  useEffect(() => {
    const uStr = sessionStorage.getItem('user')
    if (uStr) {
      const u = JSON.parse(uStr)
      setUserName(u.firstName ? `${u.firstName} ${u.lastName}` : u.name || u.username || 'Admin')
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    localStorage.removeItem('authToken')
    router.push('/auth/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Home size={20} />,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Users size={20} />,
    },
    {
      label: 'Courses',
      href: '/admin/courses',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Link Accounts',
      href: '/admin/link-accounts',
      icon: <Link2 size={20} />,
    },
  ]

  return (
    <SidebarLayout
      sidebar={
        <SidebarNav
          items={navItems}
          userRole="Administrator"
          userName={userName}
          onLogout={handleLogout}
        />
      }
    >
      {children}
    </SidebarLayout>
  )
}

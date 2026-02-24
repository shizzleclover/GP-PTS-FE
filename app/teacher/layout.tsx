'use client'

import { useRouter } from 'next/navigation'
import { Home, BookOpen, BarChart3, MessageSquare, Users } from 'lucide-react'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { ReactNode } from 'react'

export default function TeacherLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    router.push('/auth/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/teacher/dashboard',
      icon: <Home size={20} />,
    },
    {
      label: 'My Classes',
      href: '/teacher/classes',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Grades',
      href: '/teacher/grades',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Attendance',
      href: '/teacher/attendance',
      icon: <Users size={20} />,
    },
    {
      label: 'Messages',
      href: '/teacher/messages',
      icon: <MessageSquare size={20} />,
      badge: 3,
    },
  ]

  return (
    <SidebarLayout
      sidebar={
        <SidebarNav
          items={navItems}
          userRole="Lecturer"
          userName="John Smith"
          onLogout={handleLogout}
        />
      }
    >
      {children}
    </SidebarLayout>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Home, BookOpen, AlertCircle, MessageSquare, Settings } from 'lucide-react'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { ReactNode } from 'react'

export default function ParentLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    router.push('/auth/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/parent/dashboard',
      icon: <Home size={20} />,
    },
    {
      label: 'Child\'s Academics',
      href: '/parent/academics',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Behavior & Discipline',
      href: '/parent/discipline',
      icon: <AlertCircle size={20} />,
    },
    {
      label: 'Messages',
      href: '/parent/messages',
      icon: <MessageSquare size={20} />,
      badge: 2,
    },
    {
      label: 'Settings',
      href: '/parent/settings',
      icon: <Settings size={20} />,
    },
  ]

  return (
    <SidebarLayout
      sidebar={
        <SidebarNav
          items={navItems}
          userRole="Parent / Guardian"
          userName="Sarah Johnson"
          onLogout={handleLogout}
        />
      }
    >
      {children}
    </SidebarLayout>
  )
}

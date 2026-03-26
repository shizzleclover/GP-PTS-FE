'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, MessageSquare, Shield, Users, BarChart3, Globe, ArrowRight, GraduationCap, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dashboardUrl, setDashboardUrl] = useState('/auth/login')

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      const u = JSON.parse(user)
      setIsLoggedIn(true)
      if (u.role === 'admin') setDashboardUrl('/admin/dashboard')
      else if (u.role === 'registry') setDashboardUrl('/registry/dashboard')
      else if (u.role === 'teacher') setDashboardUrl('/teacher/dashboard')
      else setDashboardUrl('/parent/dashboard')
    }
  }, [])

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      title: 'Real-Time Grade Tracking',
      description: 'Monitor academic performance with live grade updates, GPA calculations, and full semester history.',
      bg: 'bg-[#1e40af]',
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Attendance & Discipline',
      description: 'Track attendance records and behavioural incidents with an intelligent alert system.',
      bg: 'bg-[#10b981]',
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: 'Parent-Teacher Messaging',
      description: 'Seamless, real-time communication between parents and lecturers within the portal.',
      bg: 'bg-[#1e40af]',
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: 'Cross-School Communication',
      description: 'Lecturers across departments can collaborate and communicate through a unified platform.',
      bg: 'bg-[#10b981]',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-[#1a2a47]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1e40af] text-white font-bold text-lg">
            P
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1a2a47]">University Portal</span>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href={dashboardUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium text-sm transition-colors"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium text-sm transition-colors"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e40af]/10 text-[#1e40af] text-sm font-medium mb-6">
            <CheckCircle2 className="h-4 w-4" />
            Parent-Teacher Communication Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[#1a2a47]">
            Monitoring Students' Academic & Disciplinary Records
          </h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            A unified, web-based platform connecting administrators, lecturers, and parents to monitor academic performance, attendance, and disciplinary records in real-time.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold text-base transition-colors group"
            >
              Get Started
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-gray-200 hover:border-[#1e40af] text-[#1a2a47] font-medium text-base transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right side — role cards */}
        <div className="flex-1 w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Users className="h-5 w-5 text-[#1e40af]" />, label: 'Administrators', desc: 'System-wide oversight & user management', bg: 'bg-[#1e40af]/5' },
              { icon: <GraduationCap className="h-5 w-5 text-[#10b981]" />, label: 'Registry Officers', desc: 'Student & staff onboarding', bg: 'bg-[#10b981]/5' },
              { icon: <BookOpen className="h-5 w-5 text-[#1e40af]" />, label: 'Lecturers', desc: 'Grades, attendance & messaging', bg: 'bg-[#1e40af]/5' },
              { icon: <Shield className="h-5 w-5 text-[#10b981]" />, label: 'Parents', desc: "Monitor child's progress", bg: 'bg-[#10b981]/5' },
            ].map((r, i) => (
              <div key={i} className={`${r.bg} rounded-2xl p-5 border border-gray-100`}>
                <div className="mb-3">{r.icon}</div>
                <p className="text-sm font-semibold text-[#1a2a47] mb-1">{r.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1e40af] py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '4', label: 'User Roles' },
            { value: '8', label: 'API Modules' },
            { value: '100%', label: 'Real-Time Data' },
            { value: '24/7', label: 'Cloud Availability' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-blue-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a2a47] mb-3">
            Core Features
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Designed to streamline academic monitoring and foster collaboration across the entire university ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1a2a47] mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2a47] mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Sign in to access your dashboard and start monitoring academic records in real-time.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold text-base transition-colors group"
          >
            Sign In to Portal
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e40af] text-white font-bold text-sm">P</div>
            <span className="text-sm text-gray-500">University Parent-Teacher Communication Portal</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

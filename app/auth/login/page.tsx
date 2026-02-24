'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { PillButton } from '@/components/ui/pill-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate authentication - replace with real API call
      if (email && password) {
        // Mock user detection by email domain/pattern
        let role = 'parent'
        if (email.includes('admin')) role = 'admin'
        else if (email.includes('teacher') || email.includes('lecturer') || email.includes('professor')) role = 'teacher'
        else if (email.includes('student')) role = 'student'

        // Store user session (mock)
        sessionStorage.setItem('user', JSON.stringify({
          email,
          role,
          name: email.split('@')[0],
        }))

        // Redirect based on role
        if (role === 'admin') router.push('/admin/dashboard')
        else if (role === 'teacher') router.push('/teacher/dashboard')
        else if (role === 'student') router.push('/student/dashboard')
        else router.push('/parent/dashboard')
      } else {
        setError('Please enter email and password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary mb-4">
            <span className="text-xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            University Portal
          </h1>
          <p className="text-muted-foreground">
            Secure academic communication platform
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link href="/auth/forgot-password">
                  <span className="text-sm text-primary hover:underline transition-smooth">
                    Forgot password?
                  </span>
                </Link>
              </div>

              {/* Submit Button */}
              <PillButton
                type="submit"
                fullWidth
                size="lg"
                disabled={isLoading}
                className="group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </PillButton>

              {/* Demo Credentials */}
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs font-medium text-foreground mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Admin: <code className="bg-background px-1 rounded">admin@university.edu</code></p>
                  <p>Lecturer: <code className="bg-background px-1 rounded">teacher@university.edu</code></p>
                  <p>Student: <code className="bg-background px-1 rounded">student@university.edu</code></p>
                  <p>Parent: <code className="bg-background px-1 rounded">parent@university.edu</code></p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help? Contact your school administrator
        </p>
      </div>
    </div>
  )
}

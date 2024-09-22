'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginRegister() {
  const { user, login, register, isAuthLoading } = useAuth()
  const router = useRouter()

  if (user) {
    router.push('/');
    return
  }

  const [activeTab, setActiveTab] = useState('login')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    login(email, password)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    register(email, username, password)
  }

  return (
    <div className="max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" name="email" type="text" required />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isAuthLoading}>
              {isAuthLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="register-username">Username</Label>
              <Input id="register-username" name="username" type="text" required />
            </div>
            <div>
              <Label htmlFor="register-password">Password</Label>
              <Input id="register-password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isAuthLoading}>
              {isAuthLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
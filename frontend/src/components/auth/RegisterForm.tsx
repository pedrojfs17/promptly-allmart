'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function LoginRegister() {
  const { register, isAuthLoading } = useAuth()
  const { showErrorToast } = useToastNotifications()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      await register(email, username, password)
    } catch (error) {
      showErrorToast(
        "Failed to register",
        (error as Error).message
      )
    }
  }

  return (
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
        <Input id="register-password" name="password" type="password" minLength={8} required />
      </div>
      <Button type="submit" className="w-full" disabled={isAuthLoading}>
        {isAuthLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  )
}
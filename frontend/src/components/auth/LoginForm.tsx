'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function LoginRegister() {
  const { login, isAuthLoading } = useAuth()
  const { showErrorToast } = useToastNotifications()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await login(email, password)
    } catch (error) {
      showErrorToast(
        "Failed to login",
        (error as Error).message
      )
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" name="password" type="password" minLength={8} required />
      </div>
      <Button type="submit" className="w-full" disabled={isAuthLoading}>
        {isAuthLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
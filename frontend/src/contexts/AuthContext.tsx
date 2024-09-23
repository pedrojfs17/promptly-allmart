'use client';

import React, { createContext, useState, useContext, useEffect } from 'react'
import { User } from '@/types'
import { getCurrentUser, login as apiLogin, register as apiRegister } from '@/lib/api'

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setIsAuthLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setIsAuthLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsAuthLoading(true)
    try {
      await apiLogin({ email, password })
      await fetchUser()
    } catch (error) {
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  const register = async (email: string, username: string, password: string) => {
    setIsAuthLoading(true)
    try {
      await apiRegister({ email, username, password })
      await login(email, password)
    } catch (error) {
      throw error
    } finally {
      setIsAuthLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
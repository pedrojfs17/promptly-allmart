"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function useProtectedRoute() {
  const { user, isAuthLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login')
    }
  }, [user, isAuthLoading, router])

  return { user, isAuthLoading }
}
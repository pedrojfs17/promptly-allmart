import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  className?: string
}

export default function LoadingSpinner({
  size = 24,
  color = 'text-orange-500',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  )
}

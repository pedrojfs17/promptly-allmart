import React from 'react'
import LoadingSpinner from './LoadingSpinner'

interface PageLoadingProps {
  size?: number
  color?: string
}

export default function PageLoading({ size, color }: PageLoadingProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <LoadingSpinner size={size} color={color} />
    </div>
  )
}

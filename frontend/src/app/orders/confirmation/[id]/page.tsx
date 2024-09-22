'use client';

import PageLoading from '@/components/loading/PageLoading';
import { Button } from '@/components/ui/button'
import useProtectedRoute from '@/hooks/useProtectedRoute';
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function OrderConfirmation() {
  const { id } = useParams()
  const { user, isAuthLoading } = useProtectedRoute()

  if (isAuthLoading) {
    return <PageLoading size={48} />
  }

  if (!user) return;

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>
      <p className="text-xl mb-4">Thank you for your order!</p>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href={`/orders/${id}`}>View Order</Link>
        </Button>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
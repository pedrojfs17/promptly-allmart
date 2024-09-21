'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function OrderConfirmation() {
  const { id } = useParams()

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
'use client'

import { OrderStatus } from '@/types'
import { Badge } from '@/components/ui/badge'

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500'
      case 'shipped':
        return 'bg-blue-500'
      case 'delivered':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      case 'pending':
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Badge className={`${getStatusColor(status)} text-white px-3 py-1 rounded-full text-sm`}>
      {formatStatus(status)}
    </Badge>
  )
}
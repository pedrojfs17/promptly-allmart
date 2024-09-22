'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getOrders } from '@/lib/api'
import { Order } from '@/types'
import OrderStatusBadge from '@/components/OrderStatusBadge'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import PageLoading from '@/components/loading/PageLoading'

export default function ProfilePage() {
  const { user, isAuthLoading } = useProtectedRoute()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const ordersData = await getOrders()
      setOrders(ordersData)
    }
    
    fetchOrders()
  }, [])

  if (isAuthLoading) {
    return <PageLoading size={48} />
  }

  if (!user) return;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="text-2xl">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>
                    <span className='text-gray-400 text-xs'>#</span>{order.order_id}
                  </TableCell>
                  <TableCell>{order.items.reduce((acc, cur) => acc + cur.quantity, 0)}</TableCell>
                  <TableCell>${parseFloat(order.total_amount).toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                  <TableCell>
                    <Link href={`/orders/${order.order_id}`} className="hover:underline">
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
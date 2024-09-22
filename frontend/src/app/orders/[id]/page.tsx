'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, Package } from 'lucide-react'
import { getOrder } from '@/lib/api'
import { Order } from '@/types'
import OrderStatusBadge from '@/components/OrderStatusBadge'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import PageLoading from '@/components/loading/PageLoading'

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const { id } = useParams()
  const { user, isAuthLoading } = useProtectedRoute()

  useEffect(() => {
    if (!user) return;

    const fetchOrderDetails = async () => {
      const order = await getOrder(parseInt(id as string))
      setOrder(order)
    }

    fetchOrderDetails()
  }, [id, user])
  
  if (isAuthLoading || !order) {
    return <PageLoading size={48} />
  }
  
  if (!user) return;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/profile" className="flex items-center hover:underline mb-4">
        <ArrowLeft className="mr-2" size={20} />
        Back to Profile
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Order <span className="text-gray-400 text-xl">#</span>{order.order_id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package size={16} />
            <span>Ordered on {new Date(order.created_at).toLocaleDateString()}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <span className="text-3xl font-bold">${parseFloat(order.total_amount).toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <span className="text-3xl font-bold">{order.items.reduce((acc, cur) => acc + cur.quantity, 0)}</span>
              <span className="text-sm text-muted-foreground">Items</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <OrderStatusBadge status={order.status} />
              <span className="text-sm text-muted-foreground mt-2">Status</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.product_id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>${parseFloat(item.price_at_time).toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${(parseFloat(item.price_at_time) * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Link href={`/products/${item.product_id}`} className="hover:underline">
                      View Product
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
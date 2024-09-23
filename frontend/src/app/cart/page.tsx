'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import PageLoading from '@/components/loading/PageLoading'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToastNotifications } from '@/hooks/useToastNotifications'
import CartItemComponent from '@/components/CartItem'
import { useState } from 'react'

export default function Cart() {
  const router = useRouter()

  const { cart, clearCart, handleCheckout, isCartLoading } = useCart()
  const { user, isAuthLoading } = useProtectedRoute()
  const { showErrorToast, showSuccessToast } = useToastNotifications()

  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true)
      const order = await handleCheckout()
      if (order) {
        showSuccessToast(
          "Order placed successfully",
          "Your order has been confirmed and is being processed."
        )
        router.push(`/orders/confirmation/${order.order_id}`)
      }
    } catch (error) {
      showErrorToast(
        "Failed to place order",
        (error as Error).message
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      showSuccessToast(
        "Cart cleared",
        "All items have been removed from your cart."
      )
    } catch (error) {
      showErrorToast(
        "Failed to clear cart",
        (error as Error).message
      )
    }
  }

  if (isAuthLoading || isLoading) {
    return <PageLoading size={48} />
  }

  if (!user) return;

  if (isCartLoading) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <LoadingSpinner/>
      </div>
    )
  }

  const total = cart?.items.reduce((sum, item) => sum + item.quantity * parseFloat(item.product.price), 0) || 0

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {(!cart || cart.items.length === 0) ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              cart.items.map((item) => (
                <CartItemComponent item={item} key={item.product_id} />
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cart && cart.items.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" disabled={!cart || cart.items.length === 0} onClick={handleConfirmOrder}>Confirm Order</Button>
            <Button variant="outline" className="w-full" onClick={handleClearCart} disabled={!cart || cart.items.length === 0}>
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
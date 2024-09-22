'use client'

import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import PageLoading from '@/components/loading/PageLoading'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CartItem } from '@/types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function Cart() {
  const { cart, updateCartItem, removeFromCart, clearCart, handleCheckout, isCartLoading } = useCart()
  const router = useRouter()
  const { user, isAuthLoading } = useProtectedRoute()
  const { showErrorToast, showSuccessToast } = useToastNotifications()

  const handleConfirmOrder = async () => {
    try {
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
        "An unexpected error occurred. Please try again later."
      )
    }
  }

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCart(productId)
      showSuccessToast(
        "Item removed",
        "The item has been successfully removed from your cart."
      )
    } catch (error) {
      showErrorToast(
        "Failed to remove item",
        "An error occurred while removing the item from your cart. Please try again."
      )
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
        "An error occurred while clearing your cart. Please try again."
      )
    }
  }

  const handleUpdateQuantity = async (item: CartItem, quantity: number) => {
    if (quantity <= 0) {
      await handleRemoveFromCart(item.product_id)
      return;
    }

    try {
      item.quantity = quantity;
      await updateCartItem(item)
      showSuccessToast(
        "Cart item updated",
        "The item quantity has been successfully updated."
      )
    } catch (error) {
      showErrorToast(
        "Failed to update item",
        "An error occurred while updating item quantity. Please try again."
      )
    }
  }

  if (isAuthLoading) {
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
                <div key={item.product_id} className="flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 border-b last:border-b-0">
                  <div className="flex items-center w-full sm:w-auto">
                    <Image 
                      src={`/api/products/${item.product.product_id}/primary-image`} 
                      alt={item.product.name} width={80} height={80} className="rounded-md" 
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">${parseFloat(item.product.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 h-8 flex items-center justify-center border border-input bg-background text-sm">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleRemoveFromCart(item.product_id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
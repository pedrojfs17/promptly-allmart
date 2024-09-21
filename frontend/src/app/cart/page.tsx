'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const { cart, removeFromCart, clearCart, handleCheckout, isLoading } = useCart()
  const router = useRouter()

  const confirmOrder = async () => {
    const order = await handleCheckout()
    if (order) router.push(`/orders/confirmation/${order.order_id}`)
  }

  if (isLoading) {
    return <p>Loading cart...</p>
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    )
  }

  const total = cart.items.reduce((sum, item) => sum + item.quantity * parseFloat(item.product.price), 0)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Product</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Quantity</th>
            <th className="text-left p-2">Total</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.product_id} className="border-b">
              <td className="p-2">{item.product.name}</td>
              <td className="p-2">${parseFloat(item.product.price).toFixed(2)}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</td>
              <td className="p-2">
                <Button variant="ghost" onClick={() => removeFromCart(item.product_id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={confirmOrder}>
          Confirm Order
        </Button>
      </div>
    </div>
  )
}
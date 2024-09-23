'use client'

import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function CartItemComponent({ item }: { item: CartItem }) {
  const { updateCartItem, removeFromCart } = useCart()
  const { showErrorToast, showSuccessToast } = useToastNotifications()

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCart(productId)
      showSuccessToast(
        "Item removed",
        "The item has been successfully removed from your cart."
      )
    } catch (error) {
      showErrorToast(
        "Failed to remove item from cart",
        (error as Error).message
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
        "Failed to update item quantity",
        (error as Error).message
      )
    }
  }

  if (!item) return;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 border-b last:border-b-0">
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
  )
}
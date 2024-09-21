'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart, createOrder } from '@/lib/api'
import { Cart, CartItemCreate, Order } from '@/types'

type CartContextType = {
  cart: Cart | null;
  addToCart: (item: CartItemCreate) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  handleCheckout: () => Promise<Order | null>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const cartData = await getCart()
      setCart(cartData)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (item: CartItemCreate) => {
    setIsLoading(true)
    try {
      const updatedCart = await apiAddToCart(item)
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (productId: number) => {
    setIsLoading(true)
    try {
      const updatedCart = await apiRemoveFromCart(productId)
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      const updatedCart = await apiClearCart()
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to clear cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const order = await createOrder()
      fetchCart()
      return order;
    } catch (error) {
      console.error('Failed to create order:', error)
    } finally {
      setIsLoading(false)
    }
    return null;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleCheckout, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
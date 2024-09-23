'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { 
  getCart, 
  addToCart as apiAddToCart, 
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart, 
  clearCart as apiClearCart, 
  createOrder
} from '@/lib/api'
import { Cart, CartItemCreate, Order } from '@/types'
import { useAuth } from './AuthContext'

type CartContextType = {
  cart: Cart | null;
  addToCart: (item: CartItemCreate) => Promise<void>;
  updateCartItem: (item: CartItemCreate) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  handleCheckout: () => Promise<Order | null>;
  isCartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null)
  const [isCartLoading, setIsCartLoading] = useState(false)

  useEffect(() => {
    if (!user)
      setCart(null);
    else 
      fetchCart()
  }, [user])

  const fetchCart = async () => {
    setIsCartLoading(true)
    try {
      const cartData = await getCart()
      setCart(cartData)
    } catch (error) {
      throw error
    } finally {
      setIsCartLoading(false)
    }
  }

  const addToCart = async (item: CartItemCreate) => {
    setIsCartLoading(true)
    try {
      const updatedCart = await apiAddToCart(item)
      setCart(updatedCart)
    } catch (error) {
      throw error
    } finally {
      setIsCartLoading(false)
    }
  }

  const updateCartItem = async (item: CartItemCreate) => {
    setIsCartLoading(true)
    try {
      const updatedCart = await apiUpdateCartItem(item)
      setCart(updatedCart)
    } catch (error) {
      throw error
    } finally {
      setIsCartLoading(false)
    }
  }

  const removeFromCart = async (productId: number) => {
    setIsCartLoading(true)
    try {
      const updatedCart = await apiRemoveFromCart(productId)
      setCart(updatedCart)
    } catch (error) {
      throw error
    } finally {
      setIsCartLoading(false)
    }
  }

  const clearCart = async () => {
    setIsCartLoading(true)
    try {
      const updatedCart = await apiClearCart()
      setCart(updatedCart)
    } catch (error) {
      throw error
    } finally {
      setIsCartLoading(false)
    }
  }

  const handleCheckout = async () => {
    try {
      const order = await createOrder()
      fetchCart()
      return order;
    } catch (error) {
      throw error
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart, handleCheckout, isCartLoading }}>
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
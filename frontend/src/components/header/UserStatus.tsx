'use client'

import Link from 'next/link'
import { User, LogOut, ShoppingCart, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

export default function UserStatus() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!user) return (
    <Link href="/login" className="text-gray-600 hover:text-gray-800 relative">
      <User className="h-6 w-6" />
    </Link>
  )

  return (
    <div className="flex items-center space-x-6">
      <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
        <ShoppingCart className="w-6 h-6" />
        {cart && cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.items.reduce((acc, cur) => acc + cur.quantity, 0)}
          </span>
        )}
      </Link>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="hidden md:inline">{user.username}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link
              href="/profile"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-6 h-6" />
              <span>Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
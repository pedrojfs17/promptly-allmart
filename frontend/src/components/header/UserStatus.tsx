'use client'

import Link from 'next/link'
import { User, LogOut, ShoppingCart } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function UserStatus() {
  const { user, logout } = useAuth()
  const { cart } = useCart()

  if (!user) return (
    <Link href="/login" className="text-gray-600 hover:text-gray-800 relative">
      <User className="h-6 w-6" />
    </Link>
  )

  return (
    <div className="flex items-center space-x-3 md:space-x-6">
      <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
        <ShoppingCart className="w-6 h-6" />
        {cart && cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.items.reduce((acc, cur) => acc + cur.quantity, 0)}
          </span>
        )}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="hidden md:inline">{user.username}</span>
            <User className="h-4 w-4 md:hidden" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
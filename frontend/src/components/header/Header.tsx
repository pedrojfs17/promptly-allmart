'use client';

import Link from 'next/link'
import UserStatus from './UserStatus'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-800 md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="text-gray-600 hover:text-gray-800 hidden md:inline">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-gray-800 hidden md:inline">
            Products
          </Link>
        </nav>

        <Link href="/" className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
          Store Name
        </Link>

        <UserStatus/>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-800">
              Products
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
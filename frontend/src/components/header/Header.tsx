'use client';

import Link from 'next/link'
import UserStatus from './UserStatus'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
                <Link href="/products" className="text-gray-600 hover:text-gray-800">
                  Products
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
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
    </header>
  )
}
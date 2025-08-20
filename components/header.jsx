"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ShoppingCart from "./shopping-cart"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(3) // Mock cart count

  return (
    <>
      <header className="bg-white shadow-sm border-b border-sage-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">HH</span>
              </div>
              <span className="text-2xl font-bold text-sage-800">Handcrafted Haven</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search handcrafted items..."
                  className="pl-10 border-sage-300 focus:border-terracotta-400"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/browse" className="text-sage-700 hover:text-terracotta-600 font-medium">
                Browse
              </Link>
              <Link href="/categories" className="text-sage-700 hover:text-terracotta-600 font-medium">
                Categories
              </Link>
              <Link href="/sellers" className="text-sage-700 hover:text-terracotta-600 font-medium">
                Sellers
              </Link>
              <Link href="/about" className="text-sage-700 hover:text-terracotta-600 font-medium">
                About
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-sage-700 hover:text-terracotta-600">
                <Heart className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-sage-700 hover:text-terracotta-600 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" size="icon" className="text-sage-700 hover:text-terracotta-600">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <Button variant="ghost" size="icon" className="lg:hidden text-sage-700">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search handcrafted items..."
                className="pl-10 border-sage-300 focus:border-terracotta-400"
              />
            </div>
          </div>
        </div>
      </header>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

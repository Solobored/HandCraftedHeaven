"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, X, LogOut, Settings, Package, Shield } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import ShoppingCartComponent from "@/components/shopping-cart"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: session } = useSession()
  const { getCartItemCount } = useCart()
  const router = useRouter()

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const cartItemCount = getCartItemCount()

  const navigation = [
    { name: "Browse", href: "/browse" },
    { name: "Categories", href: "/categories" },
    { name: "Sellers", href: "/sellers" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-sage-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-terracotta-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">HH</span>
            </div>
            <span className="text-xl font-bold text-sage-900 hidden sm:block">Handcrafted Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sage-700 hover:text-terracotta-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search handcrafted items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 border-sage-300 focus:border-terracotta-400 w-full"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-sage-700 hover:text-terracotta-600 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-terracotta-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {session ? (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="text-sage-700 hover:text-terracotta-600">
                  <User className="w-5 h-5" />
                  <span className="ml-2 hidden sm:inline">{session.user.name?.split(" ")[0]}</span>
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-sage-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-sage-100">
                      <p className="text-sm font-medium text-sage-900">{session.user.name}</p>
                      <p className="text-xs text-sage-600">{session.user.email}</p>
                      {session.user.role && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {session.user.role}
                        </Badge>
                      )}
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Link>
                    {(session.user.role === "seller" || session.user.role === "admin") && (
                      <Link
                        href="/seller/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Seller Dashboard
                      </Link>
                    )}
                    {session.user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-sage-100">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-sage-700 hover:text-terracotta-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sage-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-sage-200 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search handcrafted items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 border-sage-300 focus:border-terracotta-400"
              />
            </form>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sage-700 hover:text-terracotta-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Shopping Cart Sheet */}
      <ShoppingCartComponent isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}

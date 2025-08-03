"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export default function BrowsePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  // Debounced search function
  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const fetchProducts = useCallback(async (search = "", category = "all", minPrice = 0, maxPrice = 1000) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (search.trim()) {
        params.append("search", search.trim())
      }
      if (category !== "all") {
        params.append("category", category)
      }
      if (minPrice > 0) {
        params.append("min_price", minPrice.toString())
      }
      if (maxPrice < 1000) {
        params.append("max_price", maxPrice.toString())
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedFetchProducts = useCallback(
    debounce((search, category, minPrice, maxPrice) => {
      fetchProducts(search, category, minPrice, maxPrice)
    }, 500),
    [fetchProducts],
  )

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    debouncedFetchProducts(searchTerm, selectedCategory, priceRange[0], priceRange[1])
  }, [searchTerm, selectedCategory, priceRange, debouncedFetchProducts])

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
  }

  const handlePriceRangeChange = (value) => {
    setPriceRange(value)
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Browse Our Collection</h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover unique handcrafted items from talented artisans around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search handcrafted items..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-transparent border-sage-300 focus:border-terracotta-500"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-transparent border-sage-300 focus:border-terracotta-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-transparent border-sage-300 hover:bg-sage-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-sage-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sage-600">{loading ? "Loading..." : `Showing ${products.length} products`}</p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-sage-200">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-sage-400" />
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">No products found</h3>
            <p className="text-sage-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setPriceRange([0, 1000])
              }}
              className="bg-terracotta-600 hover:bg-terracotta-700"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-sage-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative w-full h-48 bg-sage-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={product.image_url || "/placeholder.svg?height=200&width=300&query=handcrafted product"}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock <= 5 && product.stock > 0 && (
                        <Badge className="absolute top-2 right-2 bg-orange-500">Only {product.stock} left</Badge>
                      )}
                      {product.stock === 0 && <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-sage-900 mb-1 hover:text-terracotta-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-sage-600 mb-2">
                      by{" "}
                      <Link href={`/sellers/${product.seller_id}`} className="hover:text-terracotta-600">
                        {product.seller_name}
                      </Link>
                    </p>

                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-sage-300"}`}
                        />
                      ))}
                      <span className="text-xs text-sage-500 ml-1">(4.0)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-terracotta-600">${product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    {product.category_name && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {product.category_name}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { newRole } = await request.json()

    if (!["buyer", "seller", "admin"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Update user role in database
    const { error } = await supabase
      .from("users")
      .update({
        role: newRole,
        seller_name: newRole === "seller" ? session.user.name : null,
      })
      .eq("id", session.user.id)

    if (error) {
      console.error("Error updating user role:", error)
      return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Role updated successfully",
      role: newRole,
    })
  } catch (error) {
    console.error("Error in PUT /api/user/role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

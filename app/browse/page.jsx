"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Grid, List, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")

  // Debounce function
  const debounce = useCallback((func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query, category) => {
      fetchProducts(query, category)
    }, 300),
    [],
  )

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products function
  const fetchProducts = useCallback(async (search = "", category = "all") => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search && search.trim()) {
        params.append("search", search.trim())
      }
      if (category && category !== "all") {
        params.append("category", category)
      }
      params.append("limit", "100")

      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data || [])
      } else {
        console.error("Failed to fetch products")
        setProducts([])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchProducts(searchQuery, selectedCategory)
  }, [fetchProducts, searchQuery, selectedCategory])

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value, selectedCategory)
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    if (category !== "all") {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    if (searchQuery) {
      params.set("search", searchQuery)
    }
    router.push(`/browse?${params.toString()}`, { scroll: false })
    fetchProducts(searchQuery, category)
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = Number.parseFloat(product.price) || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        break
    }

    return filtered
  }, [products, priceRange, sortBy])

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      seller: product.users?.name || "Unknown Seller",
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 500])
    router.push("/browse")
    fetchProducts("", "all")
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Browse Products</h1>
          <p className="text-sage-600">Discover unique handcrafted items from talented artisans</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-sage-200 sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-sage-600" />
                  <h2 className="text-lg font-semibold text-sage-900">Filters</h2>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 border-sage-300 focus:border-terracotta-400"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="border-sage-300 focus:border-terracotta-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-2">Price Range</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      min={0}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-sage-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-sage-600">
                  {loading ? "Loading..." : `${filteredAndSortedProducts.length} products found`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-sage-300 focus:border-terracotta-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-sage-300 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-terracotta-600 hover:bg-terracotta-700" : ""}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-terracotta-600 hover:bg-terracotta-700" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="border-sage-200">
                    <div className="aspect-square bg-sage-100 animate-pulse rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-sage-100 animate-pulse rounded mb-2" />
                      <div className="h-3 bg-sage-100 animate-pulse rounded mb-4 w-2/3" />
                      <div className="h-6 bg-sage-100 animate-pulse rounded w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredAndSortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`border-sage-200 hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
                  >
                    <Link href={`/products/${product.id}`} className={viewMode === "list" ? "flex-shrink-0" : ""}>
                      <div
                        className={`bg-sage-50 overflow-hidden ${
                          viewMode === "list" ? "w-48 h-32" : "aspect-square"
                        } ${viewMode === "grid" ? "rounded-t-lg" : "rounded-l-lg"}`}
                      >
                        <img
                          src={product.image_url || "/placeholder.svg?height=300&width=300&query=handcrafted+product"}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-sage-900 mb-2 hover:text-terracotta-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.categories?.name || "Handcrafted"}
                          </Badge>
                        </div>

                        {product.description && (
                          <p className="text-sm text-sage-600 mb-3 line-clamp-2">{product.description}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-terracotta-600">
                              ${Number.parseFloat(product.price).toFixed(2)}
                            </p>
                            <Link
                              href={`/sellers/${product.seller_id}`}
                              className="text-xs text-sage-500 hover:text-terracotta-600 transition-colors"
                            >
                              by {product.users?.name || "Artisan"}
                            </Link>
                          </div>

                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAddToCart(product)
                            }}
                            className="bg-terracotta-600 hover:bg-terracotta-700"
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {viewMode === "list" ? "Add to Cart" : "Add"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-sage-400" />
                </div>
                <h3 className="text-xl font-semibold text-sage-900 mb-2">No products found</h3>
                <p className="text-sage-600 mb-6">Try adjusting your search criteria or browse all categories</p>
                <Button onClick={clearFilters} className="bg-terracotta-600 hover:bg-terracotta-700">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

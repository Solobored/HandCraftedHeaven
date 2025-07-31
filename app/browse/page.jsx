"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Grid, List, Star, Heart, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

const mockProducts = [
  {
    id: 1,
    name: "Handwoven Ceramic Bowl Set",
    seller: "Maria's Ceramics",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviews: 47,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pottery & Ceramics",
    location: "Santa Fe, NM",
    featured: true,
    createdAt: "2024-01-15",
    tags: ["ceramic", "bowl", "handwoven", "kitchen", "pottery"],
  },
  {
    id: 2,
    name: "Macrame Wall Hanging",
    seller: "Boho Crafts Co.",
    price: 65,
    rating: 4.9,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    location: "Portland, OR",
    featured: false,
    createdAt: "2024-01-20",
    tags: ["macrame", "wall", "hanging", "boho", "decor"],
  },
  {
    id: 3,
    name: "Hand-knitted Wool Scarf",
    seller: "Cozy Knits Studio",
    price: 45,
    rating: 4.7,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300",
    category: "Textiles & Fiber",
    location: "Vermont",
    featured: true,
    createdAt: "2024-01-10",
    tags: ["knitted", "wool", "scarf", "winter", "cozy"],
  },
  {
    id: 4,
    name: "Wooden Cutting Board",
    seller: "Artisan Woodworks",
    price: 75,
    rating: 5.0,
    reviews: 15,
    image: "/placeholder.svg?height=300&width=300",
    category: "Woodworking",
    location: "Colorado",
    featured: false,
    createdAt: "2024-01-25",
    tags: ["wooden", "cutting", "board", "kitchen", "wood"],
  },
  {
    id: 5,
    name: "Silver Wire Wrapped Ring",
    seller: "Moonstone Jewelry",
    price: 35,
    rating: 4.6,
    reviews: 41,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    location: "California",
    featured: false,
    createdAt: "2024-01-18",
    tags: ["silver", "wire", "ring", "jewelry", "handmade"],
  },
  {
    id: 6,
    name: "Lavender Soy Candles",
    seller: "Garden Light Co.",
    price: 28,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    location: "Oregon",
    featured: true,
    createdAt: "2024-01-22",
    tags: ["lavender", "soy", "candles", "aromatherapy", "relaxation"],
  },
]

const categories = [
  "All Categories",
  "Pottery & Ceramics",
  "Textiles & Fiber",
  "Woodworking",
  "Jewelry",
  "Home Decor",
  "Art & Paintings",
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const { addToCart } = useCart()

  // Initialize search from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get("search")
    const categoryFromUrl = searchParams.get("category")

    if (searchFromUrl) {
      setSearchQuery(searchFromUrl)
    }
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      seller: product.seller,
      price: product.price,
      image: product.image,
    })
  }

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.createdAt || "2024-01-01") - new Date(a.createdAt || "2024-01-01")
        case "featured":
        default:
          return b.featured - a.featured || b.rating - a.rating
      }
    })

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Browse Handcrafted Items</h1>
          <p className="text-lg text-sage-600 max-w-2xl">
            Discover unique, handmade treasures from talented artisans around the world
          </p>
          {searchQuery && (
            <p className="text-sage-600 mt-2">
              Showing results for: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products, sellers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-sage-300 focus:border-terracotta-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400 focus:ring-terracotta-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400 focus:ring-terracotta-400"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-sage-300 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-sage-300 text-sage-700 bg-transparent"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-sage-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="border-sage-300"
                    />
                    <span className="text-sage-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 200])}
                      className="border-sage-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">Rating</label>
                  <select className="w-full px-3 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="5">5 Stars Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">Location</label>
                  <select className="w-full px-3 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                    <option value="">Any Location</option>
                    <option value="local">Local Artisans</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sage-600">
            Showing {filteredProducts.length} of {mockProducts.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <div className="flex items-center space-x-2">
            {selectedCategory !== "All Categories" && (
              <Badge variant="secondary" className="bg-terracotta-100 text-terracotta-800">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All Categories")}
                  className="ml-2 hover:text-terracotta-900"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-sage-100 text-sage-800">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-sage-900">
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-sage-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">No products found</h3>
            <p className="text-sage-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setPriceRange([0, 200])
              }}
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Products Grid/List */}
        {filteredProducts.length > 0 && (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-sage-200">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-sage-700"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        {product.featured && (
                          <Badge className="absolute top-3 left-3 bg-terracotta-600 text-white">Featured</Badge>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-sage-900 group-hover:text-terracotta-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-sage-600">{product.seller}</p>
                          <p className="text-xs text-sage-500">{product.location}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-sage-700 ml-1">{product.rating}</span>
                          </div>
                          <span className="text-sm text-sage-500">({product.reviews})</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-sage-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-sage-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-terracotta-600 hover:bg-terracotta-700 text-white"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-4 p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-sage-900 hover:text-terracotta-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-sage-600">
                              {product.seller} • {product.location}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-sage-700">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-sage-700">{product.rating}</span>
                            <span className="text-sm text-sage-500">({product.reviews})</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-sage-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-sage-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-terracotta-600 hover:bg-terracotta-700 text-white"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
            >
              Load More Products
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

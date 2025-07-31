"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy product data
const products = [
  {
    id: "1",
    name: "Hand-painted Ceramic Mug",
    seller: "Artisan Crafts",
    category: "Home Decor",
    price: 25.0,
    tags: ["ceramic", "mug", "hand-painted", "kitchen"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Knitted Wool Scarf",
    seller: "Cozy Knits",
    category: "Apparel",
    price: 45.0,
    tags: ["wool", "scarf", "knitted", "winter"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Custom Leather Wallet",
    seller: "Leather Works",
    category: "Accessories",
    price: 70.0,
    tags: ["leather", "wallet", "custom", "men's"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Organic Soy Candle",
    seller: "Nature's Glow",
    category: "Home Decor",
    price: 18.0,
    tags: ["candle", "soy", "organic", "fragrance"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Handmade Silver Necklace",
    seller: "Jewel Craft",
    category: "Jewelry",
    price: 120.0,
    tags: ["silver", "necklace", "handmade", "jewelry"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Wooden Coasters Set",
    seller: "Woodland Wonders",
    category: "Home Decor",
    price: 30.0,
    tags: ["wood", "coasters", "set", "tableware"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const initialSearchQuery = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [priceRange, setPriceRange] = React.useState([0, 200]) // Max price in dummy data is 120

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 200])
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  const activeFilters = []
  if (searchQuery) activeFilters.push({ type: "Search", value: searchQuery, clear: () => setSearchQuery("") })
  if (selectedCategory !== "all")
    activeFilters.push({ type: "Category", value: selectedCategory, clear: () => setSelectedCategory("all") })
  if (priceRange[0] > 0 || priceRange[1] < 200)
    activeFilters.push({
      type: "Price",
      value: `$${priceRange[0]} - $${priceRange[1]}`,
      clear: () => setPriceRange([0, 200]),
    })

  return (
    <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
      {/* Sidebar Filters */}
      <aside className="mb-8 w-full md:mb-0 md:w-1/4">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine your search</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <Label htmlFor="search-input" className="mb-2 block">
                Search
              </Label>
              <Input
                id="search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <Label htmlFor="category-select" className="mb-2 block">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Home Decor">Home Decor</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price-range" className="mb-4 block">
                Price Range
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={200}
                step={5}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {filter.type}: {filter.value}
              <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 rounded-full" onClick={filter.clear}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">No products found</h2>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            {activeFilters.length > 0 && (
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <img
                  src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="aspect-square w-full rounded-t-lg object-cover"
                />
                <CardContent className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.seller}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

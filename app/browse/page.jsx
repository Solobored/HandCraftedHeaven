"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const initialSearchQuery = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || "all"

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 200])
  const { addToCart } = useCart()

  const categories = [
    { name: "All", slug: "all" },
    { name: "Home Decor", slug: "home-decor" },
    { name: "Jewelry", slug: "jewelry" },
    { name: "Art Collection", slug: "art-collection" },
    { name: "Clothing", slug: "clothing" },
    { name: "Gifts", slug: "gifts" },
    { name: "Kitchen", slug: "kitchen" },
  ]

  // Mock products data for testing
  const mockProducts = [
    {
      id: 1,
      name: "Handwoven Ceramic Bowl",
      price: 45.99,
      image_url: "/placeholder.svg?height=400&width=400",
      categories: { name: "Home Decor" },
      users: { seller_name: "Sarah's Pottery" },
    },
    {
      id: 2,
      name: "Silver Wire Earrings",
      price: 28.5,
      image_url: "/placeholder.svg?height=400&width=400",
      categories: { name: "Jewelry" },
      users: { seller_name: "Metal Works Studio" },
    },
    {
      id: 3,
      name: "Wooden Cutting Board",
      price: 65.0,
      image_url: "/placeholder.svg?height=400&width=400",
      categories: { name: "Kitchen" },
      users: { seller_name: "Woodcraft Co." },
    },
    {
      id: 4,
      name: "Hand-knitted Scarf",
      price: 35.75,
      image_url: "/placeholder.svg?height=400&width=400",
      categories: { name: "Clothing" },
      users: { seller_name: "Cozy Knits" },
    },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        // For now, use mock data. Replace with actual API call when backend is ready
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading

        let filteredProducts = mockProducts

        if (selectedCategory !== "all") {
          filteredProducts = filteredProducts.filter((product) =>
            product.categories.name.toLowerCase().includes(selectedCategory.toLowerCase()),
          )
        }

        if (searchQuery) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        }

        setProducts(filteredProducts)
      } catch (err) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery, selectedCategory, priceRange])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-sage-900 mb-8">Loading Products...</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-red-600">
          <h1 className="text-4xl font-bold mb-8">Error Loading Products</h1>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sage-900 mb-8">Browse Handcrafted Items</h1>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-sage-300 focus:border-terracotta-400 w-full"
            />
          </form>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] border-sage-300 focus:border-terracotta-400">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Slider */}
          <div className="w-full md:w-[250px]">
            <Label htmlFor="price-range" className="mb-2 block text-sage-700">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              id="price-range"
              min={0}
              max={200}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-sage-600 text-xl py-12">No products found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <Link href={`/products/${product.id}`} className="block relative h-60 w-full">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=400&width=400&query=product+image"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                  />
                </Link>
                <CardHeader className="p-4 pb-2 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-semibold text-sage-800 leading-tight">
                      <Link href={`/products/${product.id}`} className="hover:text-terracotta-600 transition-colors">
                        {product.name}
                      </Link>
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full text-sm"
                    >
                      {product.categories?.name || "Uncategorized"}
                    </Badge>
                  </div>
                  <p className="text-sage-600 text-sm">{product.users?.seller_name || "Unknown Seller"}</p>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <p className="text-2xl font-bold text-terracotta-600">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-sage-700 hover:bg-sage-800 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

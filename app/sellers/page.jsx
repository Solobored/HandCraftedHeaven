"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Award, Filter, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const specialties = [
  "All Specialties",
  "Ceramic Art",
  "Woodworking",
  "Fiber Arts",
  "Jewelry Making",
  "Candle Making",
  "Glass Blowing",
  "Metalworking",
  "Leather Crafting",
]

const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "rating", label: "Highest Rated" },
  { value: "sales", label: "Most Sales" },
  { value: "newest", label: "Newest Sellers" },
  { value: "products", label: "Most Products" },
]

// Mock sellers data
const mockSellers = [
  {
    id: 1,
    name: "Sarah Chen",
    shopName: "Ceramic Wonders",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Hand-thrown pottery and unique ceramic art.",
    productsCount: 45,
    location: "Portland, OR",
    rating: 4.8,
    reviewCount: 124,
    products: 45,
    sales: 230,
    verified: true,
    featured: true,
    specialty: "Ceramic Art",
    badge: "Top Seller",
    coverImage: "/placeholder.svg?height=300&width=600",
    joinedDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    shopName: "Woodland Crafts",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Rustic wooden furniture and handcrafted decor.",
    productsCount: 30,
    location: "Denver, CO",
    rating: 4.9,
    reviewCount: 89,
    products: 30,
    sales: 156,
    verified: true,
    featured: true,
    specialty: "Woodworking",
    badge: "Artisan",
    coverImage: "/placeholder.svg?height=300&width=600",
    joinedDate: "2021-08-20",
  },
  {
    id: 3,
    name: "Elena Vasquez",
    shopName: "Textile Tales",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Beautiful hand-woven textiles and custom apparel.",
    productsCount: 60,
    location: "Austin, TX",
    rating: 4.7,
    reviewCount: 203,
    products: 60,
    sales: 340,
    verified: true,
    featured: false,
    specialty: "Fiber Arts",
    badge: "Rising Star",
    coverImage: "/placeholder.svg?height=300&width=600",
    joinedDate: "2023-01-10",
  },
  {
    id: 4,
    name: "David Lee",
    shopName: "Jewel Spark",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Exquisite handmade jewelry for every occasion.",
    productsCount: 70,
    location: "Seattle, WA",
    rating: 4.6,
    reviewCount: 167,
    products: 70,
    sales: 289,
    verified: false,
    featured: false,
    specialty: "Jewelry Making",
    badge: "New Seller",
    coverImage: "/placeholder.svg?height=300&width=600",
    joinedDate: "2023-06-01",
  },
]

export default function SellersPage() {
  const [sellers, setSellers] = useState(mockSellers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Update the filteredSellers logic
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All Specialties" || seller.specialty === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  // Add sorting logic
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.rating - a.rating // Secondary sort by rating
      case "rating":
        return b.rating - a.rating
      case "sales":
        return b.sales - a.sales
      case "newest":
        return new Date(b.joinedDate || "2023-01-01") - new Date(a.joinedDate || "2023-01-01")
      case "products":
        return b.products - a.products
      default:
        return 0
    }
  })

  const featuredSellers = sortedSellers.filter((seller) => seller.featured)

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Meet Our Artisans</h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover the talented creators behind our beautiful handcrafted items and learn their unique stories
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-sage-200">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-terracotta-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sage-900">500+</div>
              <p className="text-sm text-sage-600">Active Artisans</p>
            </CardContent>
          </Card>
          <Card className="text-center border-sage-200">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-sage-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sage-900">50+</div>
              <p className="text-sm text-sage-600">Craft Specialties</p>
            </CardContent>
          </Card>
          <Card className="text-center border-sage-200">
            <CardContent className="p-6">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sage-900">4.8</div>
              <p className="text-sm text-sage-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center border-sage-200">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sage-900">10K+</div>
              <p className="text-sm text-sage-600">Happy Customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search artisans by name, shop, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-sage-300 focus:border-terracotta-400"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400 focus:ring-terracotta-400"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
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

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-sage-300 text-sage-700 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Featured Sellers */}
        {featuredSellers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sage-900 mb-6">Featured Artisans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredSellers.slice(0, 2).map((seller) => (
                <Card key={seller.id} className="overflow-hidden border-sage-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img
                        src={seller.coverImage || "/placeholder.svg"}
                        alt={`${seller.shopName} cover`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4 bg-terracotta-600 text-white p-1 rounded-full">
                        <Award className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-8 relative z-10">
                          <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                          <AvatarFallback>
                            {seller.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-sage-900">{seller.name}</h3>
                            {seller.verified && <Award className="w-4 h-4 text-terracotta-600" />}
                          </div>
                          <p className="text-terracotta-600 font-medium mb-1">{seller.shopName}</p>
                          <div className="flex items-center text-sage-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {seller.location}
                          </div>
                          <div className="flex items-center space-x-4 text-sm mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                              <span className="font-medium">{seller.rating}</span>
                              <span className="text-sage-500 ml-1">({seller.reviewCount})</span>
                            </div>
                            <span className="text-sage-600">{seller.products} products</span>
                            <span className="text-sage-600">{seller.sales} sales</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sage-600 text-sm mb-4 leading-relaxed">{seller.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs">{seller.badge}</div>
                        <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                          <Link href={`/sellers/${seller.id}`}>Visit Shop</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Sellers Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-sage-900">All Artisans</h2>
            <p className="text-sage-600">
              Showing {filteredSellers.length} of {sellers.length} artisans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSellers.map((seller) => (
              <Card key={seller.id} className="hover:shadow-lg transition-shadow duration-300 border-sage-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4 relative">
                    <Avatar className="w-20 h-20 rounded-full object-cover mx-auto">
                      <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                      <AvatarFallback>
                        {seller.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {seller.verified && (
                      <div className="absolute -top-1 -right-1 bg-terracotta-600 text-white p-1 rounded-full">
                        <Award className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <CardHeader className="p-0 text-center mb-2">
                      <CardTitle className="text-lg font-semibold text-sage-900">{seller.shopName}</CardTitle>
                      <p className="text-sage-700 text-sm">by {seller.name}</p>
                    </CardHeader>

                    <p className="text-sage-600 text-sm text-center leading-relaxed line-clamp-2">
                      {seller.description}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 bg-transparent"
                    >
                      <Link href={`/sellers/${seller.id}`}>Visit Shop</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center bg-gradient-to-br from-sage-50 to-terracotta-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">Become a Seller</h2>
          <p className="text-lg text-sage-600 mb-8 max-w-2xl mx-auto">
            Join our community of talented artisans and share your handcrafted creations with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
              <Link href="/auth/register">Start Selling Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

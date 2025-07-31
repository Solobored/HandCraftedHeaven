"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Award, Filter, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const mockSellers = [
  {
    id: 1,
    name: "Elena Rodriguez",
    shop: "Elena's Pottery Studio",
    location: "Santa Fe, NM",
    specialty: "Ceramic Art",
    rating: 4.9,
    reviewCount: 127,
    products: 47,
    sales: 340,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Creating beautiful, functional pottery inspired by southwestern traditions and modern aesthetics.",
    badge: "Featured Artisan",
    joinDate: "2019",
    featured: true,
    verified: true,
  },
  {
    id: 2,
    name: "James Chen",
    shop: "Woodcraft Creations",
    location: "Portland, OR",
    specialty: "Woodworking",
    rating: 4.8,
    reviewCount: 89,
    products: 32,
    sales: 156,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Handcrafted furniture and home accessories from sustainable, locally-sourced wood.",
    badge: "Eco-Friendly",
    joinDate: "2020",
    featured: true,
    verified: true,
  },
  {
    id: 3,
    name: "Amara Okafor",
    shop: "Textile Dreams",
    location: "Austin, TX",
    specialty: "Fiber Arts",
    rating: 5.0,
    reviewCount: 64,
    products: 28,
    sales: 98,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Vibrant textiles and weavings celebrating African heritage and contemporary design.",
    badge: "Rising Star",
    joinDate: "2021",
    featured: false,
    verified: true,
  },
  {
    id: 4,
    name: "Michael Thompson",
    shop: "Silver & Stone",
    location: "Colorado Springs, CO",
    specialty: "Jewelry Making",
    rating: 4.7,
    reviewCount: 156,
    products: 89,
    sales: 423,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Handcrafted jewelry featuring natural stones and precious metals with modern designs.",
    badge: "Top Seller",
    joinDate: "2018",
    featured: true,
    verified: true,
  },
  {
    id: 5,
    name: "Sarah Kim",
    shop: "Garden Light Candles",
    location: "Seattle, WA",
    specialty: "Candle Making",
    rating: 4.6,
    reviewCount: 203,
    products: 45,
    sales: 567,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Hand-poured soy candles with natural fragrances inspired by Pacific Northwest gardens.",
    badge: "Best Seller",
    joinDate: "2019",
    featured: false,
    verified: true,
  },
  {
    id: 6,
    name: "David Martinez",
    shop: "Desert Glass Art",
    location: "Phoenix, AZ",
    specialty: "Glass Blowing",
    rating: 4.9,
    reviewCount: 78,
    products: 23,
    sales: 134,
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=300&width=600",
    description: "Unique glass art pieces and functional items inspired by desert landscapes.",
    badge: "Master Craftsman",
    joinDate: "2017",
    featured: false,
    verified: true,
  },
]

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

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredSellers = mockSellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All Specialties" || seller.specialty === selectedSpecialty

    return matchesSearch && matchesSpecialty
  })

  const featuredSellers = filteredSellers.filter((seller) => seller.featured)

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

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-sage-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <label className="block text-sm font-medium text-sage-700 mb-2">Experience</label>
                  <select className="w-full px-3 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                    <option value="">Any Experience</option>
                    <option value="new">New (Less than 1 year)</option>
                    <option value="experienced">Experienced (1-3 years)</option>
                    <option value="veteran">Veteran (3+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">Verification</label>
                  <select className="w-full px-3 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                    <option value="">All Sellers</option>
                    <option value="verified">Verified Only</option>
                    <option value="featured">Featured Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
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
                        alt={`${seller.shop} cover`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-terracotta-600 text-white">{seller.badge}</Badge>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={seller.image || "/placeholder.svg"}
                          alt={seller.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-8 relative z-10"
                        />
                        <div className="flex-1 pt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-sage-900">{seller.name}</h3>
                            {seller.verified && <Award className="w-4 h-4 text-terracotta-600" />}
                          </div>
                          <p className="text-terracotta-600 font-medium mb-1">{seller.shop}</p>
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
                        <Badge variant="outline" className="text-xs">
                          {seller.specialty}
                        </Badge>
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
              Showing {filteredSellers.length} of {mockSellers.length} artisans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <Card key={seller.id} className="hover:shadow-lg transition-shadow duration-300 border-sage-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-3">
                      <img
                        src={seller.image || "/placeholder.svg"}
                        alt={seller.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto"
                      />
                      {seller.verified && (
                        <div className="absolute -top-1 -right-1 bg-terracotta-600 text-white p-1 rounded-full">
                          <Award className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <Badge className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      {seller.badge}
                    </Badge>

                    <h3 className="text-lg font-bold text-sage-900 mb-1">{seller.name}</h3>
                    <p className="text-terracotta-600 font-medium mb-2">{seller.shop}</p>

                    <div className="flex items-center justify-center text-sage-600 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {seller.location}
                    </div>

                    <div className="flex items-center justify-center space-x-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                        <span className="font-medium">{seller.rating}</span>
                        <span className="text-sage-500 ml-1">({seller.reviewCount})</span>
                      </div>
                      <div className="text-sage-600">{seller.products} products</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {seller.specialty}
                      </Badge>
                    </div>

                    <p className="text-sage-600 text-sm text-center leading-relaxed line-clamp-2">
                      {seller.description}
                    </p>

                    <Button
                      asChild
                      variant="outline"
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
              <Link href="/seller-guide">Learn More</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

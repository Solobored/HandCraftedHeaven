"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MapPin, Package, TrendingUp, Award, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SellersPage() {
  const [sellers, setSellers] = useState([])
  const [filteredSellers, setFilteredSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Mock sellers data with comprehensive information
  const mockSellers = [
    {
      id: "1",
      name: "Sarah Chen",
      shopName: "Ceramic Wonders",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Hand-thrown pottery and unique ceramic art, inspired by nature's forms and colors.",
      location: "Portland, Oregon",
      specialty: "Ceramics",
      rating: 4.9,
      reviewCount: 124,
      totalSales: 456,
      productsCount: 45,
      joinedDate: "2022-03-15",
      featured: true,
      verified: true,
      tags: ["Eco-friendly", "Custom Orders", "Gift Wrapping"],
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      shopName: "Woodland Crafts",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Rustic wooden furniture and handcrafted decor, bringing the warmth of the forest indoors.",
      location: "Denver, Colorado",
      specialty: "Woodworking",
      rating: 4.8,
      reviewCount: 89,
      totalSales: 234,
      productsCount: 30,
      joinedDate: "2021-08-20",
      featured: true,
      verified: true,
      tags: ["Sustainable", "Custom Furniture", "Reclaimed Wood"],
    },
    {
      id: "3",
      name: "Elena Vasquez",
      shopName: "Textile Tales",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Beautiful hand-woven textiles and custom apparel, each piece telling a unique story.",
      location: "Santa Fe, New Mexico",
      specialty: "Textiles",
      rating: 4.7,
      reviewCount: 156,
      totalSales: 678,
      productsCount: 67,
      joinedDate: "2020-11-10",
      featured: false,
      verified: true,
      tags: ["Organic Materials", "Traditional Techniques", "Custom Sizing"],
    },
    {
      id: "4",
      name: "James Mitchell",
      shopName: "Metal & Stone",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Contemporary jewelry and sculptural pieces combining precious metals with natural stones.",
      location: "Austin, Texas",
      specialty: "Jewelry",
      rating: 4.9,
      reviewCount: 203,
      totalSales: 892,
      productsCount: 78,
      joinedDate: "2019-05-22",
      featured: true,
      verified: true,
      tags: ["Precious Metals", "Custom Engagement", "Repair Services"],
    },
    {
      id: "5",
      name: "Lisa Park",
      shopName: "Garden Pottery",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Functional and decorative pottery for home and garden, made with locally sourced clay.",
      location: "Asheville, North Carolina",
      specialty: "Ceramics",
      rating: 4.6,
      reviewCount: 67,
      totalSales: 123,
      productsCount: 23,
      joinedDate: "2023-01-15",
      featured: false,
      verified: false,
      tags: ["Local Clay", "Garden Decor", "Beginner Friendly"],
    },
    {
      id: "6",
      name: "David Thompson",
      shopName: "Leather & Lace",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Premium leather goods and accessories, handcrafted using traditional techniques.",
      location: "Nashville, Tennessee",
      specialty: "Leather Goods",
      rating: 4.8,
      reviewCount: 145,
      totalSales: 345,
      productsCount: 42,
      joinedDate: "2021-12-03",
      featured: false,
      verified: true,
      tags: ["Full Grain Leather", "Personalization", "Lifetime Warranty"],
    },
  ]

  const specialties = [
    "All Specialties",
    "Ceramics",
    "Woodworking",
    "Textiles",
    "Jewelry",
    "Leather Goods",
    "Glass Art",
    "Metalwork",
  ]

  const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "rating", label: "Highest Rated" },
    { value: "sales", label: "Most Sales" },
    { value: "newest", label: "Newest Members" },
    { value: "products", label: "Most Products" },
  ]

  useEffect(() => {
    // Simulate API call
    const fetchSellers = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSellers(mockSellers)
        setFilteredSellers(mockSellers)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load sellers",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSellers()
  }, [])

  useEffect(() => {
    let filtered = [...sellers]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (seller) =>
          seller.name.toLowerCase().includes(query) ||
          seller.shopName.toLowerCase().includes(query) ||
          seller.location.toLowerCase().includes(query) ||
          seller.description.toLowerCase().includes(query),
      )
    }

    // Apply specialty filter
    if (selectedSpecialty !== "all" && selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter((seller) => seller.specialty.toLowerCase() === selectedSpecialty.toLowerCase())
    }

    // Apply sorting
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "sales":
        filtered.sort((a, b) => b.totalSales - a.totalSales)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
        break
      case "products":
        filtered.sort((a, b) => b.productsCount - a.productsCount)
        break
      default:
        break
    }

    setFilteredSellers(filtered)
  }, [sellers, searchQuery, selectedSpecialty, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-sage-900 mb-8">Loading Sellers...</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Meet Our Artisans</h1>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            Discover talented creators from around the world, each bringing their unique skills and passion to
            handcrafted goods.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search sellers, shops, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-sage-300 focus:border-terracotta-400"
              />
            </form>

            {/* Filters */}
            <div className="flex gap-4 w-full lg:w-auto">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full lg:w-[180px] border-sage-300 focus:border-terracotta-400">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.slice(1).map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[160px] border-sage-300 focus:border-terracotta-400">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sage-600">
            Showing {filteredSellers.length} of {sellers.length} sellers
            {searchQuery && ` for "${searchQuery}"`}
            {selectedSpecialty !== "all" && ` in ${selectedSpecialty}`}
          </div>
        </div>

        {/* Sellers Grid */}
        {filteredSellers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-900 mb-2">No sellers found</h3>
            <p className="text-sage-600 mb-6">Try adjusting your search criteria or browse all sellers.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedSpecialty("all")
                setSortBy("featured")
              }}
              className="bg-terracotta-600 hover:bg-terracotta-700"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSellers.map((seller) => (
              <Card
                key={seller.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-sage-200"
              >
                <CardContent className="p-6">
                  {/* Seller Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-sage-200">
                        <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                        <AvatarFallback>
                          {seller.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {seller.verified && (
                        <Award className="w-5 h-5 text-terracotta-600 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-sage-900 truncate">{seller.shopName}</h3>
                        {seller.featured && (
                          <Badge variant="outline" className="text-terracotta-600 border-terracotta-600 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sage-600 text-sm mb-2">by {seller.name}</p>

                      <div className="flex items-center gap-4 text-sm text-sage-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{seller.rating}</span>
                          <span className="ml-1">({seller.reviewCount})</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate">{seller.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialty Badge */}
                  <div className="mb-3">
                    <Badge className="bg-sage-100 text-sage-800 text-sm">{seller.specialty}</Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sage-700 text-sm mb-4 line-clamp-2">{seller.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-sage-50 rounded-lg p-3">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="w-4 h-4 text-sage-600 mr-1" />
                        <span className="text-sm font-medium text-sage-900">{seller.totalSales}</span>
                      </div>
                      <p className="text-xs text-sage-600">Sales</p>
                    </div>
                    <div className="bg-sage-50 rounded-lg p-3">
                      <div className="flex items-center justify-center mb-1">
                        <Package className="w-4 h-4 text-sage-600 mr-1" />
                        <span className="text-sm font-medium text-sage-900">{seller.productsCount}</span>
                      </div>
                      <p className="text-xs text-sage-600">Products</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {seller.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-sage-600 border-sage-300">
                        {tag}
                      </Badge>
                    ))}
                    {seller.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs text-sage-600 border-sage-300">
                        +{seller.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-terracotta-600 hover:bg-terracotta-700">
                      <Link href={`/sellers/${seller.id}`}>Visit Shop</Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent">
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border-terracotta-200 bg-terracotta-50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Want to Become a Seller?</h2>
              <p className="text-sage-600 mb-6">
                Join our community of talented artisans and start selling your handcrafted items to customers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Award, Package, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock seller data - in real app, this would come from API
const mockSellers = [
  {
    id: "1",
    name: "Sarah Chen",
    shopName: "Ceramic Wonders",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Hand-thrown pottery and unique ceramic art.",
    location: "Portland, OR",
    rating: 4.8,
    reviewCount: 124,
    products: 45,
    sales: 230,
    verified: true,
    specialty: "Ceramic Art",
    joinedDate: "2022-03-15",
    coverImage: "/placeholder.svg?height=400&width=800",
    bio: "I've been working with clay for over 15 years, creating functional and decorative pottery pieces. Each item is hand-thrown on my wheel and fired in my home studio kiln. I draw inspiration from nature and traditional Japanese pottery techniques.",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    shopName: "Woodland Crafts",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Rustic wooden furniture and handcrafted decor.",
    location: "Denver, CO",
    rating: 4.9,
    reviewCount: 89,
    products: 30,
    sales: 156,
    verified: true,
    specialty: "Woodworking",
    joinedDate: "2021-08-20",
    coverImage: "/placeholder.svg?height=400&width=800",
    bio: "Working with reclaimed and sustainable wood sources, I create unique furniture pieces and home decor. Every piece tells a story of the wood's journey and my craftsmanship.",
  },
]

export default function SellerShopPage() {
  const params = useParams()
  const router = useRouter()
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const sellerId = params.id
    const foundSeller = mockSellers.find((s) => s.id === sellerId)

    setTimeout(() => {
      setSeller(foundSeller)
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading seller information...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-sage-900 mb-4">Seller Not Found</h1>
            <Button asChild>
              <Link href="/sellers">Back to Sellers</Link>
            </Button>
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
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sellers
        </Button>

        {/* Cover Image */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={seller.coverImage || "/placeholder.svg"}
            alt={`${seller.shopName} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Seller Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6 mb-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg -mt-12 relative z-10">
                <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                <AvatarFallback>
                  {seller.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 pt-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-sage-900">{seller.shopName}</h1>
                  {seller.verified && <Award className="w-6 h-6 text-terracotta-600" />}
                </div>
                <p className="text-xl text-sage-700 mb-2">by {seller.name}</p>
                <div className="flex items-center text-sage-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {seller.location}
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium">{seller.rating}</span>
                    <span className="text-sage-500 ml-1">({seller.reviewCount} reviews)</span>
                  </div>
                  <span className="text-sage-600">{seller.products} products</span>
                  <span className="text-sage-600">{seller.sales} sales</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-sage-200 mb-6">
              <h2 className="text-xl font-semibold text-sage-900 mb-4">About {seller.name}</h2>
              <p className="text-sage-700 leading-relaxed mb-4">{seller.bio}</p>
              <div className="flex items-center text-sm text-sage-600">
                <Calendar className="w-4 h-4 mr-2" />
                Member since{" "}
                {new Date(seller.joinedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Shop Status Card */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sage-900">Shop Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">Shop Coming Soon!</h3>
                  <p className="text-sage-600 mb-4">
                    {seller.name} is still setting up their online shop. Check back soon to see their amazing products!
                  </p>
                  <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
                    Under Construction
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sage-900">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600 mb-4">
                  Interested in custom work or have questions about {seller.name}'s crafts?
                </p>
                <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700">
                  <Link href="/contact">Contact Seller</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Specialty Card */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-sage-900">Specialty</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-sage-100 text-sage-800 text-sm px-3 py-1">{seller.specialty}</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Calendar, Package, ExternalLink, Construction } from "lucide-react"
import Link from "next/link"

export default function SellerShopPage() {
  const params = useParams()
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        // Simulate API call to fetch seller data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock seller data - in real app, fetch from API
        const mockSeller = {
          id: params.id,
          name: "Sarah Johnson",
          shopName: "Sarah's Ceramics",
          bio: "Passionate ceramic artist creating unique handmade pottery pieces for over 10 years.",
          location: "Portland, Oregon",
          rating: 4.8,
          totalSales: 156,
          joinedDate: "2022-03-15",
          avatar: "/placeholder.svg?height=120&width=120",
          specialty: "Ceramics",
          hasShop: false, // This determines if they have a built shop
          website: null,
          products: [],
        }

        setSeller(mockSeller)
      } catch (error) {
        console.error("Error fetching seller:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeller()
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
            <p className="text-sage-600 mb-6">The seller you're looking for doesn't exist.</p>
            <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
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
        {/* Seller Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
              <AvatarFallback className="text-2xl">
                {seller.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-2">{seller.shopName}</h1>
              <p className="text-xl text-sage-600 mb-3">by {seller.name}</p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-sage-900">{seller.rating}</span>
                  <span className="text-sage-600 ml-1">({seller.totalSales} sales)</span>
                </div>

                <div className="flex items-center text-sage-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {seller.location}
                </div>

                <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
                  {seller.specialty}
                </Badge>
              </div>

              <p className="text-sage-700 max-w-2xl">{seller.bio}</p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Shop Status */}
        {!seller.hasShop ? (
          <Card className="border-orange-200 bg-orange-50 mb-8">
            <CardContent className="p-8 text-center">
              <Construction className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Shop Coming Soon!</h2>
              <p className="text-lg text-sage-600 mb-6 max-w-2xl mx-auto">
                {seller.name} is currently setting up their online shop. In the meantime, you can contact them directly
                for custom orders or inquiries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                  <Link href="/contact">Contact Seller</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <Link href="/sellers">Browse Other Sellers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* If shop exists, show products */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Products would be displayed here */}
            <Card className="border-sage-200">
              <CardContent className="p-6 text-center">
                <Package className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                <p className="text-sage-600">Products will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seller Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About the Seller */}
          <div className="lg:col-span-2">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">About the Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sage-700">{seller.bio}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-sage-600 mr-2" />
                      <div>
                        <p className="text-sm text-sage-600">Member since</p>
                        <p className="font-medium text-sage-900">
                          {new Date(seller.joinedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-sage-600 mr-2" />
                      <div>
                        <p className="text-sm text-sage-600">Total Sales</p>
                        <p className="font-medium text-sage-900">{seller.totalSales} items</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seller Stats */}
          <div>
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">Seller Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sage-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-sage-900">{seller.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sage-600">Total Sales</span>
                    <span className="font-medium text-sage-900">{seller.totalSales}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sage-600">Specialty</span>
                    <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
                      {seller.specialty}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sage-600">Location</span>
                    <span className="font-medium text-sage-900">{seller.location}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700">
                    <Link href="/contact">Contact Seller</Link>
                  </Button>

                  {seller.website && (
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={seller.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

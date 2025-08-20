"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock product data - in real app this would come from API
const mockProduct = {
  id: 1,
  name: "Handwoven Ceramic Bowl Set",
  seller: {
    name: "Maria's Ceramics",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    location: "Santa Fe, NM",
    joinDate: "2022",
  },
  price: 89,
  originalPrice: 120,
  rating: 4.8,
  reviewCount: 47,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  category: "Pottery & Ceramics",
  description:
    "Beautiful handwoven ceramic bowl set crafted with traditional techniques passed down through generations. Each piece is unique and tells its own story through subtle variations in color and texture.",
  features: [
    "Set of 4 bowls in varying sizes",
    "Food-safe ceramic glaze",
    "Microwave and dishwasher safe",
    "Handcrafted in Santa Fe, NM",
    "Each piece is unique",
  ],
  specifications: {
    Material: "High-fire ceramic",
    Dimensions: 'Large: 8" diameter, Small: 6" diameter',
    Weight: "3.2 lbs total",
    Care: "Dishwasher safe, avoid extreme temperature changes",
  },
  inStock: true,
  stockCount: 12,
  shippingTime: "3-5 business days",
  returnPolicy: "30-day return policy",
}

export default function ProductDetailPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`)
    // Add to cart logic here
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= mockProduct.stockCount) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-sage-600 mb-6">
          <Link href="/" className="hover:text-sage-800">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-sage-800">
            Categories
          </Link>
          <span>/</span>
          <Link href={`/categories/${mockProduct.category}`} className="hover:text-sage-800">
            {mockProduct.category}
          </Link>
          <span>/</span>
          <span className="text-sage-800">{mockProduct.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-terracotta-500" : "border-sage-200 hover:border-sage-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${mockProduct.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-terracotta-100 text-terracotta-800 mb-2">{mockProduct.category}</Badge>
              <h1 className="text-3xl font-bold text-sage-900 mb-2">{mockProduct.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(mockProduct.rating) ? "fill-amber-400 text-amber-400" : "text-sage-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-sage-700">{mockProduct.rating}</span>
                </div>
                <span className="text-sm text-sage-600">({mockProduct.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-sage-900">${mockProduct.price}</span>
                {mockProduct.originalPrice && (
                  <span className="text-xl text-sage-500 line-through">${mockProduct.originalPrice}</span>
                )}
                {mockProduct.originalPrice && (
                  <Badge className="bg-green-100 text-green-800">
                    Save ${mockProduct.originalPrice - mockProduct.price}
                  </Badge>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <Card className="border-sage-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={mockProduct.seller.avatar || "/placeholder.svg"}
                    alt={mockProduct.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sage-900">{mockProduct.seller.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-sage-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{mockProduct.seller.rating}</span>
                      <span>•</span>
                      <span>{mockProduct.seller.location}</span>
                      <span>•</span>
                      <span>Since {mockProduct.seller.joinDate}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-sage-300 text-sage-700 bg-transparent">
                    Visit Shop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-sage-700">Quantity:</span>
                <div className="flex items-center border border-sage-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-sage-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-sage-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-sage-50 transition-colors"
                    disabled={quantity >= mockProduct.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-sage-600">{mockProduct.stockCount} available</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-terracotta-600 hover:bg-terracotta-700 text-white"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-sage-300 ${isWishlisted ? "text-red-600 border-red-300" : "text-sage-700"}`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-600" : ""}`} />
                </Button>
                <Button variant="outline" size="lg" className="border-sage-300 text-sage-700 bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-sage-50 rounded-lg">
                <Truck className="w-5 h-5 text-sage-600" />
                <div>
                  <p className="text-sm font-medium text-sage-900">Free Shipping</p>
                  <p className="text-xs text-sage-600">{mockProduct.shippingTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-sage-50 rounded-lg">
                <Shield className="w-5 h-5 text-sage-600" />
                <div>
                  <p className="text-sm font-medium text-sage-900">Easy Returns</p>
                  <p className="text-xs text-sage-600">{mockProduct.returnPolicy}</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sage-900">Description</h3>
              <p className="text-sage-700 leading-relaxed">{mockProduct.description}</p>

              <div>
                <h4 className="font-medium text-sage-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="text-sm text-sage-700 flex items-center">
                      <span className="w-1.5 h-1.5 bg-terracotta-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sage-900 mb-2">Specifications:</h4>
                <dl className="grid grid-cols-1 gap-2">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-sage-600">{key}:</dt>
                      <dd className="text-sage-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

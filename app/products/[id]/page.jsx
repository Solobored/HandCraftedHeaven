"use client"

import { Separator } from "@/components/ui/separator"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, MessageCircle, ArrowLeft, Package } from "lucide-react"
import Image from "next/image"

export default function ProductDetailPage({ params }) {
  const { data: session } = useSession()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(params.id)) {
          setError("Invalid product ID")
          return
        }

        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError("Product not found")
          } else {
            setError("Failed to load product")
          }
          return
        }
        const productData = await response.json()
        setProduct(productData)

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/reviews?product_id=${params.id}`)
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json()
          setReviews(reviewsData)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        seller: product.users?.name || "Unknown Seller",
      },
      quantity,
    )

    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name} added to your cart.`,
    })
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Login Required",
        description: "Please log in to leave a review",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review",
        variant: "destructive",
      })
      return
    }

    setReviewLoading(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          seller_id: product.seller_id,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit review")
      }

      const review = await response.json()
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, comment: "" })

      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      })

      // Refresh product data to get updated rating
      const productResponse = await fetch(`/api/products/${params.id}`)
      if (productResponse.ok) {
        const updatedProduct = await productResponse.json()
        setProduct(updatedProduct)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setReviewLoading(false)
    }
  }

  const renderStars = (rating, interactive = false, size = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = interactive ? starValue <= (hoveredRating || newReview.rating) : starValue <= rating

      return (
        <Star
          key={index}
          className={`${size} ${
            isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={interactive ? () => setNewReview((prev) => ({ ...prev, rating: starValue })) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      )
    })
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading product details...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-sage-900 mb-4">Product Not Found</h1>
            <p className="text-sage-600 mb-6">{error}</p>
            <Button onClick={() => router.push("/browse")} className="bg-terracotta-600 hover:bg-terracotta-700">
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image_url || "/placeholder.svg?height=600&width=600"]
  const stock = product.stock_quantity || product.stock || 0
  const averageRating = product.average_rating || 0
  const reviewCount = product.review_count || 0
  const hasUserReviewed = reviews.some((review) => review.user_id === session?.user?.id)

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-terracotta-600" : "border-sage-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
                  {product.categories?.name || "Handcrafted"}
                </Badge>
                {stock > 0 ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-200">Out of Stock</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(averageRating)}
                  <span className="text-sm text-sage-600 ml-2">
                    ({averageRating.toFixed(1)}) • {reviewCount} reviews
                  </span>
                </div>
              </div>

              <p className="text-4xl font-bold text-terracotta-600 mb-6">${product.price.toFixed(2)}</p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-sage-900 mb-3">Description</h3>
              <p className="text-sage-700 leading-relaxed">
                {product.description || "This beautiful handcrafted item is made with care and attention to detail."}
              </p>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-sage-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stock}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-sage-600">{stock} available</span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className="flex-1 bg-terracotta-600 hover:bg-terracotta-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sage-700">
                <Package className="w-5 h-5 text-terracotta-600" />
                <span>Handcrafted with premium materials</span>
              </div>
              <div className="flex items-center gap-3 text-sage-700">
                <Shield className="w-5 h-5 text-terracotta-600" />
                <span>30-day return guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sage-700">
                <Truck className="w-5 h-5 text-terracotta-600" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>

            <Separator />

            {/* Seller Info */}
            <Card className="border-sage-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sage-900 mb-2">Sold by</h4>
                <p className="text-sage-700">{product.users?.name || "Artisan Seller"}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => router.push(`/sellers/${product.seller_id}`)}
                >
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-sage-900 mb-6">Customer Reviews</h2>

            {/* Review Summary */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sage-900 mb-2">
                      {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
                    </div>
                    <div className="flex justify-center mb-2">{renderStars(averageRating)}</div>
                    <p className="text-sage-600">
                      Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter((r) => r.rating === rating).length
                      const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0

                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm text-sage-600 w-8">{rating}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-sage-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-sage-600 w-8">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Write Review Form */}
            {session && !hasUserReviewed && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label>Rating *</Label>
                      <div className="flex items-center gap-1 mt-1">{renderStars(newReview.rating, true)}</div>
                    </div>

                    <div>
                      <Label htmlFor="comment">Your Review</Label>
                      <Textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your experience with this product..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={reviewLoading || newReview.rating === 0}
                      className="bg-terracotta-600 hover:bg-terracotta-700"
                    >
                      {reviewLoading ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No reviews yet</h3>
                    <p className="text-sage-600">Be the first to review this product!</p>
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.users?.avatar || "/placeholder.svg"} alt={review.users?.name} />
                          <AvatarFallback>
                            {review.users?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sage-900">{review.users?.name || "Anonymous"}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">{renderStars(review.rating, false, "w-4 h-4")}</div>
                                <span className="text-sm text-sage-600">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {review.comment && <p className="text-sage-700 leading-relaxed">{review.comment}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

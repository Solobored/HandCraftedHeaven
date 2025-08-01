"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { Label, Input } from "@/components/ui/input"

export default function ProductDetailPage({ params }) {
  const { id } = params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Product not found.")
          }
          throw new Error("Failed to fetch product details.")
        }
        const data = await res.json()
        setProduct(data)
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

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sage-900 mb-8">Loading Product...</h1>
        {/* Basic skeleton for loading state */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        <h1 className="text-4xl font-bold mb-8">Error</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-sage-600">
        <h1 className="text-4xl font-bold mb-8">Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image_url || "/placeholder.svg?height=500&width=500&query=product+detail+image"}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="bg-sage-50" // Add a background for contain images
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <Badge
              variant="secondary"
              className="bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full text-sm mb-2"
            >
              {product.categories?.name || "Uncategorized"}
            </Badge>
            <h1 className="text-4xl font-bold text-sage-900 mb-2">{product.name}</h1>
            <p className="text-sage-600 text-lg mb-4">by {product.users?.seller_name || "Unknown Seller"}</p>
            <p className="text-5xl font-extrabold text-terracotta-600 mb-6">${product.price.toFixed(2)}</p>

            <p className="text-sage-700 leading-relaxed mb-6">{product.description}</p>

            <Separator className="my-6 bg-sage-200" />

            <div className="flex items-center gap-4 mb-6">
              <Label htmlFor="quantity" className="text-lg text-sage-800">
                Quantity:
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.min(product.stock, Number.parseInt(e.target.value) || 1)))
                }
                className="w-24 text-center border-sage-300 focus:border-terracotta-400"
              />
              <span className="text-sage-600 text-sm">({product.stock} in stock)</span>
            </div>

            <Button
              className="w-full bg-sage-700 hover:bg-sage-800 text-white text-lg py-3"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          <Card className="mt-8 p-6 shadow-md bg-sage-50">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-semibold text-sage-900">Seller Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sage-700">
                Visit{" "}
                <Link
                  href={`/sellers/${product.seller_id}`}
                  className="text-terracotta-600 hover:underline font-medium"
                >
                  {product.users?.seller_name || "Unknown Seller"}'s Shop
                </Link>{" "}
                for more unique items.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

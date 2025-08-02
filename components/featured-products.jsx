"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=8")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    e.stopPropagation()

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock || product.stock_quantity || 10,
    }

    addToCart(cartProduct, 1)
  }

  if (loading) {
    return (
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Featured Products</h2>
            <p className="text-lg text-sage-600">Discover our handpicked selection of exceptional handcrafted items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-sage-200 animate-pulse">
                <div className="aspect-square bg-sage-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-sage-200 rounded mb-2"></div>
                  <div className="h-4 bg-sage-200 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-sage-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Featured Products</h2>
          <p className="text-lg text-sage-600">Discover our handpicked selection of exceptional handcrafted items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group border-sage-200 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=300&width=300&query=handcrafted product"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {product.categories && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-sage-700">
                        {product.categories.name}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sage-900 mb-2 line-clamp-2 group-hover:text-terracotta-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-sage-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-sage-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-sage-500">(4.0)</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-terracotta-600">${product.price.toFixed(2)}</span>
                      {product.users && <span className="text-sm text-sage-500">by {product.users.name}</span>}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-sage-300 text-sage-700 hover:bg-sage-50"
          >
            <Link href="/browse">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart } from "lucide-react"

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Handwoven Ceramic Bowl",
      seller: "Maria's Ceramics",
      price: 45,
      rating: 4.8,
      reviews: 23,
      image: "/placeholder.svg?height=300&width=300",
      category: "Pottery",
    },
    {
      id: 2,
      name: "Macrame Wall Hanging",
      seller: "Boho Crafts Co.",
      price: 32,
      rating: 4.9,
      reviews: 41,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home Decor",
    },
    {
      id: 3,
      name: "Hand-knitted Wool Scarf",
      seller: "Cozy Knits Studio",
      price: 28,
      rating: 4.7,
      reviews: 15,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Wooden Cutting Board",
      seller: "Artisan Woodworks",
      price: 55,
      rating: 5.0,
      reviews: 8,
      image: "/placeholder.svg?height=300&width=300",
      category: "Kitchen",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Featured Handcrafted Items</h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover unique pieces carefully selected from our community of talented artisans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-sage-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-sage-700"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <div className="absolute top-3 left-3 bg-terracotta-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sage-900 group-hover:text-terracotta-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-sage-600">{product.seller}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-sage-700 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-sage-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-sage-900">${product.price}</span>
                    <Button size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

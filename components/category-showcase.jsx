import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Scissors, Hammer, Sparkles, Home, Gift } from "lucide-react"
import Link from "next/link"

export default function CategoryShowcase() {
  const categories = [
    {
      id: 1,
      name: "Pottery & Ceramics",
      description: "Handthrown bowls, vases, and decorative pieces",
      icon: Palette,
      itemCount: 245,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-terracotta-100 text-terracotta-700",
    },
    {
      id: 2,
      name: "Textiles & Fiber",
      description: "Woven fabrics, knitted items, and embroidery",
      icon: Scissors,
      itemCount: 189,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-sage-100 text-sage-700",
    },
    {
      id: 3,
      name: "Woodworking",
      description: "Furniture, cutting boards, and carved sculptures",
      icon: Hammer,
      itemCount: 156,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: 4,
      name: "Jewelry & Accessories",
      description: "Handmade rings, necklaces, and unique accessories",
      icon: Sparkles,
      itemCount: 312,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 5,
      name: "Home Decor",
      description: "Candles, wall art, and decorative objects",
      icon: Home,
      itemCount: 198,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 6,
      name: "Gifts & Seasonal",
      description: "Holiday items, personalized gifts, and more",
      icon: Gift,
      itemCount: 134,
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-pink-100 text-pink-700",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted items across various artistic disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 border-sage-200 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${category.color} mb-2`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.itemCount} items</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sage-600 text-sm mb-4">{category.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                    >
                      <Link href={`/category/${category.id}`}>Browse {category.name}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

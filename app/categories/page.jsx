import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Scissors, Hammer, Sparkles, Home, Gift, Brush, Camera } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Pottery & Ceramics",
    description: "Handthrown bowls, vases, mugs, and decorative ceramic pieces crafted with traditional techniques.",
    icon: Palette,
    itemCount: 245,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-terracotta-100 text-terracotta-700",
    featured: true,
    subcategories: ["Bowls & Dishes", "Vases & Planters", "Mugs & Cups", "Decorative Items"],
  },
  {
    id: 2,
    name: "Textiles & Fiber",
    description: "Woven fabrics, knitted items, embroidery, and fiber art created with natural materials.",
    icon: Scissors,
    itemCount: 189,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-sage-100 text-sage-700",
    featured: true,
    subcategories: ["Scarves & Wraps", "Blankets & Throws", "Bags & Purses", "Wall Hangings"],
  },
  {
    id: 3,
    name: "Woodworking",
    description: "Handcrafted furniture, cutting boards, carved sculptures, and functional wood items.",
    icon: Hammer,
    itemCount: 156,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-amber-100 text-amber-700",
    featured: true,
    subcategories: ["Furniture", "Kitchen Items", "Decorative Carvings", "Toys & Games"],
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    description: "Handmade rings, necklaces, earrings, and unique accessories using precious metals and stones.",
    icon: Sparkles,
    itemCount: 312,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-purple-100 text-purple-700",
    featured: false,
    subcategories: ["Rings", "Necklaces", "Earrings", "Bracelets"],
  },
  {
    id: 5,
    name: "Home Decor",
    description: "Candles, wall art, decorative objects, and handmade items to beautify your living space.",
    icon: Home,
    itemCount: 198,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-blue-100 text-blue-700",
    featured: false,
    subcategories: ["Candles & Lighting", "Wall Art", "Mirrors", "Storage & Organization"],
  },
  {
    id: 6,
    name: "Gifts & Seasonal",
    description: "Holiday items, personalized gifts, and seasonal decorations for special occasions.",
    icon: Gift,
    itemCount: 134,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-pink-100 text-pink-700",
    featured: false,
    subcategories: ["Holiday Decor", "Personalized Items", "Baby & Kids", "Wedding Gifts"],
  },
  {
    id: 7,
    name: "Art & Paintings",
    description: "Original paintings, prints, drawings, and artistic creations by talented artists.",
    icon: Brush,
    itemCount: 87,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-green-100 text-green-700",
    featured: false,
    subcategories: ["Oil Paintings", "Watercolors", "Digital Art", "Mixed Media"],
  },
  {
    id: 8,
    name: "Photography",
    description: "Fine art photography, prints, and custom photo services from professional photographers.",
    icon: Camera,
    itemCount: 92,
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-indigo-100 text-indigo-700",
    featured: false,
    subcategories: ["Nature Photography", "Portraits", "Abstract", "Custom Prints"],
  },
]

export default function CategoriesPage() {
  const featuredCategories = categories.filter((cat) => cat.featured)
  const allCategories = categories

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Shop by Category</h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted items across various artistic disciplines and find the perfect
            piece for you
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-sage-900 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="group hover:shadow-xl transition-all duration-300 border-sage-200 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-3`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.itemCount} items available</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sage-600 text-sm mb-4 leading-relaxed">{category.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-sage-800 mb-2">Popular Subcategories:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 3).map((sub, index) => (
                            <span key={index} className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                        <Link href={`/browse?category=${encodeURIComponent(category.name)}`}>
                          Explore {category.name}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <h2 className="text-2xl font-bold text-sage-900 mb-8">All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="group hover:shadow-lg transition-shadow duration-300 border-sage-200"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-4`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>

                    <h3 className="text-lg font-semibold text-sage-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-sage-600 mb-3">{category.itemCount} items</p>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                    >
                      <Link href={`/browse?category=${encodeURIComponent(category.name)}`}>Browse</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center bg-gradient-to-br from-sage-50 to-terracotta-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-sage-600 mb-8 max-w-2xl mx-auto">
            Our artisans are always creating new pieces. Browse all products or contact us for custom orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
              <Link href="/browse">Browse All Products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
            >
              <Link href="/contact">Request Custom Order</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

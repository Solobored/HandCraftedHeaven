import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Award } from "lucide-react"

export default function SellerSpotlight() {
  const sellers = [
    {
      id: 1,
      name: "Elena Rodriguez",
      shop: "Elena's Pottery Studio",
      location: "Santa Fe, NM",
      specialty: "Ceramic Art",
      rating: 4.9,
      products: 47,
      image: "/placeholder.svg?height=200&width=200",
      description: "Creating beautiful, functional pottery inspired by southwestern traditions.",
      badge: "Featured Artisan",
    },
    {
      id: 2,
      name: "James Chen",
      shop: "Woodcraft Creations",
      location: "Portland, OR",
      specialty: "Woodworking",
      rating: 4.8,
      products: 32,
      image: "/placeholder.svg?height=200&width=200",
      description: "Handcrafted furniture and home accessories from sustainable wood.",
      badge: "Eco-Friendly",
    },
    {
      id: 3,
      name: "Amara Okafor",
      shop: "Textile Dreams",
      location: "Austin, TX",
      specialty: "Fiber Arts",
      rating: 5.0,
      products: 28,
      image: "/placeholder.svg?height=200&width=200",
      description: "Vibrant textiles and weavings celebrating African heritage.",
      badge: "Rising Star",
    },
  ]

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Meet Our Artisans</h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Get to know the talented creators behind these beautiful handcrafted pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sellers.map((seller) => (
            <Card key={seller.id} className="bg-white hover:shadow-lg transition-shadow duration-300 border-sage-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={seller.image || "/placeholder.svg"}
                      alt={seller.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                    <div className="absolute -top-2 -right-2 bg-terracotta-600 text-white p-1 rounded-full">
                      <Award className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                      {seller.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-sage-900 mb-1">{seller.name}</h3>
                  <p className="text-terracotta-600 font-medium mb-2">{seller.shop}</p>

                  <div className="flex items-center justify-center text-sage-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {seller.location}
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-medium">{seller.rating}</span>
                    </div>
                    <div className="text-sage-600">{seller.products} products</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <span className="inline-block bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium">
                      {seller.specialty}
                    </span>
                  </div>

                  <p className="text-sage-600 text-sm text-center leading-relaxed">{seller.description}</p>

                  <Button
                    variant="outline"
                    className="w-full border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 bg-transparent"
                  >
                    Visit Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
            Become a Seller
          </Button>
        </div>
      </div>
    </section>
  )
}

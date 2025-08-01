import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

async function getFeaturedSellers() {
  // In a real application, you would fetch this from your API
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers?limit=3&featured=true`);
  // if (!res.ok) {
  //   throw new Error('Failed to fetch featured sellers');
  // }
  // return res.json();

  // Mock data for demonstration
  return [
    {
      id: 1,
      name: "Sarah Chen",
      shopName: "Ceramic Wonders",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Hand-thrown pottery and unique ceramic art, inspired by nature's forms and colors.",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      shopName: "Woodland Crafts",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Rustic wooden furniture and handcrafted decor, bringing the warmth of the forest indoors.",
    },
    {
      id: 3,
      name: "Elena Vasquez",
      shopName: "Textile Tales",
      avatar: "/placeholder.svg?height=200&width=200",
      description: "Beautiful hand-woven textiles and custom apparel, each piece telling a unique story.",
    },
  ]
}

export default async function SellerSpotlight() {
  const sellers = await getFeaturedSellers()

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-sage-900 text-center mb-12">Meet Our Featured Artisans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sellers.map((seller) => (
          <Card
            key={seller.id}
            className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Avatar className="w-24 h-24 mb-4 border-2 border-terracotta-400">
              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
              <AvatarFallback>
                {seller.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardHeader className="p-0 text-center mb-2">
              <CardTitle className="text-2xl font-semibold text-sage-900">{seller.shopName}</CardTitle>
              <p className="text-sage-700 text-sm">by {seller.name}</p>
            </CardHeader>
            <CardContent className="p-0 text-center flex-1">
              <p className="text-sage-600 mb-4 line-clamp-3">{seller.description}</p>
            </CardContent>
            <Link href={`/sellers/${seller.id}`}>
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white">Visit Shop</Button>
            </Link>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/sellers">
          <Button
            variant="outline"
            className="border-2 border-sage-700 text-sage-700 hover:bg-sage-50 px-8 py-3 text-lg rounded-full bg-transparent"
          >
            View All Sellers
          </Button>
        </Link>
      </div>
    </section>
  )
}

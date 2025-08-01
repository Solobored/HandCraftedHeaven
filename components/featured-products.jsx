import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

async function getFeaturedProducts() {
  // In a real application, you would fetch this from your API
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=8&featured=true`);
  // if (!res.ok) {
  //   throw new Error('Failed to fetch featured products');
  // }
  // return res.json();

  // Mock data for demonstration
  return [
    {
      id: "prod1",
      name: "Hand-Painted Ceramic Mug",
      price: 25.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Home Decor", slug: "home-decor" },
      seller: "Artisan Ceramics",
    },
    {
      id: "prod2",
      name: "Woven Macrame Wall Hanging",
      price: 45.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Home Decor", slug: "home-decor" },
      seller: "Boho Crafts",
    },
    {
      id: "prod3",
      name: "Sterling Silver Leaf Necklace",
      price: 60.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Jewelry", slug: "jewelry" },
      seller: "Nature's Sparkle",
    },
    {
      id: "prod4",
      name: "Hand-Knitted Wool Scarf",
      price: 55.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Clothing", slug: "clothing" },
      seller: "Cozy Knits",
    },
    {
      id: "prod5",
      name: "Custom Leather Wallet",
      price: 75.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Gifts", slug: "gifts" },
      seller: "Leather & Co.",
    },
    {
      id: "prod6",
      name: "Artisan Soap Bar Set",
      price: 30.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Bath & Body", slug: "bath-body" },
      seller: "Pure Scents",
    },
    {
      id: "prod7",
      name: "Wooden Carved Animal Figurine",
      price: 35.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Art Collection", slug: "art-collection" },
      seller: "Forest Carvings",
    },
    {
      id: "prod8",
      name: "Hand-Bound Leather Journal",
      price: 40.0,
      image: "/placeholder.svg?height=400&width=400",
      category: { name: "Stationery", slug: "stationery" },
      seller: "Ink & Page",
    },
  ]
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-sage-900 text-center mb-12">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <Link href={`/products/${product.id}`} className="block relative h-60 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </Link>
            <CardHeader className="p-4 pb-2 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl font-semibold text-sage-800 leading-tight">
                  <Link href={`/products/${product.id}`} className="hover:text-terracotta-600 transition-colors">
                    {product.name}
                  </Link>
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full text-sm"
                >
                  {typeof product.category === "object" ? product.category.name : product.category}
                </Badge>
              </div>
              <p className="text-sage-600 text-sm">{product.seller}</p>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <p className="text-2xl font-bold text-terracotta-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-sage-700 hover:bg-sage-800 text-white">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/browse">
          <Button
            variant="outline"
            className="border-2 border-terracotta-600 text-terracotta-600 hover:bg-terracotta-50 px-8 py-3 text-lg rounded-full bg-transparent"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  )
}

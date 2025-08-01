import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getCategories() {
  // Mock data for demonstration
  return [
    { id: 1, name: "Art Collection", slug: "art-collection", image: "/placeholder.svg?height=200&width=300" },
    { id: 2, name: "Home Decor", slug: "home-decor", image: "/placeholder.svg?height=200&width=300" },
    { id: 3, name: "Jewelry", slug: "jewelry", image: "/placeholder.svg?height=200&width=300" },
    { id: 4, name: "Clothing", slug: "clothing", image: "/placeholder.svg?height=200&width=300" },
    { id: 5, name: "Gifts", slug: "gifts", image: "/placeholder.svg?height=200&width=300" },
    { id: 6, name: "Kitchen", slug: "kitchen", image: "/placeholder.svg?height=200&width=300" },
  ]
}

export default async function CategoriesPage() {
  const categories = await getCategories()

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

        {/* All Categories Grid */}
        <section>
          <h2 className="text-2xl font-bold text-sage-900 mb-8">All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/browse?category=${category.slug}`}>
                <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-48">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <CardTitle className="text-xl font-semibold text-sage-800">{category.name}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
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

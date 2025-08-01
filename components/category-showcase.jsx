"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const categories = [
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Beautiful handcrafted items to make your house a home",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "150+ items",
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    description: "Unique, handmade jewelry pieces that tell your story",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "200+ items",
  },
  {
    name: "Art Collection",
    slug: "art-collection",
    description: "Original artwork from talented artists worldwide",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "80+ items",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    description: "Handcrafted kitchenware for the culinary enthusiast",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "120+ items",
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Handmade clothing and accessories with character",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "90+ items",
  },
  {
    name: "Gifts",
    slug: "gifts",
    description: "Perfect handcrafted gifts for every occasion",
    image: "/placeholder.svg?height=300&width=400",
    itemCount: "180+ items",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Explore Our Categories</h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover unique handcrafted items across various categories, each piece telling its own story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.slug}
              className="group overflow-hidden border-sage-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-sage-800 px-3 py-1 rounded-full text-sm font-medium">
                    {category.itemCount}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sage-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sage-600 mb-4 leading-relaxed">{category.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-terracotta-600 hover:text-terracotta-700 font-medium group/button"
                >
                  <Link href={`/browse?category=${category.slug}`} className="flex items-center gap-2">
                    Shop {category.name}
                    <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
            <Link href="/browse">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

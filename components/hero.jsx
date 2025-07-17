import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-cream-50 to-sage-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-sage-900 leading-tight">
                Discover Authentic
                <span className="text-terracotta-600 block">Handcrafted</span>
                Masterpieces
              </h1>
              <p className="text-lg text-sage-600 leading-relaxed">
                Connect with talented artisans and discover one-of-a-kind handmade items. Support local creators while
                finding beautiful, sustainable products that tell a story.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                <Link href="/browse">
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
              >
                <Link href="/sell">Become a Seller</Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-terracotta-600" />
                </div>
                <h3 className="font-semibold text-sage-800 mb-1">Handmade</h3>
                <p className="text-sm text-sage-600">Crafted with love and attention to detail</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-semibold text-sage-800 mb-1">Secure</h3>
                <p className="text-sm text-sage-600">Safe and protected transactions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-sage-800 mb-1">Community</h3>
                <p className="text-sm text-sage-600">Supporting local artisans</p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-sage-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-900 mb-1">500+</div>
                <p className="text-sm text-sage-600">Active Artisans</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-900 mb-1">2,000+</div>
                <p className="text-sm text-sage-600">Unique Products</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-900 mb-1">10,000+</div>
                <p className="text-sm text-sage-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-terracotta-200 to-sage-200 rounded-2xl overflow-hidden">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Handcrafted pottery and artisan tools"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-terracotta-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sage-800">Sarah's Pottery</p>
                  <p className="text-sm text-sage-600">Handmade ceramics</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-semibold text-sage-800">4.9/5</p>
                  <p className="text-sm text-sage-600">1,200+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

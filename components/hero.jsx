import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative bg-sage-50 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold text-sage-900 leading-tight mb-6">
            Discover Unique <span className="text-terracotta-600">Handcrafted</span> Treasures
          </h1>
          <p className="text-lg md:text-xl text-sage-700 mb-8 max-w-lg mx-auto md:mx-0">
            Explore a curated collection of artisanal goods, made with passion and skill by independent creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/browse">
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Shop Now
              </Button>
            </Link>
            <Link href="/sellers">
              <Button
                variant="outline"
                className="border-2 border-terracotta-600 text-terracotta-600 bg-transparent hover:bg-terracotta-50 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Assortment of handcrafted items"
              layout="fill"
              objectFit="contain"
              className="rounded-full shadow-xl animate-float"
            />
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-terracotta-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sage-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-terracotta-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}

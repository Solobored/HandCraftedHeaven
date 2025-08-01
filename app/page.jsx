import Header from "@/components/header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import CategoryShowcase from "@/components/category-showcase"
import SellerSpotlight from "@/components/seller-spotlight"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategoryShowcase />
        <SellerSpotlight />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

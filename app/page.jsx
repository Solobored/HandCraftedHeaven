import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import SellerSpotlight from "@/components/seller-spotlight"
import CategoryShowcase from "@/components/category-showcase"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <Hero />
        <CategoryShowcase />
        <FeaturedProducts />
        <SellerSpotlight />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

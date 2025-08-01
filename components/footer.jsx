import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terracotta-400">Handcrafted Haven</h3>
            <p className="text-sage-300 text-sm">
              Your destination for unique, handmade goods from talented artisans around the world. Discover quality,
              creativity, and connection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terracotta-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Our Sellers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sage-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terracotta-400">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sage-300 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sage-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terracotta-400">Connect With Us</h3>
            <p className="text-sage-300 text-sm mb-4">
              Email:{" "}
              <a href="mailto:info@handcraftedhaven.com" className="hover:underline">
                info@handcraftedhaven.com
              </a>
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-8 pt-6 text-center text-sage-400 text-sm">
          &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

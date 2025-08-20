import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">HH</span>
              </div>
              <span className="text-xl font-bold">Handcrafted Haven</span>
            </div>
            <p className="text-sage-300 text-sm leading-relaxed">
              Connecting artisans with conscious consumers who appreciate the beauty and quality of handmade products.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-sage-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-sage-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-sage-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/pottery" className="text-sage-300 hover:text-white transition-colors">
                  Pottery & Ceramics
                </Link>
              </li>
              <li>
                <Link href="/categories/textiles" className="text-sage-300 hover:text-white transition-colors">
                  Textiles & Fiber
                </Link>
              </li>
              <li>
                <Link href="/categories/woodwork" className="text-sage-300 hover:text-white transition-colors">
                  Woodworking
                </Link>
              </li>
              <li>
                <Link href="/categories/jewelry" className="text-sage-300 hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/categories/home-decor" className="text-sage-300 hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-sage-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sage-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sage-300 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="text-sage-300 hover:text-white transition-colors">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sage-400" />
                <span className="text-sage-300">hello@handcraftedhaven.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sage-400" />
                <span className="text-sage-300">1-800-HANDMADE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sage-400" />
                <span className="text-sage-300">Portland, Oregon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sage-400 text-sm">© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sage-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sage-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

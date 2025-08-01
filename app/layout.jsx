import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import SessionProvider from "@/components/session-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted goods from talented artisans.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">{children}</div>
            <Toaster />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

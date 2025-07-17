import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Handcrafted Haven - Unique Handmade Treasures",
  description:
    "Discover unique handcrafted items from talented artisans. Support local creators and find beautiful, sustainable products that tell a story.",
  keywords: "handmade, artisan, crafts, handcrafted, marketplace, unique gifts, sustainable",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

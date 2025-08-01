"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-sage-50 to-terracotta-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-sage-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-sage-900 mb-2">
              Stay Connected with Handcrafted Haven
            </CardTitle>
            <p className="text-sage-600">
              Get the latest updates on new artisans, featured products, and exclusive offers delivered to your inbox.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-sage-300 focus:border-terracotta-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-sage-500 mt-4 text-center">We respect your privacy. Unsubscribe at any time.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

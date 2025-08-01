"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Chrome, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      toast({
        title: "Registration Successful",
        description: "Welcome to Handcrafted Haven! You can now sign in.",
      })

      // Redirect to dashboard instead of login
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider) => {
    setLoading(true)
    await signIn(provider, { callbackUrl: "/dashboard" })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md space-y-8 p-8 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="absolute left-4 top-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <CardTitle className="text-3xl font-bold text-sage-900">Create Your Account</CardTitle>
            <CardDescription className="mt-2 text-sage-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-terracotta-600 hover:text-terracotta-700">
                Sign in
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="mt-8 space-y-6" onSubmit={handleEmailRegister}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-2 px-4 rounded-md text-lg"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-sage-600">Or register with</div>

            <div className="mt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-sage-300 text-sage-700 hover:bg-sage-100 bg-transparent"
                onClick={() => handleOAuthLogin("google")}
                disabled={loading}
              >
                <Chrome className="w-5 h-5" />
                Sign up with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

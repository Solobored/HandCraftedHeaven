"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Chrome, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      } else {
        // Get the updated session
        const session = await getSession()

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })

        // Redirect based on user role
        if (session?.user?.role === "admin") {
          router.push("/admin")
        } else if (session?.user?.role === "seller") {
          router.push("/seller/dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider) => {
    setLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
            <CardTitle className="text-3xl font-bold text-sage-900">Sign In to Handcrafted Haven</CardTitle>
            <CardDescription className="mt-2 text-sage-600">
              Or{" "}
              <Link href="/auth/register" className="font-medium text-terracotta-600 hover:text-terracotta-700">
                create an account
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
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
                  autoComplete="current-password"
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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-sage-600">Or continue with</div>

            <div className="mt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-sage-300 text-sage-700 hover:bg-sage-100 bg-transparent"
                onClick={() => handleOAuthLogin("google")}
                disabled={loading}
              >
                <Chrome className="w-5 h-5" />
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

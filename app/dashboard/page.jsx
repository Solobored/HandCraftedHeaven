"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { User, Store, ShoppingBag, Heart, Settings, TrendingUp } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Dashboard() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)
  const [isChangingRole, setIsChangingRole] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated" && session?.user) {
      fetchUserRole()
    }
  }, [status, session, router])

  const fetchUserRole = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/user/profile?userId=${session.user.id}`)
      if (response.ok) {
        const userData = await response.json()
        setUserRole(userData.role || "buyer")
      } else {
        // If user profile doesn't exist, assume buyer
        setUserRole("buyer")
      }
    } catch (error) {
      console.error("Error fetching user role:", error)
      setUserRole("buyer")
    } finally {
      setLoading(false)
    }
  }

  const handleBecomeSellerClick = async () => {
    setIsChangingRole(true)

    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newRole: "seller",
          userId: session.user.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setUserRole("seller")

        // Update the session
        await update({
          ...session,
          user: {
            ...session.user,
            role: "seller",
          },
        })

        toast({
          title: "Success!",
          description: "You are now a seller! Redirecting to your seller dashboard...",
        })

        // Redirect to seller dashboard
        setTimeout(() => {
          router.push("/seller/dashboard")
        }, 2000)
      } else {
        throw new Error(data.error || "Failed to become seller")
      }
    } catch (error) {
      console.error("Error becoming seller:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to become seller. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChangingRole(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600 mx-auto mb-4"></div>
          <p className="text-sage-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-sage-900">Welcome back, {session?.user?.name || "User"}!</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sage-600">Your account type:</p>
                <Badge variant={userRole === "seller" ? "default" : "secondary"} className="capitalize">
                  {userRole === "seller" ? (
                    <>
                      <Store className="w-3 h-3 mr-1" />
                      Seller
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 mr-1" />
                      Buyer
                    </>
                  )}
                </Badge>
              </div>
            </div>

            {userRole === "seller" && (
              <Link href="/seller/dashboard">
                <Button className="bg-terracotta-600 hover:bg-terracotta-700">
                  <Store className="w-4 h-4 mr-2" />
                  Seller Dashboard
                </Button>
              </Link>
            )}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900">0</div>
                    <p className="text-xs text-sage-600">No orders yet</p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Favorites</CardTitle>
                    <Heart className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900">0</div>
                    <p className="text-xs text-sage-600">Items saved</p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Account Status</CardTitle>
                    <Settings className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900 capitalize">{userRole}</div>
                    <p className="text-xs text-sage-600">Active account</p>
                  </CardContent>
                </Card>
              </div>

              {/* Become Seller Section */}
              {userRole === "buyer" && (
                <Card className="border-terracotta-200 bg-terracotta-50">
                  <CardHeader>
                    <CardTitle className="text-terracotta-900 flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      Become a Seller
                    </CardTitle>
                    <CardDescription className="text-terracotta-700">
                      Start selling your handcrafted items and reach customers worldwide
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-terracotta-600 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-terracotta-900">Create Your Store</h4>
                            <p className="text-sm text-terracotta-700">
                              Set up your seller profile and showcase your products
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-terracotta-600 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-terracotta-900">Manage Orders</h4>
                            <p className="text-sm text-terracotta-700">Track sales and communicate with customers</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-terracotta-600 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-terracotta-900">Analytics Dashboard</h4>
                            <p className="text-sm text-terracotta-700">
                              Monitor your performance and grow your business
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-terracotta-600 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-terracotta-900">Community Support</h4>
                            <p className="text-sm text-terracotta-700">Join our community of artisan sellers</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleBecomeSellerClick}
                        disabled={isChangingRole}
                        className="bg-terracotta-600 hover:bg-terracotta-700"
                      >
                        {isChangingRole ? "Setting up your seller account..." : "Become a Seller"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/browser">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        <ShoppingBag className="w-6 h-6 text-sage-600" />
                        <span className="text-sm">Browse Products</span>
                      </Button>
                    </Link>

                    <Link href="/orders">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        <TrendingUp className="w-6 h-6 text-sage-600" />
                        <span className="text-sm">View Orders</span>
                      </Button>
                    </Link>

                    <Link href="/profile">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        <Settings className="w-6 h-6 text-sage-600" />
                        <span className="text-sm">Account Settings</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Your Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No orders yet</h3>
                    <p className="text-sage-600 mb-4">When you make purchases, they'll appear here.</p>
                    <Link href="/browser">
                      <Button className="bg-terracotta-600 hover:bg-terracotta-700">Start Shopping</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Your Favorites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No favorites yet</h3>
                    <p className="text-sage-600 mb-4">Save items you love to find them easily later.</p>
                    <Link href="/browser">
                      <Button className="bg-terracotta-600 hover:bg-terracotta-700">Discover Products</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sage-900 mb-2">Profile Information</h4>
                      <p className="text-sm text-sage-600 mb-4">Manage your account details and preferences.</p>
                      <Link href="/profile">
                        <Button variant="outline" className="bg-transparent border-sage-300 hover:bg-sage-50">
                          Edit Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

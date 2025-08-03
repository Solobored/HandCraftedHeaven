"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { User, Package, ShoppingCart, Heart, Settings, Store, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userRole, setUserRole] = useState("buyer")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItems: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated" && session?.user) {
      fetchUserRole()
      fetchStats()
    }
  }, [status, session, router])

  const fetchUserRole = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const userData = await response.json()
        setUserRole(userData.role || "buyer")
      }
    } catch (error) {
      console.error("Error fetching user role:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleBecomeSeller = async () => {
    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRole: "seller" }),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You are now a seller! You can start adding products.",
        })
        setUserRole("seller")
        router.push("/seller/dashboard")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update role")
      }
    } catch (error) {
      console.error("Error becoming seller:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to become a seller. Please try again.",
        variant: "destructive",
      })
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

  // Redirect sellers to seller dashboard
  if (userRole === "seller") {
    router.push("/seller/dashboard")
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-sage-900">Welcome back, {session?.user?.name}!</h1>
            <p className="text-sage-600 mt-2">Manage your account and track your activity</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {userRole}
            </Badge>
            {userRole === "buyer" && (
              <Button onClick={handleBecomeSeller} className="bg-terracotta-600 hover:bg-terracotta-700">
                <Store className="w-4 h-4 mr-2" />
                Become a Seller
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">{stats.totalOrders}</div>
                  <p className="text-xs text-sage-600">Orders placed</p>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">${stats.totalSpent}</div>
                  <p className="text-xs text-sage-600">Amount spent</p>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Favorite Items</CardTitle>
                  <Heart className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">{stats.favoriteItems}</div>
                  <p className="text-xs text-sage-600">Items saved</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/browse">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                    >
                      <Package className="w-6 h-6 text-sage-600" />
                      <span className="text-sm">Browse Products</span>
                    </Button>
                  </Link>

                  <Link href="/orders">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                    >
                      <ShoppingCart className="w-6 h-6 text-sage-600" />
                      <span className="text-sm">View Orders</span>
                    </Button>
                  </Link>

                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                    >
                      <User className="w-6 h-6 text-sage-600" />
                      <span className="text-sm">Edit Profile</span>
                    </Button>
                  </Link>

                  <Button
                    onClick={handleBecomeSeller}
                    className="w-full h-20 flex flex-col gap-2 bg-terracotta-600 hover:bg-terracotta-700"
                  >
                    <Store className="w-6 h-6" />
                    <span className="text-sm">Become Seller</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sage-900 mb-2">No recent activity</h3>
                  <p className="text-sage-600 mb-4">Start browsing products to see your activity here.</p>
                  <Link href="/browse">
                    <Button className="bg-terracotta-600 hover:bg-terracotta-700">Browse Products</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Your Orders</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sage-900 mb-2">No orders yet</h3>
                  <p className="text-sage-600 mb-4">When you place orders, they will appear here.</p>
                  <Link href="/browse">
                    <Button className="bg-terracotta-600 hover:bg-terracotta-700">Start Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Favorite Items</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sage-900 mb-2">No favorites yet</h3>
                  <p className="text-sage-600 mb-4">Save items you love to find them easily later.</p>
                  <Link href="/browse">
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
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sage-900">Account Type</h4>
                      <p className="text-sm text-sage-600">Current role: {userRole}</p>
                    </div>
                    {userRole === "buyer" && (
                      <Button
                        onClick={handleBecomeSeller}
                        size="sm"
                        className="bg-terracotta-600 hover:bg-terracotta-700"
                      >
                        Become Seller
                      </Button>
                    )}
                  </div>

                  <Link href="/profile">
                    <div className="flex items-center justify-between p-4 border border-sage-200 rounded-lg hover:bg-sage-50 cursor-pointer">
                      <div>
                        <h4 className="font-medium text-sage-900">Profile Settings</h4>
                        <p className="text-sm text-sage-600">Update your personal information</p>
                      </div>
                      <Settings className="w-5 h-5 text-sage-400" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

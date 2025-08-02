"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Heart, ShoppingBag, Settings, TrendingUp, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }

    setLoading(false)
  }, [session, status, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return

      try {
        setOrdersLoading(true)
        const response = await fetch("/api/orders")
        if (response.ok) {
          const ordersData = await response.json()
          setOrders(ordersData)
        } else {
          console.error("Failed to fetch orders")
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          title: "Error",
          description: "Failed to load orders",
          variant: "destructive",
        })
      } finally {
        setOrdersLoading(false)
      }
    }

    if (session) {
      fetchOrders()
    }
  }, [session])

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "processing":
        return <Package className="w-4 h-4 text-blue-600" />
      case "shipped":
        return <Truck className="w-4 h-4 text-purple-600" />
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userRole = session.user.role || "buyer"
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">
            Welcome back, {session.user.name?.split(" ")[0] || "User"}!
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
            <p className="text-sage-600">Here's what's happening with your account</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-600">Orders</CardTitle>
              <ShoppingBag className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-900">{orders.length}</div>
              <p className="text-xs text-sage-500">Total orders</p>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-600">Favorites</CardTitle>
              <Heart className="w-4 h-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-900">8</div>
              <p className="text-xs text-sage-500">Items saved</p>
            </CardContent>
          </Card>

          {userRole === "seller" && (
            <>
              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Products</CardTitle>
                  <Package className="w-4 h-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">24</div>
                  <p className="text-xs text-sage-500">Active listings</p>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Revenue</CardTitle>
                  <TrendingUp className="w-4 h-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">$1,234</div>
                  <p className="text-xs text-sage-500">This month</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-sage-900">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="text-center py-4">Loading orders...</div>
                  ) : recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sage-900">Order #{order.id.slice(-8)}</p>
                            <p className="text-sm text-sage-600">${order.total_amount.toFixed(2)}</p>
                            <p className="text-xs text-sage-500">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-sage-600">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-sage-300" />
                      <p>No orders yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-sage-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700">
                      <Link href="/browse">Browse Products</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/favorites">View Favorites</Link>
                    </Button>
                    {userRole === "seller" && (
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href="/seller/dashboard">Seller Dashboard</Link>
                      </Button>
                    )}
                    {userRole === "buyer" && (
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href="/auth/register?role=seller">Become a Seller</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">Loading orders...</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-sage-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-sage-900">Order #{order.id.slice(-8)}</h3>
                            <p className="text-sm text-sage-600">
                              Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.order_items?.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 bg-sage-50 rounded">
                              <div className="w-12 h-12 bg-sage-200 rounded flex items-center justify-center">
                                <Package className="w-6 h-6 text-sage-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sage-900">{item.products?.name || "Product"}</p>
                                <p className="text-sm text-sage-600">
                                  Quantity: {item.quantity} × ${item.unit_price.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-medium text-sage-900">${item.total_price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-sage-200">
                          <p className="text-lg font-semibold text-sage-900">Total: ${order.total_amount.toFixed(2)}</p>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sage-600">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-sage-300" />
                    <p>Your order history will appear here</p>
                    <Button asChild className="mt-4 bg-terracotta-600 hover:bg-terracotta-700">
                      <Link href="/browse">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Name</label>
                    <p className="text-sage-900">{session.user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Email</label>
                    <p className="text-sage-900">{session.user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Role</label>
                    <Badge variant="outline" className="text-terracotta-600 border-terracotta-600">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </Badge>
                  </div>
                  <Button asChild variant="outline" className="bg-transparent">
                    <Link href="/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

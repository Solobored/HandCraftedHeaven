"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Package, Clock, CheckCircle, XCircle, Truck, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }

    fetchOrders()
  }, [session, status, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
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

  const recentOrders = orders.slice(0, 3)
  const allOrders = orders

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading orders...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Order History</h1>
          <p className="text-lg text-sage-600">Track your orders and view purchase history</p>
        </div>

        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="recent">Recent Orders</TabsTrigger>
            <TabsTrigger value="all">All Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <div className="space-y-6">
              {recentOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-sage-900 mb-2">No Recent Orders</h3>
                    <p className="text-sage-600 mb-6">You haven't placed any orders recently.</p>
                    <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                      <a href="/browse">Start Shopping</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                recentOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    getStatusIcon={getStatusIcon}
                    getStatusColor={getStatusColor}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-6">
              {allOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-sage-900 mb-2">No Orders Found</h3>
                    <p className="text-sage-600 mb-6">You haven't placed any orders yet.</p>
                    <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                      <a href="/browse">Start Shopping</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                allOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    getStatusIcon={getStatusIcon}
                    getStatusColor={getStatusColor}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

function OrderCard({ order, getStatusIcon, getStatusColor }) {
  return (
    <Card className="border-sage-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-sage-900">Order #{order.id.slice(0, 8)}</CardTitle>
            <p className="text-sm text-sage-600">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} capitalize flex items-center gap-1`}>
            {getStatusIcon(order.status)}
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.order_items?.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-sage-50 rounded-lg">
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white">
                  <Image
                    src={
                      item.product?.image_url ||
                      item.product?.images?.[0] ||
                      "/placeholder.svg?height=48&width=48&query=product"
                    }
                    alt={item.product?.name || "Product"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sage-900">{item.product?.name || "Product"}</h4>
                  <p className="text-sm text-sage-600">
                    Quantity: {item.quantity} × ${item.unit_price?.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sage-900">${item.total_price?.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-sage-600">
                {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? "s" : ""}
              </p>
              {order.tracking_number && (
                <p className="text-sm text-sage-600">
                  Tracking: <span className="font-mono">{order.tracking_number}</span>
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-sage-900">${order.total_amount?.toFixed(2)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              View Details
            </Button>
            {order.status === "delivered" && (
              <Button variant="outline" size="sm" className="bg-transparent">
                Leave Review
              </Button>
            )}
            {(order.status === "pending" || order.status === "processing") && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

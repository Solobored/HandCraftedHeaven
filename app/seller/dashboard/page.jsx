"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Plus, Package, DollarSign, TrendingUp, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SellerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  })
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated" && session?.user) {
      fetchSellerData()
    }
  }, [status, session, router])

  const fetchSellerData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchProducts(), fetchCategories(), fetchStats()])
    } catch (error) {
      console.error("Error fetching seller data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?seller_id=${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/seller/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Product added successfully.",
        })
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          image_url: "",
          category_id: "",
        })
        setShowAddForm(false)
        fetchProducts() // Refresh products list
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add product")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600 mx-auto mb-4"></div>
          <p className="text-sage-600">Loading your seller dashboard...</p>
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
              <h1 className="text-3xl font-bold text-sage-900">Seller Dashboard</h1>
              <p className="text-sage-600 mt-2">Manage your products and track your sales</p>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-terracotta-600 hover:bg-terracotta-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <Card className="mb-8 border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Add New Product</CardTitle>
                <CardDescription>Fill in the details to add a new product to your store</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sage-700">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-sage-700">
                        Price ($)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock" className="text-sage-700">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="0"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-sage-700">
                        Category
                      </Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => handleInputChange("category_id", value)}
                      >
                        <SelectTrigger className="bg-transparent border-sage-300 focus:border-terracotta-500">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sage-700">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="bg-transparent border-sage-300 focus:border-terracotta-500"
                      placeholder="Describe your product..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image_url" className="text-sage-700">
                      Image URL (optional)
                    </Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange("image_url", e.target.value)}
                      className="bg-transparent border-sage-300 focus:border-terracotta-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="bg-terracotta-600 hover:bg-terracotta-700">
                      {isSubmitting ? "Adding Product..." : "Add Product"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="bg-transparent border-sage-300 hover:bg-sage-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900">{products.length}</div>
                    <p className="text-xs text-sage-600">Active listings</p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Total Sales</CardTitle>
                    <TrendingUp className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900">{stats.totalSales}</div>
                    <p className="text-xs text-sage-600">Items sold</p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sage-600">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-sage-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-900">${stats.totalRevenue}</div>
                    <p className="text-xs text-sage-600">Total earned</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="h-20 flex flex-col gap-2 bg-terracotta-600 hover:bg-terracotta-700"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-sm">Add New Product</span>
                    </Button>

                    <Link href="/seller/orders">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        <Package className="w-6 h-6 text-sage-600" />
                        <span className="text-sm">Manage Orders</span>
                      </Button>
                    </Link>

                    <Link href="/profile">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col gap-2 bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        <TrendingUp className="w-6 h-6 text-sage-600" />
                        <span className="text-sm">View Analytics</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-sage-900">Your Products</h2>
                <Button onClick={() => setShowAddForm(true)} className="bg-terracotta-600 hover:bg-terracotta-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>

              {products.length === 0 ? (
                <Card className="border-sage-200">
                  <CardContent className="text-center py-12">
                    <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No products yet</h3>
                    <p className="text-sage-600 mb-4">Start by adding your first product to your store.</p>
                    <Button onClick={() => setShowAddForm(true)} className="bg-terracotta-600 hover:bg-terracotta-700">
                      Add Your First Product
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="border-sage-200">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-sage-100 rounded-lg mb-4 overflow-hidden">
                          <img
                            src={product.image_url || "/placeholder.svg?height=200&width=200&query=product"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-sage-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-sage-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-terracotta-600">${product.price}</span>
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No orders yet</h3>
                    <p className="text-sage-600">Orders for your products will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-sage-900">Analytics</h2>
                <Button onClick={() => setShowAddForm(true)} className="bg-terracotta-600 hover:bg-terracotta-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>

              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">Analytics coming soon</h3>
                    <p className="text-sage-600">Detailed analytics and insights will be available here.</p>
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

"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Package, TrendingUp, Store } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { toast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSellers: 0,
    totalOrders: 0,
  })
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [sellers, setSellers] = useState([])
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    seller_id: "",
    image_url: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated") {
      if (session?.user?.role !== "admin") {
        router.push("/dashboard")
        return
      }
      fetchAdminData()
    }
  }, [status, session, router])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchStats(), fetchUsers(), fetchProducts(), fetchCategories(), fetchSellers()])
    } catch (error) {
      console.error("Error fetching admin data:", error)
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

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data || [])
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data || [])
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
        setCategories(data || [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchSellers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        const sellersOnly = data.filter((user) => user.role === "seller")
        setSellers(sellersOnly || [])
      }
    } catch (error) {
      console.error("Error fetching sellers:", error)
    }
  }

  const handleProductInputChange = (field, value) => {
    setProductFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productFormData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Product added successfully.",
        })

        // Reset form and refresh data
        setProductFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category_id: "",
          seller_id: "",
          image_url: "",
        })
        setShowAddProductForm(false)
        fetchProducts()
        fetchStats()
      } else {
        throw new Error(data.error || "Failed to add product")
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
          <p className="text-sage-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-sage-900">Admin Dashboard</h1>
              <p className="text-sage-600 mt-2">Manage your marketplace</p>
            </div>
            <Button
              onClick={() => setShowAddProductForm(!showAddProductForm)}
              className="bg-terracotta-600 hover:bg-terracotta-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Add Product Form */}
          {showAddProductForm && (
            <Card className="border-sage-200 mb-8">
              <CardHeader>
                <CardTitle className="text-sage-900">Add New Product</CardTitle>
                <CardDescription>Create a new product listing for any seller</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sage-700">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={productFormData.name}
                        onChange={(e) => handleProductInputChange("name", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sage-700">
                        Price ($)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={productFormData.price}
                        onChange={(e) => handleProductInputChange("price", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock" className="text-sage-700">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={productFormData.stock}
                        onChange={(e) => handleProductInputChange("stock", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sage-700">
                        Category
                      </Label>
                      <Select
                        value={productFormData.category_id}
                        onValueChange={(value) => handleProductInputChange("category_id", value)}
                      >
                        <SelectTrigger className="bg-transparent border-sage-300 focus:border-terracotta-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seller" className="text-sage-700">
                        Seller
                      </Label>
                      <Select
                        value={productFormData.seller_id}
                        onValueChange={(value) => handleProductInputChange("seller_id", value)}
                      >
                        <SelectTrigger className="bg-transparent border-sage-300 focus:border-terracotta-500">
                          <SelectValue placeholder="Select seller" />
                        </SelectTrigger>
                        <SelectContent>
                          {sellers.map((seller) => (
                            <SelectItem key={seller.id} value={seller.id}>
                              {seller.seller_name || seller.full_name || seller.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url" className="text-sage-700">
                        Image URL (optional)
                      </Label>
                      <Input
                        id="image_url"
                        type="url"
                        value={productFormData.image_url}
                        onChange={(e) => handleProductInputChange("image_url", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sage-700">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={productFormData.description}
                      onChange={(e) => handleProductInputChange("description", e.target.value)}
                      className="bg-transparent border-sage-300 focus:border-terracotta-500"
                      placeholder="Describe the product..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="bg-terracotta-600 hover:bg-terracotta-700">
                      {isSubmitting ? "Adding Product..." : "Add Product"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddProductForm(false)}
                      className="bg-transparent border-sage-300 hover:bg-sage-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-sage-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sage-600">Total Users</CardTitle>
                <Users className="h-4 w-4 text-sage-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sage-900">{stats.totalUsers}</div>
                <p className="text-xs text-sage-600">Registered users</p>
              </CardContent>
            </Card>

            <Card className="border-sage-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sage-600">Total Products</CardTitle>
                <Package className="h-4 w-4 text-sage-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sage-900">{stats.totalProducts}</div>
                <p className="text-xs text-sage-600">Listed products</p>
              </CardContent>
            </Card>

            <Card className="border-sage-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sage-600">Total Sellers</CardTitle>
                <Store className="h-4 w-4 text-sage-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sage-900">{stats.totalSellers}</div>
                <p className="text-xs text-sage-600">Active sellers</p>
              </CardContent>
            </Card>

            <Card className="border-sage-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sage-600">Total Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-sage-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sage-900">{stats.totalOrders}</div>
                <p className="text-xs text-sage-600">Orders placed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">User Management</CardTitle>
                  <CardDescription>Manage registered users and their roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 10).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-sage-200 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-sage-900">{user.full_name || user.name}</h4>
                          <p className="text-sm text-sage-600">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              user.role === "admin" ? "default" : user.role === "seller" ? "secondary" : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                          <span className="text-xs text-sage-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Product Management</CardTitle>
                  <CardDescription>Manage all products in the marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.slice(0, 9).map((product) => (
                      <div key={product.id} className="border border-sage-200 rounded-lg p-4">
                        <div className="aspect-square bg-sage-100 rounded-lg mb-3 overflow-hidden">
                          <img
                            src={product.image_url || "/placeholder.svg?height=150&width=150&query=product"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-sage-900 mb-1 line-clamp-1">{product.name}</h4>
                        <p className="text-sm text-sage-600 mb-2">${Number.parseFloat(product.price).toFixed(2)}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </Badge>
                          <span className="text-xs text-sage-500">{product.users?.seller_name || "Unknown"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Order Management</CardTitle>
                  <CardDescription>View and manage all orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No orders yet</h3>
                    <p className="text-sage-600">Orders will appear here when customers make purchases.</p>
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

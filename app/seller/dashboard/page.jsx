"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Package, Plus, Edit, Trash2, DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function SellerDashboard() {
  const { data: session, status } = useSession()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  })

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts()
      fetchCategories()
      fetchStats()
    }
  }, [status])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products?seller_id=${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } else {
        throw new Error("Failed to fetch products")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load your products.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Product name is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.price || isNaN(formData.price) || Number.parseFloat(formData.price) < 0) {
      errors.price = "Price must be a positive number"
    }

    if (!formData.stock || isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
      errors.stock = "Stock must be a positive number"
    }

    if (!formData.category_id) {
      errors.category_id = "Category is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const method = editingProduct ? "PUT" : "POST"
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Product ${editingProduct ? "updated" : "created"} successfully!`,
        })
        resetForm()
        fetchProducts()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image_url: product.image_url || "",
      category_id: product.category_id,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        })
        fetchProducts()
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
      category_id: "",
    })
    setFormErrors({})
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">Please log in to access the seller dashboard.</div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-sage-900">Seller Dashboard</h1>
            <p className="text-sage-600 mt-2">Manage your products and track your sales</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-terracotta-600 hover:bg-terracotta-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">{products.length}</div>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Total Sales</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">{stats.totalSales}</div>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">${stats.totalRevenue}</div>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sage-600">Customers</CardTitle>
                  <Users className="h-4 w-4 text-sage-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-900">{stats.totalCustomers}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Products */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 bg-sage-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image_url || "/placeholder.svg?height=48&width=48&query=product"}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sage-900">{product.name}</h4>
                        <p className="text-sm text-sage-600">${product.price.toFixed(2)}</p>
                      </div>
                      <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Add/Edit Product Form */}
            {showAddForm && (
              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`bg-transparent border-sage-300 focus:border-terracotta-500 ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Enter product name"
                        />
                        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) => handleInputChange("category_id", value)}
                        >
                          <SelectTrigger
                            className={`bg-transparent border-sage-300 focus:border-terracotta-500 ${
                              formErrors.category_id ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.category_id && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.category_id}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          className={`bg-transparent border-sage-300 focus:border-terracotta-500 ${
                            formErrors.price ? "border-red-500" : ""
                          }`}
                          placeholder="0.00"
                        />
                        {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
                      </div>

                      <div>
                        <Label htmlFor="stock">Stock Quantity *</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={(e) => handleInputChange("stock", e.target.value)}
                          className={`bg-transparent border-sage-300 focus:border-terracotta-500 ${
                            formErrors.stock ? "border-red-500" : ""
                          }`}
                          placeholder="0"
                        />
                        {formErrors.stock && <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className={`bg-transparent border-sage-300 focus:border-terracotta-500 ${
                          formErrors.description ? "border-red-500" : ""
                        }`}
                        placeholder="Describe your product..."
                        rows={3}
                      />
                      {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                    </div>

                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => handleInputChange("image_url", e.target.value)}
                        className="bg-transparent border-sage-300 focus:border-terracotta-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="bg-terracotta-600 hover:bg-terracotta-700">
                        {editingProduct ? "Update Product" : "Create Product"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="bg-transparent border-sage-300 hover:bg-sage-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products Table */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Your Products</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-sage-900 mb-2">No products yet</h3>
                    <p className="text-sage-600 mb-4">Start by adding your first product to your store.</p>
                    <Button onClick={() => setShowAddForm(true)} className="bg-terracotta-600 hover:bg-terracotta-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="relative w-10 h-10 bg-sage-100 rounded-lg overflow-hidden">
                                <Image
                                  src={product.image_url || "/placeholder.svg?height=40&width=40&query=product"}
                                  alt={product.name}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-sage-900">{product.name}</div>
                                <div className="text-sm text-sage-600 truncate max-w-xs">{product.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{product.category_name || "Uncategorized"}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={product.stock > 0 ? "default" : "destructive"}>{product.stock}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                              {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(product)}
                                className="bg-transparent border-sage-300 hover:bg-sage-50"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(product.id)}
                                className="bg-transparent border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Sales Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-sage-900 mb-2">Analytics Coming Soon</h3>
                  <p className="text-sage-600">
                    Detailed analytics and insights about your sales performance will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

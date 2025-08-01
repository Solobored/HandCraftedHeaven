"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Edit, Trash2 } from "lucide-react"

export default function SellerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  })
  const [editingProduct, setEditingProduct] = useState(null) // State to hold product being edited

  useEffect(() => {
    if (status === "loading") return // Do nothing while session is loading

    if (!session || (session.user.role !== "seller" && session.user.role !== "admin")) {
      router.push("/auth/login") // Redirect to login if not seller or admin
      toast({
        title: "Unauthorized",
        description: "You do not have permission to access the seller dashboard.",
        variant: "destructive",
      })
      return
    }

    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await fetch("/api/categories")
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories")
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)

        // Fetch products for the current seller
        const productsRes = await fetch(`/api/products?seller_id=${session.user.id}`)
        if (!productsRes.ok) throw new Error("Failed to fetch products")
        const productsData = await productsRes.json()
        setProducts(productsData)
      } catch (err) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session, status, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setNewProduct((prev) => ({ ...prev, category_id: value }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
        seller_id: session.user.id,
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to add product")
      }

      const addedProduct = await res.json()
      setProducts((prev) => [...prev, addedProduct])
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category_id: "",
      })
      toast({
        title: "Success",
        description: "Product added successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (product) => {
    setEditingProduct({
      ...product,
      price: product.price.toString(), // Convert to string for input field
      stock: product.stock.toString(), // Convert to string for input field
      category_id: product.category_id || "", // Ensure category_id is set
    })
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const productData = {
        ...editingProduct,
        price: Number.parseFloat(editingProduct.price),
        stock: Number.parseInt(editingProduct.stock),
      }

      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to update product")
      }

      const updatedProduct = await res.json()
      setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
      setEditingProduct(null) // Clear editing state
      toast({
        title: "Success",
        description: "Product updated successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setLoading(true)
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to delete product")
      }

      setProducts(products.filter((p) => p.id !== productId))
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sage-900 mb-8">Loading Seller Dashboard...</h1>
        {/* Add a loading skeleton here if desired */}
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        <h1 className="text-4xl font-bold mb-8">Error Loading Dashboard</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-sage-900 mb-8">Seller Dashboard</h1>

      <Tabs defaultValue="my-products" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="my-products">My Products</TabsTrigger>
          <TabsTrigger value="add-product">Add New Product</TabsTrigger>
          {/* Add other tabs like "Orders" or "Analytics" later */}
        </TabsList>

        <TabsContent value="my-products" className="mt-6">
          <h2 className="text-2xl font-bold text-sage-900 mb-4">Your Products</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-sage-600">
                      You haven't added any products yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.categories?.name || "N/A"}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-transparent"
                          onClick={() => handleEditClick(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {editingProduct && (
            <Card className="mt-8 p-6 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-sage-900">Edit Product: {editingProduct.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      value={editingProduct.description || ""}
                      onChange={(e) => setEditingProduct((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-price">Price</Label>
                      <Input
                        id="edit-price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct((prev) => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-stock">Stock</Label>
                      <Input
                        id="edit-stock"
                        name="stock"
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct((prev) => ({ ...prev, stock: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-image_url">Image URL</Label>
                    <Input
                      id="edit-image_url"
                      name="image_url"
                      type="url"
                      value={editingProduct.image_url || ""}
                      onChange={(e) => setEditingProduct((prev) => ({ ...prev, image_url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingProduct.category_id}
                      onValueChange={(value) => setEditingProduct((prev) => ({ ...prev, category_id: value }))}
                    >
                      <SelectTrigger id="edit-category">
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
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Updating..." : "Update Product"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add-product" className="mt-6">
          <h2 className="text-2xl font-bold text-sage-900 mb-4">Add New Product</h2>
          <Card className="p-6 shadow-lg">
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={newProduct.image_url}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category_id} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category">
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
                <Button
                  type="submit"
                  className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Adding Product..." : "Add Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

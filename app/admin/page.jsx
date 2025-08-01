"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (status === "loading") return // Do nothing while session is loading

    if (!session || session.user.role !== "admin") {
      router.push("/auth/login") // Redirect to login if not admin
      toast({
        title: "Unauthorized",
        description: "You do not have permission to access the admin panel.",
        variant: "destructive",
      })
      return
    }

    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await fetch("/api/admin/stats")
        if (!statsRes.ok) throw new Error("Failed to fetch stats")
        const statsData = await statsRes.json()
        setStats(statsData)

        // Fetch users
        const usersRes = await fetch("/api/admin/users")
        if (!usersRes.ok) throw new Error("Failed to fetch users")
        const usersData = await usersRes.json()
        setUsers(usersData)

        // Fetch products
        const productsRes = await fetch("/api/products")
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

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete product")

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
    }
  }

  const handleEditProduct = (productId) => {
    router.push(`/seller/dashboard/edit-product/${productId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sage-900 mb-8">Loading Admin Panel...</h1>
        {/* You can add a more sophisticated loading skeleton here */}
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        <h1 className="text-4xl font-bold mb-8">Error Loading Admin Panel</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-sage-600">Manage users, products, and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-900">{stats?.totalUsers || 0}</div>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-900">{stats?.totalProducts || 0}</div>
            </CardContent>
          </Card>

          <Card className="border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-600">Total Sales (Mock)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-900">${(stats?.totalSales || 0).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="site-settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales (Mock)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(stats?.totalSales || 0).toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <h2 className="text-2xl font-bold text-sage-900 mb-4">User Management</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {/* Add user actions here, e.g., change role, delete user */}
                        <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <h2 className="text-2xl font-bold text-sage-900 mb-4">Product Management</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.users?.seller_name || "N/A"}</TableCell>
                      <TableCell>{product.categories?.name || "N/A"}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-transparent"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="site-settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-semibold">Site Configuration</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="Handcrafted Haven" />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      defaultValue="Discover unique handcrafted goods from talented artisans."
                    />
                  </div>
                  <Button className="bg-terracotta-600 hover:bg-terracotta-700">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-semibold">Featured Content</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <Label>Featured Categories</Label>
                    <div className="space-y-2 mt-2">
                      {["Home Decor", "Jewelry", "Art Collection"].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button className="bg-terracotta-600 hover:bg-terracotta-700">Update Featured</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

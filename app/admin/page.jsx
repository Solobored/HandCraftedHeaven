"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Package, DollarSign, TrendingUp, Search, Eye, Edit, Trash2, UserX, AlertTriangle } from "lucide-react"

const mockStats = {
  totalUsers: 1247,
  totalProducts: 3456,
  totalSales: 89234,
  monthlyRevenue: 45678,
  pendingOrders: 23,
  reportedItems: 5,
}

const mockUsers = [
  {
    id: 1,
    name: "Maria Rodriguez",
    email: "maria@ceramics.com",
    type: "Seller",
    status: "Active",
    joinDate: "2023-01-15",
    totalSales: 234,
    revenue: 12450,
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@email.com",
    type: "Buyer",
    status: "Active",
    joinDate: "2023-03-22",
    totalOrders: 15,
    spent: 890,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@woodworks.com",
    type: "Seller",
    status: "Pending",
    joinDate: "2024-01-10",
    totalSales: 12,
    revenue: 650,
  },
]

const mockProducts = [
  {
    id: 1,
    name: "Handwoven Ceramic Bowl Set",
    seller: "Maria's Ceramics",
    category: "Pottery & Ceramics",
    price: 89,
    status: "Active",
    sales: 47,
    revenue: 4183,
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    name: "Macrame Wall Hanging",
    seller: "Boho Crafts Co.",
    category: "Home Decor",
    price: 65,
    status: "Active",
    sales: 32,
    revenue: 2080,
    dateAdded: "2024-01-20",
  },
  {
    id: 3,
    name: "Vintage Leather Wallet",
    seller: "Craft Corner",
    category: "Accessories",
    price: 45,
    status: "Reported",
    sales: 8,
    revenue: 360,
    dateAdded: "2024-01-18",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const StatCard = ({ title, value, icon: Icon, trend, color = "text-sage-900" }) => (
    <Card className="border-sage-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sage-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-sage-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isActive ? "bg-terracotta-600 text-white" : "text-sage-700 hover:bg-sage-100"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-sage-600">Manage users, products, and monitor platform performance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg border border-sage-200">
          <TabButton id="overview" label="Overview" isActive={activeTab === "overview"} onClick={setActiveTab} />
          <TabButton id="users" label="Users" isActive={activeTab === "users"} onClick={setActiveTab} />
          <TabButton id="products" label="Products" isActive={activeTab === "products"} onClick={setActiveTab} />
          <TabButton id="orders" label="Orders" isActive={activeTab === "orders"} onClick={setActiveTab} />
          <TabButton id="reports" label="Reports" isActive={activeTab === "reports"} onClick={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={mockStats.totalUsers.toLocaleString()}
                icon={Users}
                trend="+12% this month"
              />
              <StatCard
                title="Total Products"
                value={mockStats.totalProducts.toLocaleString()}
                icon={Package}
                trend="+8% this month"
              />
              <StatCard
                title="Monthly Revenue"
                value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
                icon={DollarSign}
                trend="+15% this month"
                color="text-green-600"
              />
              <StatCard
                title="Total Sales"
                value={mockStats.totalSales.toLocaleString()}
                icon={TrendingUp}
                trend="+23% this month"
              />
            </div>

            {/* Alert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-amber-700">• {mockStats.pendingOrders} orders awaiting approval</p>
                    <p className="text-sm text-amber-700">• 3 seller applications pending review</p>
                    <p className="text-sm text-amber-700">• {mockStats.reportedItems} reported items need attention</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sage-200">
                <CardHeader>
                  <CardTitle className="text-sage-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                    Review Pending Sellers
                  </Button>
                  <Button variant="outline" className="w-full border-sage-300 text-sage-700 bg-transparent">
                    Export Monthly Report
                  </Button>
                  <Button variant="outline" className="w-full border-sage-300 text-sage-700 bg-transparent">
                    Manage Categories
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-sage-300 focus:border-terracotta-400"
                  />
                </div>
                <select className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                  <option value="">All User Types</option>
                  <option value="buyer">Buyers</option>
                  <option value="seller">Sellers</option>
                </select>
                <select className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sage-200">
                        <th className="text-left py-3 px-4 font-medium text-sage-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Join Date</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Activity</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b border-sage-100 hover:bg-sage-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sage-900">{user.name}</p>
                              <p className="text-sm text-sage-600">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={user.type === "Seller" ? "default" : "secondary"}>{user.type}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={user.status === "Active" ? "default" : "secondary"}
                              className={user.status === "Active" ? "bg-green-100 text-green-800" : ""}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-sage-600">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-sage-600">
                            {user.type === "Seller" ? (
                              <div>
                                <p>{user.totalSales} sales</p>
                                <p>${user.revenue} revenue</p>
                              </div>
                            ) : (
                              <div>
                                <p>{user.totalOrders} orders</p>
                                <p>${user.spent} spent</p>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <UserX className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 border-sage-300 focus:border-terracotta-400"
                  />
                </div>
                <select className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                  <option value="">All Categories</option>
                  <option value="pottery">Pottery & Ceramics</option>
                  <option value="textiles">Textiles & Fiber</option>
                  <option value="woodworking">Woodworking</option>
                </select>
                <select className="px-4 py-2 border border-sage-300 rounded-md focus:border-terracotta-400">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="reported">Reported</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sage-200">
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Seller</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Performance</th>
                        <th className="text-left py-3 px-4 font-medium text-sage-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-b border-sage-100 hover:bg-sage-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-sage-900">{product.name}</p>
                            <p className="text-sm text-sage-600">
                              Added {new Date(product.dateAdded).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="py-3 px-4 text-sm text-sage-600">{product.seller}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{product.category}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium text-sage-900">${product.price}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={product.status === "Active" ? "default" : "secondary"}
                              className={
                                product.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : product.status === "Reported"
                                    ? "bg-red-100 text-red-800"
                                    : ""
                              }
                            >
                              {product.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-sage-600">
                            <div>
                              <p>{product.sales} sales</p>
                              <p>${product.revenue} revenue</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === "orders" || activeTab === "reports") && (
          <Card className="border-sage-200">
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-sage-900 mb-2">
                {activeTab === "orders" ? "Orders Management" : "Reports & Analytics"}
              </h3>
              <p className="text-sage-600 mb-4">
                {activeTab === "orders"
                  ? "Order management functionality will be implemented here."
                  : "Advanced reporting and analytics features will be available here."}
              </p>
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white">Coming Soon</Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}

"use client"

import * as React from "react"
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  Package,
  FileText,
  AlertCircle,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const [userSearch, setUserSearch] = React.useState("")
  const [productSearch, setProductSearch] = React.useState("")

  // Dummy Data for Admin Dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1% from last month",
      icon: Users,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19% from last month",
      icon: CreditCard,
    },
    {
      title: "Active Now",
      value: "+573",
      change: "+201 since last hour",
      icon: Activity,
    },
  ]

  const recentSales = [
    {
      customer: "Olivia Martin",
      email: "olivia.martin@example.com",
      amount: "+$1,999.00",
    },
    {
      customer: "Jackson Lee",
      email: "jackson.lee@example.com",
      amount: "+$39.00",
    },
    {
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@example.com",
      amount: "+$299.00",
    },
    {
      customer: "William Kim",
      email: "will.kim@example.com",
      amount: "+$99.00",
    },
    {
      customer: "Sofia Davis",
      email: "sofia.davis@example.com",
      amount: "+$39.00",
    },
  ]

  const users = [
    { id: "1", name: "Alice Smith", email: "alice@example.com", status: "Active", role: "Customer" },
    { id: "2", name: "Bob Johnson", email: "bob@example.com", status: "Active", role: "Seller" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "Suspended", role: "Customer" },
    { id: "4", name: "Diana Prince", email: "diana@example.com", status: "Active", role: "Seller" },
    { id: "5", name: "Eve Adams", email: "eve@example.com", status: "Pending", role: "Customer" },
  ]

  const productsData = [
    { id: "p1", name: "Hand-painted Ceramic Mug", seller: "Artisan Crafts", status: "Active", stock: 15, sales: 120 },
    { id: "p2", name: "Knitted Wool Scarf", seller: "Cozy Knits", status: "Pending Review", stock: 5, sales: 30 },
    { id: "p3", name: "Custom Leather Wallet", seller: "Leather Works", status: "Active", stock: 20, sales: 80 },
    { id: "p4", name: "Organic Soy Candle", seller: "Nature's Glow", status: "Reported", stock: 10, sales: 50 },
    { id: "p5", name: "Handmade Silver Necklace", seller: "Jewel Craft", status: "Active", stock: 8, sales: 90 },
  ]

  const orders = [
    {
      id: "o1",
      customer: "Alice Smith",
      product: "Ceramic Mug",
      amount: "$25.00",
      status: "Completed",
      date: "2023-10-26",
    },
    {
      id: "o2",
      customer: "Bob Johnson",
      product: "Wool Scarf",
      amount: "$45.00",
      status: "Pending",
      date: "2023-10-25",
    },
    {
      id: "o3",
      customer: "Charlie Brown",
      product: "Leather Wallet",
      amount: "$70.00",
      status: "Cancelled",
      date: "2023-10-24",
    },
    {
      id: "o4",
      customer: "Diana Prince",
      product: "Soy Candle",
      amount: "$18.00",
      status: "Completed",
      date: "2023-10-23",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()),
  )

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.seller.toLowerCase().includes(productSearch.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
                <Card className="xl:col-span-2">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>You made 265 sales this month.</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden xl:table-column">Type</TableHead>
                          <TableHead className="hidden xl:table-column">Status</TableHead>
                          <TableHead className="hidden md:table-column">Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentSales.map((sale, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{sale.customer}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">{sale.email}</div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">Sale</TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-column">2023-06-23</TableCell>
                            <TableCell className="text-right">{sale.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Actions</CardTitle>
                    <CardDescription>Items requiring your attention.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">2 Products Pending Review</p>
                        <p className="text-sm text-muted-foreground">New products awaiting approval.</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Review
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">1 Order Awaiting Shipment</p>
                        <p className="text-sm text-muted-foreground">Order #12345 needs to be shipped.</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Ship
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">1 User Pending Approval</p>
                        <p className="text-sm text-muted-foreground">New seller account needs verification.</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage all registered users.</CardDescription>
                  <div className="mt-4 flex items-center gap-2">
                    <Input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="max-w-sm"
                    />
                    <Button variant="outline">Add User</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Suspend</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage all products on the platform.</CardDescription>
                  <div className="mt-4 flex items-center gap-2">
                    <Input
                      placeholder="Search products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="max-w-sm"
                    />
                    <Button variant="outline">Add Product</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === "Active"
                                  ? "default"
                                  : product.status === "Pending Review"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage all customer orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Refund</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>View various reports and insights.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Sales Report</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a detailed sales report for a custom period.
                        </p>
                      </div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="font-medium">User Activity Report</h3>
                        <p className="text-sm text-muted-foreground">Analyze user engagement and activity patterns.</p>
                      </div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-6 w-6 text-purple-500" />
                      <div>
                        <h3 className="font-medium">Product Performance</h3>
                        <p className="text-sm text-muted-foreground">
                          Review top-selling and underperforming products.
                        </p>
                      </div>
                    </div>
                    <Button>Generate</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { User, Calendar, Shield, Bell, Eye, EyeOff, Camera, Store, Star, Package } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
    role: "buyer",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    orderUpdates: true,
    newProducts: false,
    priceAlerts: false,
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }

    // Initialize profile data from session
    setProfileData({
      name: session.user.name || "",
      email: session.user.email || "",
      phone: session.user.phone || "",
      location: session.user.location || "",
      bio: session.user.bio || "",
      avatar: session.user.image || "",
      role: session.user.role || "buyer",
    })
  }, [session, status, router])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      await update() // Refresh session
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update password")
      }

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Success",
        description: "Password updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (newRole) => {
    if (newRole === profileData.role) return

    setLoading(true)

    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRole }),
      })

      if (!response.ok) {
        throw new Error("Failed to update role")
      }

      setProfileData((prev) => ({ ...prev, role: newRole }))
      await update() // Refresh session

      toast({
        title: "Success",
        description: `Account type changed to ${newRole}`,
      })

      // Redirect to appropriate dashboard
      if (newRole === "seller") {
        router.push("/seller/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    // In a real app, you'd save this to the backend
    toast({
      title: "Notification Settings Updated",
      description: "Your preferences have been saved",
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading profile...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sage-900 mb-2">Profile Settings</h1>
            <p className="text-sage-600">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                        <AvatarFallback className="text-2xl">
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button type="button" variant="outline" className="mb-2 bg-transparent">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-sage-600">JPG, GIF or PNG. Max size of 2MB.</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="mt-1"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                          className="mt-1"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        className="mt-1"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading} className="bg-terracotta-600 hover:bg-terracotta-700">
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                          className="mt-1"
                          required
                          minLength={8}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="mt-1"
                          required
                          minLength={8}
                        />
                      </div>
                    </div>

                    <div className="bg-sage-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sage-900 mb-2">Password Requirements:</h4>
                      <ul className="text-sm text-sage-600 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading} className="bg-terracotta-600 hover:bg-terracotta-700">
                        {loading ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="w-5 h-5" />
                    Account Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Role Display */}
                  <div className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-sage-900">Current Account Type</h3>
                      <p className="text-sage-600 text-sm">Your current role on the platform</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        profileData.role === "admin"
                          ? "border-purple-600 text-purple-600"
                          : profileData.role === "seller"
                            ? "border-terracotta-600 text-terracotta-600"
                            : "border-sage-600 text-sage-600"
                      } capitalize`}
                    >
                      {profileData.role}
                    </Badge>
                  </div>

                  {/* Role Change Options */}
                  {profileData.role === "buyer" && (
                    <Card className="border-terracotta-200 bg-terracotta-50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Store className="w-8 h-8 text-terracotta-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-sage-900 mb-2">Become a Seller</h3>
                            <p className="text-sage-600 mb-4">
                              Start selling your handcrafted items on our platform. As a seller, you'll be able to:
                            </p>
                            <ul className="text-sm text-sage-600 space-y-1 mb-4">
                              <li>• Create and manage product listings</li>
                              <li>• Set your own prices and inventory</li>
                              <li>• Build your seller profile and brand</li>
                              <li>• Access seller dashboard and analytics</li>
                              <li>• Communicate directly with customers</li>
                            </ul>
                            <Button
                              onClick={() => handleRoleChange("seller")}
                              disabled={loading}
                              className="bg-terracotta-600 hover:bg-terracotta-700"
                            >
                              {loading ? "Processing..." : "Become a Seller"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {profileData.role === "seller" && (
                    <Card className="border-sage-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Package className="w-8 h-8 text-sage-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-sage-900 mb-2">Seller Account Active</h3>
                            <p className="text-sage-600 mb-4">
                              You have access to all seller features. Manage your products and orders from your seller
                              dashboard.
                            </p>
                            <div className="flex gap-3">
                              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                                <a href="/seller/dashboard">Go to Dashboard</a>
                              </Button>
                              <Button variant="outline" onClick={() => handleRoleChange("buyer")} disabled={loading}>
                                Switch to Buyer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {profileData.role === "admin" && (
                    <Card className="border-purple-200 bg-purple-50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Shield className="w-8 h-8 text-purple-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-sage-900 mb-2">Administrator Account</h3>
                            <p className="text-sage-600 mb-4">You have full administrative access to the platform.</p>
                            <Button asChild className="bg-purple-600 hover:bg-purple-700">
                              <a href="/admin">Admin Panel</a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Separator />

                  {/* Account Stats */}
                  <div>
                    <h3 className="font-medium text-sage-900 mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-sage-50 rounded-lg">
                        <Calendar className="w-6 h-6 text-sage-600 mx-auto mb-2" />
                        <p className="text-sm text-sage-600">Member Since</p>
                        <p className="font-medium text-sage-900">
                          {session?.user?.createdAt
                            ? new Date(session.user.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                              })
                            : "Recently"}
                        </p>
                      </div>

                      {profileData.role === "seller" && (
                        <>
                          <div className="text-center p-4 bg-sage-50 rounded-lg">
                            <Package className="w-6 h-6 text-sage-600 mx-auto mb-2" />
                            <p className="text-sm text-sage-600">Products Listed</p>
                            <p className="font-medium text-sage-900">0</p>
                          </div>

                          <div className="text-center p-4 bg-sage-50 rounded-lg">
                            <Star className="w-6 h-6 text-sage-600 mx-auto mb-2" />
                            <p className="text-sm text-sage-600">Average Rating</p>
                            <p className="font-medium text-sage-900">No ratings yet</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sage-900">Order Updates</h4>
                        <p className="text-sm text-sage-600">
                          Get notified about order status changes and shipping updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.orderUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sage-900">New Products</h4>
                        <p className="text-sm text-sage-600">
                          Be the first to know about new products from your favorite sellers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newProducts}
                        onCheckedChange={(checked) => handleNotificationChange("newProducts", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sage-900">Price Alerts</h4>
                        <p className="text-sm text-sage-600">Get notified when items in your wishlist go on sale</p>
                      </div>
                      <Switch
                        checked={notifications.priceAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sage-900">Marketing Emails</h4>
                        <p className="text-sm text-sage-600">Receive newsletters, promotions, and platform updates</p>
                      </div>
                      <Switch
                        checked={notifications.emailMarketing}
                        onCheckedChange={(checked) => handleNotificationChange("emailMarketing", checked)}
                      />
                    </div>
                  </div>

                  <div className="bg-sage-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sage-900 mb-2">Email Frequency</h4>
                    <p className="text-sm text-sage-600">
                      You can unsubscribe from any email notifications at any time by clicking the unsubscribe link in
                      the email footer.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

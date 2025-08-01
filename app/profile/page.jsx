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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Calendar, Camera, Save, ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    phone: "",
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
      bio: "",
      location: "",
      website: "",
      phone: "",
    })
  }, [session, status, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call to save profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate password change
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
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

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Profile Settings</h1>
          <p className="text-lg text-sage-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-sage-200 sticky top-8">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={session.user.image || "/placeholder.svg"} alt={session.user.name} />
                    <AvatarFallback className="text-xl">
                      {session.user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-terracotta-600 hover:bg-terracotta-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-semibold text-sage-900 mb-2">{session.user.name}</h3>
                <p className="text-sage-600 mb-3">{session.user.email}</p>
                <Badge variant="outline" className="text-terracotta-600 border-terracotta-600 mb-4">
                  {session.user.role?.charAt(0).toUpperCase() + session.user.role?.slice(1) || "User"}
                </Badge>
                <div className="text-sm text-sage-500 flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since 2024
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="border-sage-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-sage-900">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="mt-1"
                            disabled
                          />
                          <p className="text-xs text-sage-500 mt-1">Email cannot be changed</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            type="text"
                            value={profileData.location}
                            onChange={handleInputChange}
                            placeholder="City, State/Country"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={profileData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself..."
                          className="mt-1"
                        />
                      </div>

                      <Button type="submit" className="bg-terracotta-600 hover:bg-terracotta-700" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="border-sage-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-sage-900">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" name="currentPassword" type="password" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" className="mt-1" />
                      </div>

                      <Button type="submit" className="bg-terracotta-600 hover:bg-terracotta-700" disabled={loading}>
                        {loading ? "Changing..." : "Change Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="border-sage-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-sage-900">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-sage-900 mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-sage-300" defaultChecked />
                            <span className="text-sage-700">Order updates and shipping notifications</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-sage-300" defaultChecked />
                            <span className="text-sage-700">New product announcements</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-sage-300" />
                            <span className="text-sage-700">Marketing and promotional emails</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-sage-900 mb-4">Privacy Settings</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-sage-300" defaultChecked />
                            <span className="text-sage-700">Make my profile visible to other users</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-sage-300" />
                            <span className="text-sage-700">Allow sellers to contact me directly</span>
                          </label>
                        </div>
                      </div>

                      <Button className="bg-terracotta-600 hover:bg-terracotta-700">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

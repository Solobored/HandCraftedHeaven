"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    orderType: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        orderType: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Contact Us</h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Have questions about our products, need help with an order, or interested in custom work? We'd love to hear
            from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-sage-900">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="orderType">Inquiry Type</Label>
                    <Select
                      value={formData.orderType}
                      onValueChange={(value) => handleSelectChange("orderType", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="custom">Custom Order Request</SelectItem>
                        <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                        <SelectItem value="seller">Become a Seller</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry..."
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Email</p>
                    <p className="text-sage-600">info@handcraftedhaven.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Phone</p>
                    <p className="text-sage-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Address</p>
                    <p className="text-sage-600">
                      123 Artisan Way
                      <br />
                      Craftsville, CA 90210
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Business Hours</p>
                    <p className="text-sage-600">
                      Mon-Fri: 9AM-6PM PST
                      <br />
                      Sat-Sun: 10AM-4PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">Custom Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-600 mb-4">
                  Looking for something unique? Our talented artisans can create custom pieces just for you!
                </p>
                <ul className="text-sm text-sage-600 space-y-2">
                  <li>• Personalized jewelry and accessories</li>
                  <li>• Custom home decor items</li>
                  <li>• Bespoke furniture pieces</li>
                  <li>• Corporate gifts and awards</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-sage-900">FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-sage-900">How long do custom orders take?</p>
                    <p className="text-sage-600">Typically 2-4 weeks depending on complexity.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sage-900">Do you ship internationally?</p>
                    <p className="text-sage-600">Yes, we ship worldwide with tracking.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sage-900">What's your return policy?</p>
                    <p className="text-sage-600">30-day returns on non-custom items.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

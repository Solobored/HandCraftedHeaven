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
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Package, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
    budget: "",
    timeline: "",
  })
  const [loading, setLoading] = useState(false)

  const inquiryTypes = [
    { value: "custom-order", label: "Custom Order Request" },
    { value: "product-inquiry", label: "Product Inquiry" },
    { value: "seller-question", label: "Question for Seller" },
    { value: "general-support", label: "General Support" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "other", label: "Other" },
  ]

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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you'd send this to your backend
      console.log("Contact form submitted:", formData)

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        inquiryType: "",
        message: "",
        budget: "",
        timeline: "",
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
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            Have a question, need a custom order, or want to connect with one of our artisans? We're here to help bring
            your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sage-900">
                  <MessageSquare className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Email</p>
                    <p className="text-sage-600">hello@handcraftedhaven.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Phone</p>
                    <p className="text-sage-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
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

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-terracotta-600 mt-1" />
                  <div>
                    <p className="font-medium text-sage-900">Business Hours</p>
                    <p className="text-sage-600">
                      Mon - Fri: 9:00 AM - 6:00 PM
                      <br />
                      Sat - Sun: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="border-sage-200 bg-sage-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sage-900">
                  <HelpCircle className="w-5 h-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sage-900 mb-1">Custom Orders</h4>
                  <p className="text-sm text-sage-600">
                    Most custom orders take 2-4 weeks. Include your timeline and budget for the best quote.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sage-900 mb-1">Product Questions</h4>
                  <p className="text-sm text-sage-600">
                    Need details about materials, dimensions, or care instructions? We're happy to help.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sage-900 mb-1">Seller Inquiries</h4>
                  <p className="text-sm text-sage-600">
                    Want to connect directly with an artisan? We can facilitate the introduction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sage-900">
                  <Send className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleSelectChange("inquiryType", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {/* Custom Order Specific Fields */}
                  {formData.inquiryType === "custom-order" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-terracotta-50 rounded-lg border border-terracotta-200">
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100">Under $100</SelectItem>
                            <SelectItem value="100-250">$100 - $250</SelectItem>
                            <SelectItem value="250-500">$250 - $500</SelectItem>
                            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                            <SelectItem value="over-1000">Over $1,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select
                          value={formData.timeline}
                          onValueChange={(value) => handleSelectChange("timeline", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="When do you need it?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                            <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                            <SelectItem value="1-2-months">1-2 months</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={6}
                      placeholder={
                        formData.inquiryType === "custom-order"
                          ? "Please describe your custom order in detail. Include materials, dimensions, colors, style preferences, and any specific requirements..."
                          : "Please provide details about your inquiry..."
                      }
                    />
                  </div>

                  <div className="bg-sage-50 p-4 rounded-lg">
                    <p className="text-sm text-sage-600">
                      <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during
                      business days. Custom order requests may take up to 48 hours for detailed quotes.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={
                        loading ||
                        !formData.name ||
                        !formData.email ||
                        !formData.subject ||
                        !formData.message ||
                        !formData.inquiryType
                      }
                      className="bg-terracotta-600 hover:bg-terracotta-700 px-8"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border-sage-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Package className="w-12 h-12 text-terracotta-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">Custom Orders</h3>
                  <p className="text-sage-600 text-sm">
                    Work directly with our artisans to create something uniquely yours. From concept to completion.
                  </p>
                </div>

                <div>
                  <MessageSquare className="w-12 h-12 text-terracotta-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">Expert Guidance</h3>
                  <p className="text-sage-600 text-sm">
                    Our team can help you find the perfect artisan and guide you through the custom order process.
                  </p>
                </div>

                <div>
                  <HelpCircle className="w-12 h-12 text-terracotta-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">Support</h3>
                  <p className="text-sage-600 text-sm">
                    Questions about orders, shipping, or our platform? We're here to help every step of the way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

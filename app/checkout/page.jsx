"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [orderNotes, setOrderNotes] = useState("")

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login?redirect=/checkout")
      return
    }

    if (cartItems.length === 0 && !orderPlaced) {
      router.push("/browse")
      return
    }

    // Pre-fill user information
    if (session.user) {
      setShippingInfo((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || "",
      }))
      setPaymentInfo((prev) => ({
        ...prev,
        cardholderName: session.user.name || "",
      }))
    }
  }, [session, status, router, cartItems.length, orderPlaced])

  const handleInputChange = (section, field, value) => {
    if (section === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [field]: value }))
    } else if (section === "payment") {
      setPaymentInfo((prev) => ({ ...prev, [field]: value }))
    }
  }

  const calculateShipping = () => {
    return cartItems.length > 0 ? 9.99 : 0
  }

  const calculateTax = () => {
    return getCartTotal() * 0.08 // 8% tax
  }

  const calculateTotal = () => {
    return getCartTotal() + calculateShipping() + calculateTax()
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      const requiredShippingFields = ["fullName", "email", "address", "city", "state", "zipCode"]
      const requiredPaymentFields = ["cardNumber", "expiryDate", "cvv", "cardholderName"]

      for (const field of requiredShippingFields) {
        if (!shippingInfo[field]) {
          throw new Error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        }
      }

      for (const field of requiredPaymentFields) {
        if (!paymentInfo[field]) {
          throw new Error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        }
      }

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Process payment
      // 2. Create order in database
      // 3. Send confirmation emails
      // 4. Update inventory

      setOrderPlaced(true)
      clearCart()

      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
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

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading checkout...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-sage-900 mb-4">Order Confirmed!</h1>
                <p className="text-sage-600 mb-6">
                  Thank you for your purchase! Your order has been successfully placed and you will receive a
                  confirmation email shortly.
                </p>
                <div className="space-y-3">
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700">
                    <a href="/dashboard">View Order Status</a>
                  </Button>
                  <Button asChild variant="outline" className="bg-transparent">
                    <a href="/browse">Continue Shopping</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-sage-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => handleInputChange("shipping", "fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name *</Label>
                      <Input
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => handleInputChange("payment", "cardholderName", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange("payment", "expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-sage-600">
                      <Shield className="w-4 h-4" />
                      Your payment information is secure and encrypted
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special instructions for your order..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-sage-100">
                          <Image
                            src={item.image_url || "/placeholder.svg?height=50&width=50&query=product"}
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-sage-900 truncate">{item.name}</h4>
                          <p className="text-sm text-sage-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-sage-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-600">Subtotal</span>
                      <span className="text-sage-900">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-600">Shipping</span>
                      <span className="text-sage-900">${calculateShipping().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-600">Tax</span>
                      <span className="text-sage-900">${calculateTax().toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-sage-900">Total</span>
                      <span className="text-terracotta-600">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700"
                    size="lg"
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>

                  <div className="text-xs text-sage-500 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"

export default function ShoppingCart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Handwoven Ceramic Bowl",
      seller: "Maria's Ceramics",
      price: 45,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Macrame Wall Hanging",
      seller: "Boho Crafts Co.",
      price: 32,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 75 ? 0 : 8.99
  const total = subtotal + shipping

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shopping Cart ({cartItems.length})
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <ShoppingBag className="w-12 h-12 text-sage-300 mx-auto mb-4" />
                  <p className="text-sage-600">Your cart is empty</p>
                  <Button onClick={onClose} className="mt-4 bg-terracotta-600 hover:bg-terracotta-700 text-white">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border border-sage-200 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sage-900 truncate">{item.name}</h4>
                        <p className="text-sm text-sage-600">{item.seller}</p>
                        <p className="text-sm font-medium text-sage-900">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-sage-400 hover:text-red-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center border border-sage-300 rounded">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-sage-50">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-sage-50">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-600">Subtotal:</span>
                      <span className="text-sage-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-600">Shipping:</span>
                      <span className="text-sage-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && <p className="text-xs text-sage-500">Free shipping on orders over $75</p>}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span className="text-sage-900">Total:</span>
                      <span className="text-sage-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white">Checkout</Button>
                    <Button
                      variant="outline"
                      className="w-full border-sage-300 text-sage-700 bg-transparent"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

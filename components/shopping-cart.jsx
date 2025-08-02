"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ShoppingCartComponent({ isOpen, onOpenChange }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemCount } = useCart()

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const cartItemCount = getCartItemCount()
  const cartTotal = getCartTotal()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItemCount})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="w-16 h-16 text-sage-300 mb-4" />
            <h3 className="text-lg font-medium text-sage-900 mb-2">Your cart is empty</h3>
            <p className="text-sage-600 mb-6">Add some beautiful handcrafted items to get started!</p>
            <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700" onClick={() => onOpenChange(false)}>
              <Link href="/browse">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-sage-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-sage-100 flex-shrink-0">
                          <Image
                            src={
                              item.image_url || item.images?.[0] || "/placeholder.svg?height=64&width=64&query=product"
                            }
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sage-900 truncate">{item.name}</h4>
                          <p className="text-sm text-sage-600 mb-2">${item.price.toFixed(2)} each</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 bg-transparent"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 bg-transparent"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sage-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-sage-900">Total:</span>
                <span className="text-xl font-bold text-terracotta-600">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full bg-terracotta-600 hover:bg-terracotta-700"
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent" onClick={() => onOpenChange(false)}>
                  <Link href="/browse">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

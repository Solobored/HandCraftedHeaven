"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

export default function ShoppingCartModal({ isOpen, onClose }) {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal, getCartItemCount } = useCart()

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateItemQuantity(id, newQuantity)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
            {getCartItemCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getCartItemCount()}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <ShoppingCart className="w-16 h-16 text-sage-300 mb-4" />
            <h3 className="text-lg font-semibold text-sage-700 mb-2">Your cart is empty</h3>
            <p className="text-sage-500 mb-6">Add some handcrafted items to get started!</p>
            <Button onClick={onClose} className="bg-terracotta-600 hover:bg-terracotta-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 pr-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-sage-100">
                      <Image
                        src={item.image_url || "/placeholder.svg?height=100&width=100&query=product"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-sage-900 truncate">{item.name}</h4>
                      <p className="text-sm text-sage-500">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-medium text-sage-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-sage-900">Total:</span>
                <span className="text-lg font-bold text-terracotta-600">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-terracotta-600 hover:bg-terracotta-700">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

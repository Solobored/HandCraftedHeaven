"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem("handcrafted_haven_cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
        setCartItems([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("handcrafted_haven_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity
        const maxStock = product.stock || 10

        if (newQuantity > maxStock) {
          toast({
            title: "Out of Stock",
            description: `Cannot add more than ${maxStock} of ${product.name}.`,
            variant: "destructive",
          })
          return prevItems
        }

        updatedItems[existingItemIndex].quantity = newQuantity
        toast({
          title: "Cart Updated",
          description: `${quantity} more of "${product.name}" added to cart.`,
        })
        return updatedItems
      } else {
        const maxStock = product.stock || 10
        if (quantity > maxStock) {
          toast({
            title: "Out of Stock",
            description: `Cannot add more than ${maxStock} of ${product.name}.`,
            variant: "destructive",
          })
          return prevItems
        }

        toast({
          title: "Item Added",
          description: `"${product.name}" added to cart.`,
        })
        return [...prevItems, { ...product, quantity, stock: maxStock }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === productId)
      if (removedItem) {
        toast({
          title: "Item Removed",
          description: `"${removedItem.name}" removed from cart.`,
          variant: "destructive",
        })
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }, [])

  const updateItemQuantity = useCallback((productId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === productId) {
            if (newQuantity <= 0) {
              toast({
                title: "Item Removed",
                description: `"${item.name}" removed from cart.`,
                variant: "destructive",
              })
              return null
            }
            const maxStock = item.stock || 10
            if (newQuantity > maxStock) {
              toast({
                title: "Out of Stock",
                description: `Cannot add more than ${maxStock} of ${item.name}.`,
                variant: "destructive",
              })
              return item
            }
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean)
      return updatedItems
    })
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }, [])

  const value = React.useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateItemQuantity,
      getCartTotal,
      getCartItemCount,
      clearCart,
    }),
    [cartItems, addToCart, removeFromCart, updateItemQuantity, getCartTotal, getCartItemCount, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

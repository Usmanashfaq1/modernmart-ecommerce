"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export type CartItem = {
  id: number
  name: string
  slug: string        // ✅ product page link
  price: number
  image: string
  quantity: number
  inStock: boolean
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // ✅ Load cart from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
            : i
        )
      }
      if (!item.inStock) return prev // ✅ prevent adding if out of stock
      return [...prev, { ...item, quantity: item.quantity ?? 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id)
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}

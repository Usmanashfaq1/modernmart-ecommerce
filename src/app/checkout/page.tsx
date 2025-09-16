"use client"

import { useCart } from "@/context/CartContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, ChevronLeft, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const { items: cartItems } = useCart() // ✅ get real cart items
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!")

    setLoading(true)
    try {
      // Add default size/color if missing
      const cartItemsForCheckout = cartItems.map(item => ({
        ...item,
        size: item.size || "One Size",
        color: item.color || "Default",
      }))

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItemsForCheckout }),
      })

      const { url } = await response.json()
      if (url) window.location.href = url
      else throw new Error("Failed to create Stripe session")
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg font-medium">Your cart is empty.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>
          <ShoppingBag className="hidden md:block h-16 w-16 text-primary/20" />
        </div>
      </div>

      {/* Back to Cart */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="p-0">
          <Link href="/cart" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </Button>
      </div>

      {/* Checkout & Summary */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.size || "One Size"}, {item.color || "Default"}, Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                Pay Securely with Stripe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
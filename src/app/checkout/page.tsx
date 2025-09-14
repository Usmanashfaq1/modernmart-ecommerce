'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"

import { 
  CreditCard, 
  Truck, 
  Shield, 
  ChevronLeft, 
  Lock,
  ShoppingBag
} from "lucide-react"
import Link from "next/link"

// Mock cart data (same as cart page, replace with your cart context later)
const initialCartItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    size: "M",
    color: "Black",
    quantity: 2,
    inStock: true
  },
  {
    id: 2,
    name: "Urban Denim Jacket", 
    slug: "urban-denim-jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
    size: "L",
    color: "Dark Blue",
    quantity: 1,
    inStock: true
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    slug: "designer-sunglasses", 
    price: 119.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    size: "One Size",
    color: "Black",
    quantity: 1,
    inStock: false
  }
]

function CheckoutHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>
          <div className="hidden md:block">
            <ShoppingBag className="h-16 w-16 text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ items }: { items: typeof initialCartItems }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const originalTotal = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price
    return sum + (originalPrice * item.quantity)
  }, 0)
  const totalSavings = originalTotal - subtotal
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.size}, {item.color}, Qty: {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {totalSavings > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Total Savings</span>
              <span>-${totalSavings.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
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

        <div className="pt-4 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping & Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <Input id="lastName" placeholder="Doe" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Input id="address" placeholder="123 Urban St" />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">City</label>
              <Input id="city" placeholder="New York" />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">State</label>
              <Input id="state" placeholder="NY" />
            </div>
            <div className="space-y-2">
              <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
              <Input id="zip" placeholder="10001" />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">Country</label>
              <Input id="country" placeholder="United States" />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={() => setPaymentMethod("credit-card")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label htmlFor="credit-card" className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </label>
            </div>
            {paymentMethod === "credit-card" && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-sm font-medium">Expiration Date</label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="cardName" className="text-sm font-medium">Name on Card</label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="paypal"
                name="payment-method"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label htmlFor="paypal" className="flex items-center gap-2 text-sm font-medium">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.076 2.283C7.485 1.123 8.6.316 9.873.316h6.885c1.678 0 3.142.873 3.977 2.177l.243.381c.35.548.54 1.194.54 1.863v1.07c0 .669-.19 1.315-.54 1.863l-.243.381c-.835 1.304-2.299 2.177-3.977 2.177H9.873c-1.273 0-2.388-.807-2.797-1.967l-.79-2.284c-.17-.492-.258-1.015-.258-1.543v-.571c0-.528.088-1.051.258-1.543l.79-2.284zM2 8.48c0-.669.19-1.315.54-1.863l.243-.381C3.618 4.932 5.082 4.059 6.76 4.059h6.885c1.273 0 2.388.807 2.797 1.967l.79 2.284c.17.492.258 1.015.258 1.543v.571c0 .528-.088 1.051-.258 1.543l-.79 2.284c-.409 1.16-1.524 1.967-2.797 1.967H6.76c-1.678 0-3.142-.873-3.977-2.177l-.243-.381C2.19 13.095 2 12.449 2 11.78v-1.07c0-.528.088-1.051.258-1.543l.79-2.284C3.457 5.743 4.572 4.936 5.845 4.936H2V2.283h12.645c-1.273 0-2.388.807-2.797 1.967l-.79 2.284c-.17.492-.258 1.015-.258 1.543v.571c0 .528.088 1.051.258 1.543l.79 2.284c.409 1.16 1.524 1.967 2.797 1.967H2v-2.653z"/>
                </svg>
                PayPal
              </label>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Billing Address</h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sameAsShipping"
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="sameAsShipping" className="text-sm font-medium">
              Same as shipping address
            </label>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Button className="w-full" size="lg">
          <Lock className="mr-2 h-4 w-4" />
          Place Order
        </Button>
      </CardContent>
    </Card>
  )
}


export default function CheckoutPage() {
  const [cartItems] = useState(initialCartItems)

  return (
    <div className="min-h-screen">
      <CheckoutHeader />
      
      {/* Back to Cart */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="p-0">
          <Link href="/cart" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
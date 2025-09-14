// app/cart/page.tsx
'use client'

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  Heart,
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"

// Mock cart data (you'll replace this with your cart context/state later)
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

function CartHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items and proceed to checkout</p>
          </div>
          <div className="hidden md:block">
            <ShoppingBag className="h-16 w-16 text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }: {
  item: typeof initialCartItems[0],
  onUpdateQuantity: (id: number, quantity: number) => void,
  onRemove: (id: number) => void,
  onMoveToWishlist: (id: number) => void
}) {
  const itemTotal = item.price * item.quantity
  const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link href={`/products/${item.slug}`}>
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted hover:scale-105 transition-transform">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Size: <span className="font-medium text-foreground">{item.size}</span></span>
                  <span>Color: <span className="font-medium text-foreground">{item.color}</span></span>
                </div>

                {!item.inStock && (
                  <Badge variant="destructive" className="w-fit">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${item.price}
                </div>
                {item.originalPrice && (
                  <div className="text-lg text-muted-foreground line-through">
                    ${item.originalPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Controls & Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    disabled={!item.inStock}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 text-center border-0 bg-transparent"
                    min="0"
                    disabled={!item.inStock}
                  />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={!item.inStock}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveToWishlist(item.id)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save for Later
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            {/* Item Total */}
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="space-y-1">
                <div className="text-lg font-semibold">
                  Item Total: ${itemTotal.toFixed(2)}
                </div>
                {savings > 0 && (
                  <div className="text-sm text-green-600">
                    You save: ${savings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        
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

        {subtotal < 50 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full" asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="pt-4 border-t space-y-3">
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

function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardContent className="p-12 text-center space-y-6">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground/50" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">
              Start Shopping
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id))
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // This will be connected to wishlist functionality later
    removeItem(id)
    alert("Item moved to wishlist!")
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="min-h-screen">
      <CartHeader />
      
      {/* Back to Shopping */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="p-0">
          <Link href="/products" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onMoveToWishlist={moveToWishlist}
              />
            ))}
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
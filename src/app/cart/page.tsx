"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

type CartItemProps = {
  item: {
    id: number   // ✅ fixed: number, not string
    name: string
    price: number
    image: string
    quantity: number
  }
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onMoveToWishlist: (id: number) => void
}

function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }: CartItemProps) {
  return (
    <div className="flex gap-4 border-b py-4">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
          <span>{item.quantity}</span>
          <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-2 text-sm">
          <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline">Remove</button>
          <button onClick={() => onMoveToWishlist(item.id)} className="text-blue-500 hover:underline">Move to Wishlist</button>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ items }: { items: { price: number; quantity: number }[] }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
      <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
      <div className="flex justify-between font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      <Button className="w-full mt-4">Checkout</Button>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-lg font-medium">Your cart is empty.</p>
      <Button asChild className="mt-4">
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  )
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart()

  const moveToWishlist = (id: number) => {
    removeFromCart(id)
    alert("Item moved to wishlist!")
  }

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="min-h-screen">
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
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onMoveToWishlist={moveToWishlist}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={items} /> {/* ✅ fixed: items instead of cart */}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { items } = useCart() // ✅ fixed (was cart / cartItems)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          UrbanThreads
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link href="/products" className="hover:text-primary transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/login">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}

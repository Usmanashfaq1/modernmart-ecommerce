"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { items } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:scale-105 transition-transform duration-200"
        >
          UrbanThreads
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="hover:text-primary transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative hover:text-primary transition-colors duration-200"
          >
            <ShoppingCart className="h-6 w-6 hover:scale-110 transition-transform duration-200" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="hover:text-primary transition-colors duration-200"
          >
            <User className="h-6 w-6 hover:scale-110 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </header>
  )
}

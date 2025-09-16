"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">UrbanThreads</h2>
          <p className="text-sm">
            Premium urban fashion for the modern generation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="Your email"
                className="pl-10 pr-4 py-2 rounded-l-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-r-md sm:rounded-l-none hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} UrbanThreads. All rights reserved.
      </div>
    </footer>
  )
}

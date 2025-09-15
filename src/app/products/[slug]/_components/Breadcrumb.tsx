"use client"

import Link from "next/link"

export default function Breadcrumb({ product }: { product: any }) {
  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-4 text-sm flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:underline">Products</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:underline">
              {product.category}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="font-medium">{product.name}</span>
      </div>
    </div>
  )
}

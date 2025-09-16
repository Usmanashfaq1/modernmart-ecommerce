"use client"

import ProductCard from "./ProductCard"

export default function ProductsGrid({ products }: { products: any[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}

"use client"

import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"

export default function ProductsGrid({ products }: { products: any[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="px-8">
          Load More Products
        </Button>
      </div>
    </div>
  )
}

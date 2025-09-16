"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function ProductInfo({ product }: { product: any }) {
  const { addToCart } = useCart()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl text-primary font-semibold">${product.price}</p>
      </div>
      <p className="text-muted-foreground">{product.description}</p>

      <Button
        size="lg"
        disabled={!product.inStock}
        className="w-full"
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            inStock: product.inStock,
          })
        }
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  )
}

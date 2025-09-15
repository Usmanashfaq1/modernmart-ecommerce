"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart()

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          className="w-full"
          size="lg"
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.images[0],
              quantity: 1,
              inStock: product.stock > 0,
            })
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

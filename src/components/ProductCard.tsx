"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

type ProductCardProps = {
  product: {
    id: number
    name: string
    slug: string
    price: number
    image: string
    inStock: boolean
    badge?: string
    originalPrice?: number
    rating?: number
    reviews?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Best Seller": return "default"
      case "New": return "secondary" 
      case "Sale": return "destructive"
      case "Limited": return "outline"
      default: return "secondary"
    }
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <Badge 
                variant={getBadgeVariant(product.badge)}
                className="shadow-lg"
              >
                {product.badge}
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="shadow-lg">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist / Heart */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-6 space-y-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(product.rating ?? 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews ?? 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full group/button" 
          size="lg"
          disabled={!product.inStock}
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
              inStock: product.inStock,
            })
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4 group-hover/button:animate-bounce" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}

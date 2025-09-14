// app/products/page.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, ShoppingCart, Heart, Search, Filter, Grid3X3, List } from "lucide-react"
import Link from "next/link"

// Extended products data (you'll replace this with database query later)
const allProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    badge: "Best Seller",
    inStock: true
  },
  {
    id: 2,
    name: "Urban Denim Jacket",
    slug: "urban-denim-jacket",
    price: 89.99,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    badge: "New",
    inStock: true
  },
  {
    id: 3,
    name: "Classic Sneakers",
    slug: "classic-sneakers",
    price: 79.99,
    rating: 4.3,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    inStock: true
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    badge: "Sale",
    inStock: true
  },
  {
    id: 5,
    name: "Vintage Watch",
    slug: "vintage-watch",
    price: 199.99,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    inStock: true
  },
  {
    id: 6,
    name: "Wool Blend Sweater",
    slug: "wool-blend-sweater",
    price: 69.99,
    rating: 4.4,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    inStock: false
  },
  {
    id: 7,
    name: "Designer Sunglasses",
    slug: "designer-sunglasses",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    badge: "Limited",
    inStock: true
  },
  {
    id: 8,
    name: "Canvas Backpack",
    slug: "canvas-backpack",
    price: 59.99,
    rating: 4.2,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    inStock: true
  },
  {
    id: 9,
    name: "Minimalist Wallet",
    slug: "minimalist-wallet",
    price: 34.99,
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    badge: "Popular",
    inStock: true
  }
]

function ProductsHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            All Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of premium urban fashion and accessories
          </p>
        </div>
      </div>
    </div>
  )
}

function ProductsFilters() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
          />
        </div>

        {/* Filters & View Options */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {allProducts.length} products
          </p>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Best Seller": return "default"
      case "New": return "secondary" 
      case "Sale": return "destructive"
      case "Limited": return "outline"
      case "Popular": return "default"
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
          
          {/* Heart Icon */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-6 space-y-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

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
        >
          <ShoppingCart className="mr-2 h-4 w-4 group-hover/button:animate-bounce" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProductsGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allProducts.map((product) => (
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

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsHeader />
      <ProductsFilters />
      <ProductsGrid />
    </div>
  )
}
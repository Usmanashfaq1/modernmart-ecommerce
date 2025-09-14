// app/products/[slug]/page.tsx
'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Share2
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Mock product data (you'll replace with database query later)
const getProductBySlug = (slug: string) => {
  const products = {
    "premium-cotton-tshirt": {
      id: 1,
      name: "Premium Cotton T-Shirt",
      slug: "premium-cotton-tshirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviews: 128,
      description: "Crafted from 100% organic cotton, this premium t-shirt offers unmatched comfort and style. Perfect for everyday wear with a relaxed fit that flatters every body type.",
      features: [
        "100% Organic Cotton",
        "Pre-shrunk fabric",
        "Reinforced neckline", 
        "Machine washable",
        "Available in 8 colors"
      ],
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f37f4502?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy", "Gray", "Olive"],
      inStock: true,
      stockCount: 45,
      badge: "Best Seller",
      category: "T-Shirts"
    },
    "urban-denim-jacket": {
      id: 2,
      name: "Urban Denim Jacket",
      slug: "urban-denim-jacket", 
      price: 89.99,
      rating: 4.8,
      reviews: 89,
      description: "A modern take on the classic denim jacket. Features contemporary cuts and premium denim fabric that gets better with age.",
      features: [
        "Premium denim fabric",
        "Contemporary fit",
        "Metal button closure",
        "Two chest pockets",
        "Vintage wash finish"
      ],
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Light Blue", "Dark Blue", "Black"],
      inStock: true,
      stockCount: 23,
      badge: "New",
      category: "Jackets"
    }
  }
  return products[slug as keyof typeof products] || products["premium-cotton-tshirt"]
}

function Breadcrumb({ product }: { product: any }) {
  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>
    </div>
  )
}

function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={images[selectedImage]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Thumbnail Images */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-primary" : "border-muted"
            }`}
          >
            <img
              src={image}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductInfo({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // This will connect to your cart system later
    console.log("Added to cart:", {
      product: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    })
    alert("Added to cart! (This will be replaced with actual cart functionality)")
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="p-0 h-auto">
        <Link href="/products" className="flex items-center text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </Button>

      {/* Product Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.category}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <Badge variant={product.badge === "Best Seller" ? "default" : "secondary"}>
            {product.badge}
          </Badge>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-medium">{product.rating}</span>
          <Link href="#reviews" className="text-primary hover:underline">
            ({product.reviews} reviews)
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-4xl font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-2xl text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm">
            {product.inStock 
              ? `In Stock (${product.stockCount} available)` 
              : "Out of Stock"
            }
          </span>
        </div>
      </div>

      <Separator />

      {/* Product Options */}
      <div className="space-y-6">
        {/* Size Selection */}
        {product.sizes && (
          <div className="space-y-3">
            <h3 className="font-semibold">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && (
          <div className="space-y-3">
            <h3 className="font-semibold">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color: string) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-3">
          <h3 className="font-semibold">Quantity</h3>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center"
              min="1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Add to Cart */}
      <div className="space-y-4">
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock || !selectedSize || !selectedColor}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
        
        <Button variant="outline" className="w-full" size="lg">
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Product Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Truck className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Free Shipping</p>
            <p className="text-sm text-muted-foreground">Orders over $50</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Secure Payment</p>
            <p className="text-sm text-muted-foreground">SSL Encrypted</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <RotateCcw className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Easy Returns</p>
            <p className="text-sm text-muted-foreground">30 day policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDescription({ product }: { product: any }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  return (
    <div className="min-h-screen">
      <Breadcrumb product={product} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>
      
      <ProductDescription product={product} />
    </div>
  )
}
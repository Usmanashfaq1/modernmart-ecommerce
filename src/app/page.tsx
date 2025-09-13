import { ShoppingBag, Search, User, Heart, Star, ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Homepage() {
  // Mock data - replace with real data from your database
  const featuredProducts = [
    { id: 1, name: "Classic White T-Shirt", price: 29.99, image: "/api/placeholder/300/400", rating: 4.5, reviews: 128 },
    { id: 2, name: "Denim Jacket", price: 89.99, image: "/api/placeholder/300/400", rating: 4.8, reviews: 89 },
    { id: 3, name: "Black Hoodie", price: 59.99, image: "/api/placeholder/300/400", rating: 4.7, reviews: 156 },
    { id: 4, name: "Casual Jeans", price: 79.99, image: "/api/placeholder/300/400", rating: 4.6, reviews: 203 },
  ]

  const categories = [
    { name: "Men's Clothing", image: "/api/placeholder/250/300", count: 150 },
    { name: "Women's Clothing", image: "/api/placeholder/250/300", count: 200 },
    { name: "Accessories", image: "/api/placeholder/250/300", count: 75 },
    { name: "Shoes", image: "/api/placeholder/250/300", count: 120 },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              ModernMart
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <Link href="/auth/login" className="flex items-center text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Account</span>
              </Link>
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <Heart className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Wishlist</span>
              </button>
              <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Cart</span>
                <span className="ml-1 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">3</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Latest Fashion Trends
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover our new collection of premium clothing. Quality, style, and comfort in every piece.
          </p>
          <div className="space-x-4">
            <Link 
              href="/products" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center"
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/products?category=sale" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 inline-flex items-center"
            >
              View Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">👔</span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-6xl">👕</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">SSL encrypted transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8">Subscribe to get special offers and updates</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-r-lg font-semibold hover:bg-yellow-400">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ModernMart</h3>
              <p className="text-gray-400">Your one-stop shop for premium clothing and accessories.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/size-guide" className="hover:text-white">Size Guide</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400 mb-2">Stay connected on social media</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ModernMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
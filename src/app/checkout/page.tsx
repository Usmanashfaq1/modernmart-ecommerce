'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ChevronLeft, 
  Lock,
  ShoppingBag,
  Loader2,
  Package
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock cart data (replace with your cart context later)
const initialCartItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    size: "M",
    color: "Black",
    quantity: 2,
    inStock: true
  },
  {
    id: 2,
    name: "Urban Denim Jacket", 
    slug: "urban-denim-jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
    size: "L",
    color: "Dark Blue",
    quantity: 1,
    inStock: true
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    slug: "designer-sunglasses", 
    price: 119.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    size: "One Size",
    color: "Black",
    quantity: 1,
    inStock: false
  }
]

// Form data type
type CheckoutFormData = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

function CheckoutHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>
          <div className="hidden md:block">
            <ShoppingBag className="h-16 w-16 text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ items }: { items: typeof initialCartItems }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const originalTotal = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price
    return sum + (originalPrice * item.quantity)
  }, 0)
  const totalSavings = originalTotal - subtotal
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4">
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.size}, {item.color}, Qty: {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {totalSavings > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Total Savings</span>
              <span>-${totalSavings.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure checkout with Stripe</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CheckoutForm({ items, onPlaceOrder }: { items: typeof initialCartItems, onPlaceOrder: (items: typeof initialCartItems, formData: CheckoutFormData | null, paymentMethod: string) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CheckoutFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  })

  const onSubmit = async (formData: CheckoutFormData) => {
    setLoading(true)
    try {
      // Only send shipping data for COD or if fields are filled
      const shippingData = paymentMethod === "cod" || Object.values(formData).some(val => val) ? formData : null
      await onPlaceOrder(items, shippingData, paymentMethod)
      reset() // Clear form after successful submission
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to process order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping & Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Shipping Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Shipping Details {paymentMethod === "cod" ? "(Required for Cash on Delivery)" : "(Optional for Stripe)"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName", { required: paymentMethod === "cod" ? "First name is required" : false })}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName", { required: paymentMethod === "cod" ? "Last name is required" : false })}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  {...register("email", {
                    required: paymentMethod === "cod" ? "Email is required" : false,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <Input
                  id="address"
                  placeholder="123 Urban St"
                  {...register("address", { required: paymentMethod === "cod" ? "Address is required" : false })}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <Input
                  id="city"
                  placeholder="New York"
                  {...register("city", { required: paymentMethod === "cod" ? "City is required" : false })}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <Input
                  id="state"
                  placeholder="NY"
                  {...register("state", { required: paymentMethod === "cod" ? "State is required" : false })}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                <Input
                  id="zip"
                  placeholder="10001"
                  {...register("zip", {
                    required: paymentMethod === "cod" ? "ZIP code is required" : false,
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/,
                      message: "Invalid ZIP code",
                    },
                  })}
                />
                {errors.zip && (
                  <p className="text-sm text-destructive">{errors.zip.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input
                  id="country"
                  placeholder="United States"
                  {...register("country", { required: paymentMethod === "cod" ? "Country is required" : false })}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={() => setPaymentMethod("credit-card")}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor="credit-card" className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="cod"
                  name="payment-method"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label htmlFor="cod" className="flex items-center gap-2 text-sm font-medium">
                  <Package className="h-4 w-4" />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full" 
            size="lg" 
            disabled={loading || (paymentMethod === "cod" && !isValid)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Order...
              </>
            ) : (
              <>
                {paymentMethod === "cod" ? (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Place Order (Cash on Delivery)
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay Securely with Stripe
                  </>
                )}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function CheckoutPage() {
  const [cartItems] = useState(initialCartItems)
  const router = useRouter()

  const handlePlaceOrder = async (items: typeof initialCartItems, formData: CheckoutFormData | null, paymentMethod: string) => {
    if (paymentMethod === "cod") {
      if (!formData) {
        throw new Error('Shipping details required for Cash on Delivery');
      }
      // Mock COD order submission (replace with Supabase/Prisma later)
      const response = await fetch('/api/cod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping: formData }),
      });

      if (response.ok) {
        router.push('/success?cod=true'); // Redirect to success page
      } else {
        throw new Error('Failed to process COD order');
      }
    } else {
      // Stripe payment
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items,
          shipping: formData ? {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zip,
              country: formData.country,
            },
          } : null,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        throw new Error('Failed to create payment session');
      }
    }
  }

  return (
    <div className="min-h-screen">
      <CheckoutHeader />
      
      {/* Back to Cart */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="p-0">
          <Link href="/cart" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm items={cartItems} onPlaceOrder={handlePlaceOrder} />
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ShoppingBag, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Suspense } from "react"

function SuccessHeader() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-800">Order Confirmed!</h1>
            <p className="text-green-700">Thank you for your purchase. Your order is on its way!</p>
          </div>
          <div className="hidden md:block">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderDetails() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const order = {
    id: "#12345",
    total: "$239.96",
    items: 3,
    date: new Date().toLocaleDateString(),
    status: "Processing" as const,
    paymentMethod: "Credit Card **** 4242",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-semibold">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-semibold">{order.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-primary">{order.total}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {order.status}
                  </Badge>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">{sessionId?.slice(-8) || "N/A"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="flex-1">
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="flex-1">
          <Link href="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen">
        <SuccessHeader />
        <OrderDetails />
      </div>
    </Suspense>
  )
}

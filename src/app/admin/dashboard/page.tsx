// app/admin/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"
import * as productService from "@/services/productService"

export default async function AdminDashboardPage() {
  // Fetch all products
  const { products } = await productService.getAllProductsService(1, 100) // first 100 products

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <ShoppingBag className="h-6 w-6 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

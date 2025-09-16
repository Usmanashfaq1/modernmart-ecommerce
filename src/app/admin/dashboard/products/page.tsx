// app/admin/products/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as productService from "@/services/productService"

export default async function AdminProductsPage() {
  // Server-side fetch products
  const { products } = await productService.getAllProductsService(1, 100) // fetch first 100

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">${product.price}</p>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/dashboard/products/${product.id}`}>Edit</Link>
                </Button>
                <form action={async () => {
                  "use server"
                  await productService.deleteProductService(product.id)
                }}>
                  <Button type="submit" variant="destructive">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

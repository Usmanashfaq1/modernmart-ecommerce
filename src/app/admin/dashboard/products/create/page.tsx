// app/admin/products/create/page.tsx
import { Button } from "@/components/ui/button"
import * as productService from "@/services/productService"

export default async function AdminAddProductPage() {

  async function handleSubmit(formData: FormData) {
    "use server"

    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const price = parseFloat(formData.get("price") as string)
    const description = formData.get("description") as string
    const stock = parseInt(formData.get("stock") as string) || 0
    const images = (formData.get("images") as string)?.split(",") || []

    await productService.createProductService({
      name,
      slug,
      price,
      description,
      stock,
      images
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <input type="text" name="name" placeholder="Name" className="w-full border p-2 rounded" required />
      <input type="text" name="slug" placeholder="Slug" className="w-full border p-2 rounded" required />
      <input type="number" name="price" placeholder="Price" className="w-full border p-2 rounded" required />
      <input type="number" name="stock" placeholder="Stock" className="w-full border p-2 rounded" />
      <input type="text" name="images" placeholder="Images (comma separated URLs)" className="w-full border p-2 rounded" />
      <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" required />

      <Button type="submit">Add Product</Button>
    </form>
  )
}

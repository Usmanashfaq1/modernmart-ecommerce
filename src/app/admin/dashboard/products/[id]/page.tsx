// app/admin/products/[id]/page.tsx
import * as productService from "@/services/productService"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Params {
  params: { id: string }
}

export default async function AdminEditProductPage({ params }: Params) {
  const productId = parseInt(params.id)
  const product = await productService.getProductByIdService(productId)

  if (!product) return <p>Product not found</p>

  // --- Server Action: Update Product ---
  async function handleUpdate(formData: FormData) {
    "use server"

    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const price = parseFloat(formData.get("price") as string)
    const description = formData.get("description") as string
    const stock = parseInt(formData.get("stock") as string) || 0
    const images = (formData.get("images") as string)?.split(",") || []

    await productService.updateProductService(productId, {
      name,
      slug,
      price,
      description,
      stock,
      images,
    })

    redirect("/admin/dashboard/products") // Go back to products list after update
  }

  // --- Server Action: Delete Product ---
  async function handleDelete(formData: FormData) {
    "use server"
    await productService.deleteProductService(productId)
    redirect("/admin/dashboard/products") // Go back to products list after deletion
  }

  return (
    <div className="space-y-6 max-w-md">
      {/* Update Product Form */}
      <form action={handleUpdate} className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <input
          type="text"
          name="name"
          defaultValue={product.name}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="slug"
          defaultValue={product.slug}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          defaultValue={product.price}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          defaultValue={product.stock}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="images"
          defaultValue={product.images.join(",")}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          defaultValue={product.description}
          className="w-full border p-2 rounded"
          required
        />

        <Button type="submit">Update Product</Button>
      </form>

      {/* Delete Product Form */}
      <form action={handleDelete}>
        <Button type="submit" variant="destructive">
          Delete Product
        </Button>
      </form>
    </div>
  )
}

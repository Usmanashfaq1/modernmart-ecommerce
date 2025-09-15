import * as productService from "@/services/productService"
import ProductsHeader from "./_components/ProductsHeader"
import ProductsFilters from "./_components/ProductsFilters"
import ProductsGrid from "./_components/ProductsGrid"

// Fetch + Map DB → UI format
async function getProducts() {
  const { products } = await productService.getAllProductsService(1, 20)

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    originalPrice: undefined,
    rating: 4.5,
    reviews: 0,
    image: (p as any).images?.[0] || "https://via.placeholder.com/400",
    badge: (p as any).badge,
    inStock: p.stock > 0,
  }))
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      <ProductsHeader />
      <ProductsFilters count={products.length} />
      <ProductsGrid products={products} />
    </div>
  )
}

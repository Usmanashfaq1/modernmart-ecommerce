import { getAllProductsService } from "@/services/productService"
import Hero from "./_components/Hero"
import FeaturedProductsClient from "./_components/FeaturedProductsClient"

export default async function HomePage() {
  const { products } = await getAllProductsService() // ✅ destructure

  return (
    <main>
      <Hero />
      <FeaturedProductsClient products={products} /> {/* ✅ only array passed */}
    </main>
  )
}

import * as productService from "@/services/productService"
import Breadcrumb from "./_components/Breadcrumb"
import ProductGallery from "./_components/ProductGallery"
import ProductInfo from "./_components/ProductInfo"
import ProductDescription from "./_components/ProductDescription"

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await productService.getProductBySlugService(params.slug)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <a href="/products" className="text-primary underline">Back to Products</a>
      </div>
    )
  }

  const mappedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: undefined,
    rating: 4.5,
    reviews: 0,
    description: (product as any).description ?? "No description provided",
    features: (product as any).features ?? [],
    images: (product as any).images?.length ? (product as any).images : ["https://via.placeholder.com/600"],
    sizes: (product as any).sizes ?? [],
    colors: (product as any).colors ?? [],
    inStock: product.stock > 0,
    stockCount: product.stock,
    badge: (product as any).badge,
    category: (product as any).category,
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb product={mappedProduct} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={mappedProduct.images} name={mappedProduct.name} />
          <ProductInfo product={mappedProduct} />
        </div>
      </div>
      <ProductDescription product={mappedProduct} />
    </div>
  )
}

import ProductCard from "./ProductCard"


export default function FeaturedProductsClient({ products }: { products: any[] }) {
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

"use client"

export default function ProductDescription({ product }: { product: any }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <p className="text-muted-foreground">{product.description}</p>

      {product.features?.length > 0 && (
        <ul className="list-disc pl-6 mt-4 space-y-1">
          {product.features.map((f: string, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

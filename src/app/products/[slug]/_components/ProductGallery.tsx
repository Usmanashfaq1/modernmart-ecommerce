"use client"

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-xl border">
        <img src={images[0]} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div key={i} className="aspect-square border rounded-lg overflow-hidden">
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

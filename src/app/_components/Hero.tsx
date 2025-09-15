export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary/90 to-primary text-white py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Style
        </h1>
        <p className="text-xl mb-8">
          Premium urban fashion for the modern generation
        </p>
        <a
          href="/products"
          className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </section>
  )
}

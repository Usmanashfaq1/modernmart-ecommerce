import { PrismaClient } from "../src/generated/prisma/index.js"
const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Seed categories
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Phones, laptops, and gadgets",
    },
  })

  const fashion = await prisma.category.create({
    data: {
      name: "Fashion",
      slug: "fashion",
      description: "Clothes and accessories",
    },
  })

  // Seed products
  await prisma.product.create({
    data: {
      name: "iPhone 15",
      slug: "iphone-15",
      description: "Latest Apple iPhone",
      price: 999,
      stock: 10,
      images: ["https://example.com/iphone15.jpg"],
      categoryId: electronics.id,
    },
  })

  await prisma.product.create({
    data: {
      name: "T-shirt",
      slug: "t-shirt",
      description: "100% cotton",
      price: 20,
      stock: 100,
      images: ["https://example.com/tshirt.jpg"],
      categoryId: fashion.id,
    },
  })

  console.log("✅ Seeding complete")
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

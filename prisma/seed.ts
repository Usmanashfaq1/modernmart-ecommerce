import { PrismaClient } from "@/generated/prisma/index"
import * as productService  from '@/services/productService'; // adjust path

const prisma = new PrismaClient();


async function main() {
  await productService.bulkCreateAndReturnService([
    {
      name: "Test Product 1",
      slug: "test-product-1",
      description: "This is product 1",
      price: 100,
      stock: 10,
      images: ["https://via.placeholder.com/150"],
    },
    {
      name: "Test Product 2",
      slug: "test-product-2",
      description: "This is product 2",
      price: 200,
      stock: 5,
      images: ["https://via.placeholder.com/150"],
    },
  ]);
}

main()
  .then(() => console.log("Seeding finished ✅"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "../src/generated/prisma/index.js";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Seed Users ---
  const user1Id = uuidv4();
  const user2Id = uuidv4();

  const user1 = await prisma.user.create({
    data: {
      id: user1Id,
      email: "usmanx458@gmail.com",
      name: "Usman",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: user2Id,
      email: "alice@example.com",
      name: "Alice",
      role: "ADMIN",
    },
  });

  // --- Seed Categories ---
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Phones, laptops, and gadgets",
    },
  });

  const fashion = await prisma.category.create({
    data: {
      name: "Fashion",
      slug: "fashion",
      description: "Clothes and accessories",
    },
  });

  // --- Seed Products ---
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15",
      slug: "iphone-15",
      description: "Latest Apple iPhone",
      price: 999,
      stock: 10,
      images: ["https://example.com/iphone15.jpg"],
      categoryId: electronics.id,
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: "T-shirt",
      slug: "t-shirt",
      description: "100% cotton",
      price: 20,
      stock: 100,
      images: ["https://example.com/tshirt.jpg"],
      categoryId: fashion.id,
    },
  });

  // --- Seed Orders ---
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: "PENDING",
      total: iphone.price,
      shippingAddress: "123 Main St, City",
      items: {
        create: [
          {
            productId: iphone.id,
            quantity: 1,
            price: iphone.price,
          },
        ],
      },
    },
  });

  // --- Seed Reviews ---
  await prisma.review.create({
    data: {
      productId: iphone.id,
      userId: user1.id,
      rating: 5,
      comment: "Amazing phone!",
    },
  });

  await prisma.review.create({
    data: {
      productId: tshirt.id,
      userId: user2.id,
      rating: 4,
      comment: "Comfortable and good quality",
    },
  });

  // --- Seed Cart ---
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
      items: {
        create: [
          {
            productId: tshirt.id,
            quantity: 2,
          },
        ],
      },
    },
  });

  console.log("✅ Seeding complete");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

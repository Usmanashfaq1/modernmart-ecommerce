import { prisma } from "@/lib/prisma/prisma";
import { Product } from "@/generated/prisma";

// Create a new product
export async function createProduct(
  data: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  return prisma.product.create({ data });
}

// Bulk create (returns count only)
export async function bulkCreateProducts(
  data: Omit<Product, "id" | "createdAt">[]
): Promise<number> {
  const result = await prisma.product.createMany({
    data,
    skipDuplicates: true,
  });
  return result.count;
}

// Bulk create and return inserted rows
export async function bulkCreateAndReturn(
  data: Omit<Product, "id" | "createdAt">[]
): Promise<Product[]> {
  return prisma.$transaction(
    data.map((item) => prisma.product.create({ data: item }))
  );
}

export async function findById(id: number): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}

export async function findBySlug(slug: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { slug } });
}

export async function findAll(
  page = 1,
  limit = 10
): Promise<{ products: Product[]; total: number }> {
  const skip = (page - 1) * limit;

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  return { products, total };
}

export async function searchProducts(
  query: string,
  page = 1,
  limit = 10
): Promise<{ products: Product[]; total: number }> {
  const skip = (page - 1) * limit;

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return { products, total };
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product> {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: number): Promise<Product> {
  return prisma.product.delete({ where: { id } });
}

export async function updateStock(
  id: number,
  newStock: number
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: { stock: newStock },
  });
}

export async function decrementStock(
  id: number,
  quantity: number
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: { stock: { decrement: quantity } },
  });
}

export async function incrementStock(
  id: number,
  quantity: number
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: { stock: { increment: quantity } },
  });
}

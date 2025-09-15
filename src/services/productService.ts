import { Product } from "@/generated/prisma";
import * as productRepository from "@/respositories/productRespository"

export async function createProductService(
  data: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  const existing = await productRepository.findBySlug(data.slug);
  if (existing) throw new Error("Product with this slug already exists");

  return productRepository.createProduct(data);
}

export async function bulkCreateProductsService(
  data: Omit<Product, "id" | "createdAt">[]
): Promise<number> {
  return productRepository.bulkCreateProducts(data);
}

export async function bulkCreateAndReturnService(
  data: Omit<Product, "id" | "createdAt">[]
): Promise<Product[]> {
  return productRepository.bulkCreateAndReturn(data);
}

export async function getProductByIdService(
  id: number
): Promise<Product | null> {
  return productRepository.findById(id);
}

export async function getAllProductsService(
  page = 1,
  limit = 10
): Promise<{ products: Product[]; total: number }> {
  return productRepository.findAll(page, limit);
}

export async function searchProductsService(
  query: string,
  page = 1,
  limit = 10
): Promise<{ products: Product[]; total: number }> {
  return productRepository.searchProducts(query, page, limit);
}

export async function updateProductService(
  id: number,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product> {
  const existing = await productRepository.findById(id);
  if (!existing) throw new Error("Product not found");

  return productRepository.updateProduct(id, data);
}

export async function deleteProductService(id: number): Promise<Product> {
  const existing = await productRepository.findById(id);
  if (!existing) throw new Error("Product not found");

  return productRepository.deleteProduct(id);
}

export async function updateStockService(
  id: number,
  newStock: number
): Promise<Product> {
  return productRepository.updateStock(id, newStock);
}

export async function decrementStockService(
  id: number,
  quantity: number
): Promise<Product> {
  return productRepository.decrementStock(id, quantity);
}

export async function incrementStockService(
  id: number,
  quantity: number
): Promise<Product> {
  return productRepository.incrementStock(id, quantity);
}

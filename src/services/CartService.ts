import { CartRepository } from "@/respositories/cartRepository"

export class CartService {
  static async getUserCart(userId: string) {
    const items = await CartRepository.getCartItems(userId)
    return items.map(i => ({
      id: i.product.id,
      name: i.product.name,
      slug: i.product.slug,
      price: i.product.price,
      originalPrice: i.product.price,
      image: i.product.images[0],
      quantity: i.quantity,
      inStock: i.product.stock > 0,
    }))
  }

  static async mergeCart(userId: string, guestItems: { id: number; quantity: number }[]) {
    for (const item of guestItems) {
      await CartRepository.addOrUpdateCartItem(userId, { productId: item.id, quantity: item.quantity })
    }
    return this.getUserCart(userId)
  }
}

import { prisma } from "@/lib/prisma/prisma"

export class CartRepository {
  static async getCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    })
  }

  static async createCart(userId: string) {
    return prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: true } } },
    })
  }

  static async addOrUpdateCartItem(userId: string, item: { productId: number; quantity: number }) {
    let cart = await this.getCartByUserId(userId)
    if (!cart) cart = await this.createCart(userId)

    const existingItem = cart.items.find(i => i.productId === item.productId)

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      })
    } else {
      return prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      })
    }
  }

  static async getCartItems(userId: string) {
    const cart = await this.getCartByUserId(userId)
    if (!cart) return []
    return cart.items.map(i => ({
      id: i.productId,
      quantity: i.quantity,
      product: i.product,
    }))
  }
}

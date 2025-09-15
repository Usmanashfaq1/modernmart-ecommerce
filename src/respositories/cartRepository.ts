// repositories/cartRepository.ts
import { prisma } from "@/lib/prisma/prisma"; // Adjust import based on your setup

export interface CartItemData {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

// Get user's cart with all items and product details
export async function getUserCart(userId: string) {
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // Include full product details
          },
        },
      },
    });

    // If no cart exists, create one
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  } catch (error) {
    console.error("❌ Error getting user cart:", error);
    throw new Error("Failed to get cart");
  }
}

// Add item to cart or update quantity if exists
export async function addToCart(userId: string, itemData: CartItemData) {
  try {
    // Get or create user's cart
    let cart = await getUserCart(userId);

    // Check if item already exists in cart (same product, size, color)
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: itemData.productId,
        // Add size and color matching if your schema supports it
        // size: itemData.size,
        // color: itemData.color,
      },
    });

    if (existingItem) {
      // Update quantity if item exists
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { 
          quantity: existingItem.quantity + itemData.quantity 
        },
        include: { product: true },
      });
      
      console.log("✅ Cart item quantity updated:", updatedItem.id);
      return updatedItem;
    } else {
      // Add new item to cart
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
          // size: itemData.size, // Add if your schema has these fields
          // color: itemData.color,
        },
        include: { product: true },
      });
      
      console.log("✅ New item added to cart:", newItem.id);
      return newItem;
    }
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      console.log("✅ Cart item removed:", cartItemId);
      return null;
    } else {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
        include: { product: true },
      });
      console.log("✅ Cart item updated:", updatedItem.id);
      return updatedItem;
    }
  } catch (error) {
    console.error("❌ Error updating cart item:", error);
    throw new Error("Failed to update cart item");
  }
}

// Remove item from cart
export async function removeFromCart(cartItemId: number) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
    console.log("✅ Item removed from cart:", cartItemId);
    return true;
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
}

// Clear entire cart (useful after checkout)
export async function clearCart(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      console.log("✅ Cart cleared for user:", userId);
    }
    
    return true;
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}

// Get cart item count for header badge
export async function getCartItemCount(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) return 0;

    // Sum all quantities
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems;
  } catch (error) {
    console.error("❌ Error getting cart count:", error);
    return 0;
  }
}
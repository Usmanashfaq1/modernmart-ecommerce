// // app/actions/cart.ts
// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/supabaseServer'
// import * as cartRepo from '@/respositories/cartRepository'

// // Add item to cart
// export async function addToCartAction(formData: FormData) {
//   // Get current user
//   const supabase = await createClient()
//   const { data: { user }, error: authError } = await supabase.auth.getUser()

//   // Redirect to login if not authenticated
//   if (authError || !user) {
//     redirect('/login?message=Please login to add items to cart')
//   }

//   // Extract form data
//   const productId = parseInt(formData.get('productId') as string)
//   const quantity = parseInt(formData.get('quantity') as string) || 1
//   const size = formData.get('size') as string
//   const color = formData.get('color') as string

//   // Validation
//   if (!productId || productId <= 0) {
//     throw new Error('Invalid product ID')
//   }
//   if (quantity <= 0) {
//     throw new Error('Quantity must be greater than 0')
//   }

//   try {
//     // Add to cart
//     await cartRepo.addToCart(user.id, {
//       productId,
//       quantity,
//       size,
//       color,
//     })

//     console.log(`✅ Added to cart: Product ${productId}, Quantity ${quantity}`)

//     // Revalidate pages that show cart data
//     revalidatePath('/cart')
//     revalidatePath('/') // For header cart count
//     revalidatePath('/products')

//     return { success: true, message: 'Item added to cart!' }
//   } catch (error: any) {
//     console.error('❌ Add to cart error:', error.message)
//     throw new Error(error.message || 'Failed to add item to cart')
//   }
// }

// // Update cart item quantity  
// export async function updateCartQuantityAction(formData: FormData) {
//   const supabase = await createClient()
//   const { data: { user }, error } = await supabase.auth.getUser()

//   if (error || !user) {
//     redirect('/login')
//   }

//   const cartItemId = parseInt(formData.get('cartItemId') as string)
//   const quantity = parseInt(formData.get('quantity') as string)

//   if (!cartItemId || quantity < 0) {
//     throw new Error('Invalid cart item or quantity')
//   }

//   try {
//     await cartRepo.updateCartItemQuantity(cartItemId, quantity)
    
//     console.log(`✅ Updated cart item ${cartItemId} to quantity ${quantity}`)
    
//     revalidatePath('/cart')
//     revalidatePath('/') // For header cart count
    
//     return { success: true }
//   } catch (error: any) {
//     console.error('❌ Update cart error:', error.message)
//     throw new Error('Failed to update cart item')
//   }
// }

// // Remove item from cart
// export async function removeFromCartAction(formData: FormData) {
//   const supabase = await createClient()
//   const { data: { user }, error } = await supabase.auth.getUser()

//   if (error || !user) {
//     redirect('/login')
//   }

//   const cartItemId = parseInt(formData.get('cartItemId') as string)

//   if (!cartItemId) {
//     throw new Error('Invalid cart item ID')
//   }

//   try {
//     await cartRepo.removeFromCart(cartItemId)
    
//     console.log(`✅ Removed cart item ${cartItemId}`)
    
//     revalidatePath('/cart')
//     revalidatePath('/') // For header cart count
    
//     return { success: true }
//   } catch (error: any) {
//     console.error('❌ Remove from cart error:', error.message)
//     throw new Error('Failed to remove item from cart')
//   }
// }

// // Get cart data for pages
// export async function getCartData() {
//   const supabase = await createClient()
//   const { data: { user }, error } = await supabase.auth.getUser()

//   if (error || !user) {
//     return { items: [], totalItems: 0, totalPrice: 0 }
//   }

//   try {
//     const cart = await cartRepo.getUserCart(user.id)
    
//     // Calculate totals
//     const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
//     const totalPrice = cart.items.reduce((sum, item) => 
//       sum + (item.product.price * item.quantity), 0
//     )

//     return {
//       items: cart.items,
//       totalItems,
//       totalPrice,
//       cartId: cart.id
//     }
//   } catch (error) {
//     console.error('❌ Error getting cart data:', error)
//     return { items: [], totalItems: 0, totalPrice: 0 }
//   }
// }

// // Get cart count for header
// export async function getCartCount() {
//   const supabase = await createClient()
//   const { data: { user }, error } = await supabase.auth.getUser()

//   if (error || !user) {
//     return 0
//   }

//   try {
//     return await cartRepo.getCartItemCount(user.id)
//   } catch (error) {
//     console.error('❌ Error getting cart count:', error)
//     return 0
//   }
// }
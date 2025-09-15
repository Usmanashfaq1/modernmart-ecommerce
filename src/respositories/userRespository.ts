import { prisma } from "@/lib/prisma/prisma"; 

export async function createUserProfile({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name?: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        id, // Supabase UUID
        email,
        name: name || null,
        role: "USER", // Default role
      },
    });
    
    console.log("✅ User profile created in DB:", user.id);
    return user;
    
  } catch (error: any) {
    console.error("❌ Failed to create user in DB:", error.message);
    throw new Error("Database error: Failed to create user profile");
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Get latest 5 orders
        },
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    
    return user;
  } catch (error) {
    console.error("❌ Failed to get user:", error);
    return null;
  }
}
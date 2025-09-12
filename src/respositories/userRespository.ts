import { prisma } from "@/lib/prisma"

export const createUserProfile = async (user: {
  id: string
  email: string
  name?: string
  role?: "USER" | "ADMIN"
}) =>
  await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name ?? null,
      role: user.role ?? "USER",
    },
  })

export const findUserById = async (id: string) =>
  await prisma.user.findUnique({ where: { id } })

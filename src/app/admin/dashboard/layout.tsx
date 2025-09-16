// app/admin/layout.tsx
import Link from "next/link"
import { createClient } from "@/lib/supabase/supabaseServer"
import { getUserById } from "@/respositories/userRespository"
import { redirect } from "next/navigation"
import { logout } from "@/app/admin/login/actions"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect("/login?redirect=/admin")

  const profile = await getUserById(user.id)
  if (!profile || profile.role !== "ADMIN") redirect("/login?redirect=/admin")

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <p className="mb-4 text-sm text-muted-foreground">Hi, {profile.name}</p>
          <nav className="flex flex-col gap-2">
            <Link href="/admin/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link href="/admin/dashboard/products" className="hover:text-primary">Products</Link>
            <Link href="/admin/dashboard/products/create" className="hover:text-primary">Add Product</Link>
          </nav>
        </div>

        {/* Logout */}
        <form action={logout} className="mt-6">
          <Button type="submit" variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}

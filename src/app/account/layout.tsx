import { logout } from '@/app/admin/login/actions'
import { createClient } from '@/lib/supabase/supabaseServer'
import { redirect } from 'next/navigation'
import {findUserById} from "@/respositories/userRespository"

async function CustomerHeader() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Customer Account</h1>
        <form action={logout}>
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  )
}

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Protect the admin routes
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }
  // Fetch user profile from DB
  const profile = await findUserById(data.user.id);

  if (!profile || profile.role == "ADMIN") redirect("/login");

  // Optional: Check if user is admin
  // You might want to check user role here

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerHeader />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
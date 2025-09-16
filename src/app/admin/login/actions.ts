'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/supabaseServer'
import { getUserById } from '@/respositories/userRespository'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/admin/login?error=Please fill in all fields')
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !authData.user) {
    console.error('❌ Login error:', error?.message)
    return redirect(`/admin/login?error=${encodeURIComponent(error?.message || 'Login failed')}`)
  }

  console.log('✅ Login successful:', authData.user.id)

  // Fetch user profile from your database
  const profile = await getUserById(authData.user.id)

  if (!profile || profile.role !== 'ADMIN') {
    // Log out the user from Supabase if not admin
    await supabase.auth.signOut()
    return redirect('/admin/login?error=Access denied')
  }

  // Refresh cache
  revalidatePath('/admin/dashboard', 'layout')

  // Redirect to admin dashboard
  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('❌ Logout error:', error.message)
    return redirect('/error')
  }

  revalidatePath('/admin/dashboard', 'layout')

  redirect('/admin/login')
}

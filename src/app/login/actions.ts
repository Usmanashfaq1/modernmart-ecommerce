'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/supabaseServer'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // ✅ Basic validation
  if (!email || !password) {
    return redirect('/login?error=Please fill in all fields')
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('❌ Login error:', error.message)
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  console.log('✅ Login successful:', authData.user?.id)

  // ✅ Refresh cache
  revalidatePath('/', 'layout')

  // ✅ Redirect on success (outside of error handling)
  redirect('/account')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('❌ Logout error:', error.message)
    return redirect('/error')
  }

  // ✅ Refresh cache
  revalidatePath('/', 'layout')

  // ✅ Redirect on success
  redirect('/login')
}

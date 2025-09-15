'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signUp } from "@/services/authService";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  let user;

  try {
    user = await signUp(email, password, name);
    console.log("✅ User created successfully:", user.id);

    // Revalidate cache
    revalidatePath("/", "layout");

  } catch (err: any) {
    console.error("❌ Real signup error:", err);
    return redirect(`/register?error=${encodeURIComponent(err.message || "Signup failed")}`);
  }

  // ✅ Success redirect (outside the try/catch, so it won’t get caught as an error)
  redirect("/account");
}

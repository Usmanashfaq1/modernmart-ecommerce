'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signUp } from "@/services/authService";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await signUp(email, password, name);

    // ✅ Cache revalidation (if needed)
    revalidatePath("/", "layout");

    // ✅ Redirect on success
    
  } catch (err) {
    console.error("Signup failed:", err);
    redirect("/error");
  }
  redirect("/account");
}

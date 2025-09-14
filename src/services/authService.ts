import { createClient } from "@/lib/supabase/supabaseServer";
import * as userRepo from "@/respositories/userRespository";
import validator from "validator";

export const signUp = async (
  email: string,
  password: string,
  name?: string
) => {
  const trimmedEmail = email.trim();
  if (!validator.isEmail(trimmedEmail)) throw new Error("Invalid email");
  if (!password || password.length < 6) throw new Error("Password must be at least 6 characters");

  const supabase = await createClient();

  // 1. Create user in Supabase
  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("No user returned from Supabase");

  try {
    // 2. Create profile in your DB
    await userRepo.createUserProfile({
      id: data.user.id,
      email: data.user.email!,
      name,
    });
  } catch (err) {
    // 3. Rollback Supabase signup
    await supabase.auth.admin.deleteUser(data.user.id);
    throw new Error("Failed to create user profile in DB, signup rolled back");
  }

  return data.user;
};


// export const login = async (email: string, password: string) => {
//   const trimmedEmail = email.trim()
//   if (!validator.isEmail(trimmedEmail)) {
//     throw new Error("Invalid email address")
//   }

//   if (!password || password.length < 6) {
//     throw new Error("Password must be at least 6 characters")
//   }

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: trimmedEmail,
//     password,
//   })

//   if (error) throw new Error(error.message)
//   if (!data.user) throw new Error("Login failed: user not found")

//   const profile = await userRepo.findUserById(data.user.id)

//   return {
//     user: data.user,
//     profile,
//     session: data.session,
//   }
// }



// export const signout=async ()=> 
// {
//   const {error}=await supabase.auth.signOut();

// }


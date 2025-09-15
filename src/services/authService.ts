import { createClient } from "@/lib/supabase/supabaseServer";
import * as userRepo from "@/respositories/userRespository";
import validator from "validator";

export const signUp = async (
  email: string,
  password: string,
  name?: string
) => {
  const trimmedEmail = email.trim();
  
  // Validation
  if (!validator.isEmail(trimmedEmail)) {
    throw new Error("Please enter a valid email address");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (!name || name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  const supabase = await createClient();

  try {
    // 1. Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { 
          name: name.trim(),
          display_name: name.trim()
        },
      },
    });

    if (error) {
      console.error("❌ Supabase signup error:", error.message);
      throw new Error(error.message);
    }
    
    if (!data.user) {
      throw new Error("Failed to create user account");
    }

    console.log("✅ Supabase user created:", data.user.id);

    // 2. Create user profile in your Prisma DB
    try {
      await userRepo.createUserProfile({
        id: data.user.id,
        email: data.user.email!,
        name: name.trim(),
      });
      
      console.log("✅ User profile created in DB");
      
    } catch (dbError: any) {
      console.error("❌ DB profile creation failed:", dbError.message);
      
      // 3. Rollback Supabase signup if DB creation fails
      try {
        await supabase.auth.admin.deleteUser(data.user.id);
        console.log("✅ Supabase user deleted (rollback)");
      } catch (rollbackError) {
        console.error("❌ Rollback failed:", rollbackError);
      }
      
      throw new Error("Failed to create user profile. Please try again.");
    }

    return data.user;
    
  } catch (error: any) {
    console.error("❌ SignUp error:", error.message);
    throw error;
  }
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


// /app/api/auth/signup/route.ts (Next.js 13 app router)
import { NextRequest, NextResponse } from "next/server"
import * as authService from "@/services/authService"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 🔹 Debugging: log the received body
    console.log("Raw request body from Postman:", body)
    console.log(`Email received: "${body.email}"`) // shows invisible characters
    console.log(`Password received: "${body.password}"`)

    const user = await authService.signUp(
      body.email,
      body.password,
      body.name
    )

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 400 }
    )
  }
}

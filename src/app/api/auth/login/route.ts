import { NextResponse } from "next/server"
import * as authService from "@/services/authService"

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()
    const session = await authService.login(email, password)
    return NextResponse.json({ message: "Login successful", session })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

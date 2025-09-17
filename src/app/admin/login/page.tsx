// app/admin/login/page.tsx
import { Suspense } from "react"
import LoginContent from "./loginContent"

export const dynamic = "force-dynamic" // optional, but safe

export default function Page() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginContent />
    </Suspense>
  )
}

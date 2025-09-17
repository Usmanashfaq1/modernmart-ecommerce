'use client'

import { Suspense } from "react"
import RegisterContent from "./registerContent"

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  )
}

"use client"

import { signOut } from "next-auth/react"
import AuthProvider from "../../src/Auth/AuthProvider"
import { useSession } from "next-auth/react"

function Footer() {
  const { status } = useSession()

  if (status === "loading") return null

  if (status === "unauthenticated") return null

  return <button onClick={() => signOut()}>Sign Out</button>
}

export default function FooterWithProvider() {
  return (
    <AuthProvider>
      <Footer />
    </AuthProvider>
  )
}

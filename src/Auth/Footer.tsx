"use client"

import { signOut } from "next-auth/react"
import AuthProvider from "../../src/Auth/AuthProvider"
import { useSession } from "next-auth/react"

function Footer() {
  const { status } = useSession()

  if (status === "loading") return <h3>Loading Auth Footer...</h3>

  if (status === "unauthenticated") return <h3>You are not signed in.</h3>

  return <button onClick={() => signOut()}>Sign Out</button>
}

export default function FooterWithProvider() {
  return (
    <AuthProvider>
      <Footer />
    </AuthProvider>
  )
}

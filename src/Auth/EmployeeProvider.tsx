"use client"

import { useSession } from "next-auth/react"
import { ReactNode } from "react"

export default function EmployeeProvider({
  children,
}: {
  children: ReactNode
}) {
  const { data: session, status } = useSession()

  if (session?.user?.isEmployee && status === "authenticated") {
    console.log("user", session.user)
    return <>{children}</>
  } else if (status === "loading") {
    return (
      <div className="m-auto flex min-h-screen w-full items-center justify-center">
        Loading...
      </div>
    )
  } else {
    return (
      <h1 className="my-20 mx-auto text-center text-2xl">
        You are not an employee. Please sign in to view this page.
      </h1>
    )
  }
}

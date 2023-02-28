import { ReactNode, Suspense } from "react"
import { getCurrentUser } from "../../Auth/session"
import AuthProvider from "../../Auth/AuthProvider"
import EmployeeProvider from "../../Auth/EmployeeProvider"

export const metadata = {
  title: "Admin Page",
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <h1 className="mt-20 text-center text-2xl">
        You are not signed in. Please sign in to view this page.
      </h1>
    )
  }

  console.log("user", user)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row">
        <AuthProvider>
          <EmployeeProvider>{children}</EmployeeProvider>
        </AuthProvider>
      </div>
    </Suspense>
  )
}

import AuthProvider from "../../Auth/AuthProvider"
import Register from "./Register"

export const revalidate = 0

export default function Page() {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>
  )
}

import { Session } from "next-auth"
import { getServerSession } from "next-auth/next"

import authOptions from "../../src/pages/api/auth/[...nextauth]"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = (await getSession()) as Session

  return session?.user
}

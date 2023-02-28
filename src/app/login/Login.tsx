"use client"

import AuthProvider from "../../Auth/AuthProvider"
import Link from "next/link"
import React, { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type FormValues = {
  email: string
  password: string
}

function LoginScreen() {
  const { status } = useSession()

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const values: FormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    })

    form.reset()

    router.push("/")
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return <div>Already logged in</div>
  }

  return (
    <>
      <form className="mx-auto w-1/2" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center text-base">
          Don&apos;t have an account? &nbsp; <hr></hr>
          <button className="default-button">
            <Link href={`/register?redirect=${"/"}`}>Register</Link>
          </button>
        </div>
      </form>
    </>
  )
}

export default function Login({
  providers,
}: {
  providers: Record<string, any>
}) {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  )
}

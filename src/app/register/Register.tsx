"use client"

import Link from "next/link"
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  newsletter: boolean
}

export default function LoginScreen() {
  const { data: session, status } = useSession()

  const router = useRouter()

  type FormFetch = {
    name: string
    email: string
    password: string
    newsletter: boolean
  }

  const formFetch = async (data: FormFetch) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) throw Error(json.message)

    console.log(json)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const values: FormValues = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      // @ts-ignore
      newsletter: formData.get("newsletter") as boolean,
    }

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (values.newsletter === null || values.newsletter === undefined) {
      values.newsletter = false
    }

    formFetch({
      name: values.name,
      email: values.email,
      password: values.password,
      newsletter: values.newsletter,
    })

    form.reset()

    router.push("/login")
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newsletter">Newsletter</label>
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4 text-sm">
          Already have an account?
          <Link
            href={`/login`}
            className="primary-button block w-fit text-Black"
          >
            {" "}
            Log-on-in!
          </Link>
        </div>
      </form>
    </div>
  )
}

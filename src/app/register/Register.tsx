"use client"

import Link from "next/link"
import { useRef } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  newsletter: boolean
  isEmployee: boolean
  isAdmin: boolean
}

export default function LoginScreen() {
  const { status } = useSession()

  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const newsletterRef = useRef<HTMLInputElement>(null)
  const isEmployeeRef = useRef<HTMLInputElement>(null)
  const isAdminRef = useRef<HTMLInputElement>(null)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value
    const newsletter = newsletterRef.current?.checked
    const isEmployee = isEmployeeRef.current?.checked
    const isAdmin = isAdminRef.current?.checked

    const formValues: FormValues = {
      name: name || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      newsletter: newsletter || false,
      isEmployee: isEmployee || false,
      isAdmin: isAdmin || false,
    }

    console.log("formValues", formValues)

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })

    if (response.ok) {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      router.push("/admin")
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return <div>You are already signed in</div>
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={nameRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={emailRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={passwordRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newsletter">Newsletter</label>
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={newsletterRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isEmployee">Employee</label>
          <input
            type="checkbox"
            name="isEmployee"
            id="isEmployee"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={isEmployeeRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isAdmin">Admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            className="w-full p-2 border border-gray-300 rounded-md"
            ref={isAdminRef}
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

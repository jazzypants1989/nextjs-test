import FooterWithProvider from "@/Auth/Footer"
import React from "react"

export const metadata = {
  title: "Electric Larry's",
  applicationName: "Electric Larry's",
  description:
    "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles.",
  keywords:
    "antiques, collectibles, oddities, Carbondale, Illinois, small business",
  authors: { name: "Jesse Pence", url: "https://jazzypants.dev" },
  themeColor: "#0050C0",
  creator: "Jesse Pence, Randall Majors, Meagan Majors",
  publisher: "Jesse Pence",
  generator: "electriclarrys.vercel.app",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/admin">Admin</a>
            </li>
          </ul>
        </nav>
        {children}
        <FooterWithProvider />
      </body>
    </html>
  )
}

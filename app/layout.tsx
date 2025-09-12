import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StarBackground from "@/components/star-background"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LiveEasy",
  description: "A no-broker platform exclusively for students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StarBackground />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}

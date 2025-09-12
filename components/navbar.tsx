"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { User, LogOut, Home, Info } from "lucide-react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("liveEasyLoggedIn")
      setIsLoggedIn(loginStatus === "true")
    }

    checkLoginStatus()
  }, [pathname])

  const handleLogout = () => {
    // Clear all login-related data
    localStorage.removeItem("liveEasyLoggedIn")
    localStorage.removeItem("liveEasyUserType")
    localStorage.removeItem("liveEasyLoginTime")
    localStorage.removeItem("buyerLoggedIn")
    localStorage.removeItem("sellerLoggedIn")
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    localStorage.removeItem("userLocation")

    setIsLoggedIn(false)
    router.push("/")
  }

  // Only show navbar on home page
  if (pathname !== "/") {
    return null
  }

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Home className="w-6 h-6" />
            LiveEasy
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-white hover:text-blue-300 transition-colors flex items-center gap-2">
              <Info className="w-5 h-5" />
              About Us
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

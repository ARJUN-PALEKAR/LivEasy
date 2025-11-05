"use client"

import Link from "next/link"
import { Home, Building, ChefHat } from "lucide-react"
import { useEffect, useState } from "react"

// Simple login check function
const isUserLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("liveEasyLoggedIn") === "true"
  }
  return false
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn())
  }, [])

  // Function to get the correct link based on login status
  const getBuyLink = () => {
    return isLoggedIn ? "/buy" : "/login?redirect=/buy&type=buy"
  }

  const getSellLink = () => {
    return isLoggedIn ? "/sell" : "/login?redirect=/sell&type=sell"
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">LivEasy</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">Student Housing & Services Platform</p>
        <p className="text-lg text-gray-400">Find Rentals, List Properties, and Connect with Cooks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <Link href={getBuyLink()} className="group">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 p-8 text-center">
            <div className="mb-6">
              <Home className="w-16 h-16 text-blue-400 mx-auto group-hover:text-blue-300 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Find Housing</h2>
            <p className="text-gray-300 mb-6">
              Find affordable rental properties near your campus. Move out of hostels and save money.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Browse Properties
            </button>
          </div>
        </Link>

        <Link href={getSellLink()} className="group">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 p-8 text-center">
            <div className="mb-6">
              <Building className="w-16 h-16 text-green-400 mx-auto group-hover:text-green-300 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">List Property</h2>
            <p className="text-gray-300 mb-6">
              List your property for student rentals. Connect directly with students looking for housing.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
              List Now
            </button>
          </div>
        </Link>

        <Link href="/caters" className="group">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 p-8 text-center">
            <div className="mb-6">
              <ChefHat className="w-16 h-16 text-purple-400 mx-auto group-hover:text-purple-300 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Find Cooks</h2>
            <p className="text-gray-300 mb-6">
              Find personal cooks and cooking services tailored for student budgets and preferences.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
              Find Cooks
            </button>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400 text-sm">Made by students, for students • No broker fees • Direct connections</p>
      </div>
    </div>
  )
}

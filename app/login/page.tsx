"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Lock, MapPin, Navigation } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showLocationRequest, setShowLocationRequest] = useState(false)
  const [locationRequesting, setLocationRequesting] = useState(false)
  const [locationError, setLocationError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"
  const loginType = searchParams.get("type") || "general"

  const getPageTitle = () => {
    switch (loginType) {
      case "buy":
        return "Login to Browse Properties"
      case "sell":
        return "Login to List Properties"
      case "profile":
        return "Login to Access Profile"
      default:
        return "Login to LiveEasy"
    }
  }

  const setLoginStatus = (userType) => {
    // Set a single, persistent login flag
    localStorage.setItem("liveEasyLoggedIn", "true")
    localStorage.setItem("liveEasyUserType", userType)
    localStorage.setItem("liveEasyLoginTime", Date.now().toString())

    // Keep the old flags for compatibility but they're all true now
    localStorage.setItem("buyerLoggedIn", "true")
    localStorage.setItem("sellerLoggedIn", "true")
    localStorage.setItem("userLoggedIn", "true")
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // Check against all valid credentials
    const validCredentials = [
      { username: "Test1", password: "Test@12345", type: "buyer" },
      { username: "Test2", password: "Test@12345", type: "seller" },
    ]

    const validUser = validCredentials.find((cred) => cred.username === username && cred.password === password)

    if (validUser) {
      // For "sell" type (List Properties), skip location request
      if (loginType === "sell") {
        // Set a default location for sellers (they don't need precise location)
        localStorage.setItem("userLocation", "Your Area")
        setLoginStatus(validUser.type)
        router.push(redirectTo)
        return
      }

      // For other types, check if location is already stored
      const storedLocation = localStorage.getItem("userLocation")
      if (storedLocation) {
        setLoginStatus(validUser.type)
        router.push(redirectTo)
      } else {
        // Need to get location first
        setShowLocationRequest(true)
      }
    } else {
      setError("Invalid username or password")
    }
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    setLocationRequesting(true)
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Store location and complete login
        localStorage.setItem("userLocation", "Ramapuram, Chennai")

        const validCredentials = [
          { username: "Test1", password: "Test@12345", type: "buyer" },
          { username: "Test2", password: "Test@12345", type: "seller" },
        ]

        const validUser = validCredentials.find((cred) => cred.username === username && cred.password === password)

        if (validUser) {
          setLoginStatus(validUser.type)
        }

        setLocationRequesting(false)
        router.push(redirectTo)
      },
      (error) => {
        setLocationRequesting(false)
        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Using default location."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable. Using default location."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Using default location."
            break
          default:
            errorMessage = "Location error. Using default location."
            break
        }
        setLocationError(errorMessage)
        // Use default location and proceed
        setTimeout(() => {
          localStorage.setItem("userLocation", "Ramapuram, Chennai")

          const validCredentials = [
            { username: "Test1", password: "Test@12345", type: "buyer" },
            { username: "Test2", password: "Test@12345", type: "seller" },
          ]

          const validUser = validCredentials.find((cred) => cred.username === username && cred.password === password)

          if (validUser) {
            setLoginStatus(validUser.type)
          }

          router.push(redirectTo)
        }, 2000)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  if (showLocationRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Location Access</h1>
            <p className="text-gray-400 text-sm sm:text-base">We need your location to show nearby properties</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 text-center">
            <Navigation className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">Allow Location Access</h2>
            <p className="text-gray-300 mb-6 text-sm">
              This is a one-time request. Your location will be saved for future sessions.
            </p>

            {locationError && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-300 text-sm">{locationError}</p>
              </div>
            )}

            <button
              onClick={requestLocation}
              disabled={locationRequesting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors text-sm sm:text-base flex items-center gap-2 mx-auto"
            >
              <MapPin className="w-4 h-4" />
              {locationRequesting ? "Getting Location..." : "Allow Location Access"}
            </button>

            <p className="text-gray-400 text-xs sm:text-sm mt-4">
              Your location is only used to show nearby properties and is stored locally.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors mb-4 mx-auto sm:mx-0">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{getPageTitle()}</h1>
          <p className="text-gray-400 text-sm sm:text-base">Enter your credentials to continue</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Login
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Haven't signed up?{" "}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

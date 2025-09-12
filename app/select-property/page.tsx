"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Phone, Mail, Calendar, FileText } from "lucide-react"

// Simple login check function
const isUserLoggedIn = () => {
  return localStorage.getItem("liveEasyLoggedIn") === "true"
}

export default function SelectPropertyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [property, setProperty] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "student",
    moveInDate: "",
    duration: "",
    additionalInfo: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Simple login check
    if (!isUserLoggedIn()) {
      router.push("/login?redirect=/select-property&type=buy")
      return
    }
    setIsLoggedIn(true)

    // Get property data from URL params - only run once
    const propertyData = searchParams.get("property")
    if (propertyData) {
      try {
        const parsedProperty = JSON.parse(decodeURIComponent(propertyData))
        setProperty(parsedProperty)
        setIsLoading(false)
      } catch (error) {
        console.error("Error parsing property data:", error)
        router.push("/buy")
      }
    } else {
      router.push("/buy")
    }
  }, []) // Remove searchParams from dependencies to prevent infinite loop

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create selection data
    const selectionData = {
      property: property,
      applicant: formData,
      submittedAt: new Date().toISOString(),
      status: "pending",
    }

    // Save to localStorage (in profile)
    localStorage.setItem("selectedProperty", JSON.stringify(property))

    setIsSubmitted(true)

    // Redirect to profile after 2 seconds
    setTimeout(() => {
      router.push("/profile")
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-green-300 mb-4">Your application for {property.name} has been submitted successfully.</p>
            <p className="text-gray-400 text-sm">Redirecting to your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8 pt-4 sm:pt-8">
          <Link href={`/buy/${property.id}`}>
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Property
            </button>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">Select Property</h1>
        </div>

        {/* Property Summary */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Property Details</h2>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              className="w-20 h-20 rounded-lg object-cover border border-white/20"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{property.name}</h3>
              <p className="text-gray-300 text-sm mb-2">{property.address}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-green-400 font-semibold">₹{property.rent.toLocaleString()}/month</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{property.details.type}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{property.details.furnished}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Occupation</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              >
                <option value="student">Student</option>
                <option value="working_professional">Working Professional</option>
                <option value="freelancer">Freelancer</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Move-in Date and Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">
                  Preferred Move-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Duration (months)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="12"
                  min="1"
                  max="60"
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Additional Information</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Any additional information you'd like to share with the property owner..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-6 sm:mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">What happens next?</h3>
          <ul className="text-blue-200 space-y-2 text-sm sm:text-base">
            <li>• Your application will be saved to your profile</li>
            <li>• The property owner will be notified of your interest</li>
            <li>• You can track your application status in your profile</li>
            <li>• The owner may contact you directly for further discussion</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

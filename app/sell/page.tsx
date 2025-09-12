"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, MapPin, DollarSign, FileText, Phone } from "lucide-react"

// Simple login check function
const isUserLoggedIn = () => {
  return localStorage.getItem("liveEasyLoggedIn") === "true"
}

export default function SellPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
    type: "",
    area: "",
    furnished: "",
    deposit: "",
    description: "",
    phone: "", // Add this line
    images: [], // Add this line
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedImages, setSelectedImages] = useState([]) // Add this line
  const router = useRouter()

  // Add state for managing user properties
  const [userProperties, setUserProperties] = useState([])

  useEffect(() => {
    // Simple login check
    if (!isUserLoggedIn()) {
      router.push("/login?redirect=/sell&type=sell")
      return
    }
    setIsLoggedIn(true)

    // Load user properties
    loadUserProperties()
    setIsLoading(false)
  }, [router])

  // Add function to load user properties
  const loadUserProperties = () => {
    const savedProperties = localStorage.getItem("userProperties")
    if (savedProperties) {
      setUserProperties(JSON.parse(savedProperties))
    }
  }

  // Add function to remove property
  const removeProperty = (propertyId) => {
    const updatedProperties = userProperties.filter((property) => property.id !== propertyId)
    setUserProperties(updatedProperties)
    localStorage.setItem("userProperties", JSON.stringify(updatedProperties))
  }

  // Add image handling function after handleInputChange
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 4) {
      alert("You can upload maximum 4 images")
      return
    }

    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setSelectedImages(imageUrls)
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }))
  }

  // Update handleSubmit to refresh the list
  const handleSubmit = (e) => {
    e.preventDefault()

    // Create new property object
    const newProperty = {
      id: Date.now(),
      name: formData.name,
      address: formData.address,
      rent: Number.parseInt(formData.rent),
      image: formData.images[0] || "/placeholder.svg?height=200&width=200", // First image as main
      images:
        formData.images.length > 0
          ? formData.images
          : [
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
            ],
      phone: formData.phone, // Add this line
      details: {
        type: formData.type,
        area: formData.area,
        furnished: formData.furnished,
        deposit: Number.parseInt(formData.deposit),
        amenities: ["Basic Amenities"],
        description: formData.description,
      },
    }

    // Save to localStorage
    const existingProperties = localStorage.getItem("userProperties")
    const properties = existingProperties ? JSON.parse(existingProperties) : []
    properties.push(newProperty)
    localStorage.setItem("userProperties", JSON.stringify(properties))

    setIsSubmitted(true)

    // Reset form
    setFormData({
      name: "",
      address: "",
      rent: "",
      type: "",
      area: "",
      furnished: "",
      deposit: "",
      description: "",
      phone: "",
      images: [],
    })
    setSelectedImages([]) // Add this line
  }

  const handleLogout = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 pt-4 sm:pt-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">List Your Property</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-300 text-center text-sm sm:text-base">
              ✅ Property listed successfully! It will now appear in the browse properties section.
            </p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Property Name */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Property Name</label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="e.g., Sunrise Apartments"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Full Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="e.g., 123 College Street, University District"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Contact Phone</label>
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

            {/* Rent and Deposit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Monthly Rent (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleInputChange}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="15000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Security Deposit (₹)</label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="30000"
                  required
                />
              </div>
            </div>

            {/* Property Type and Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Property Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="1RK">1RK</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="e.g., 850 sq ft"
                  required
                />
              </div>
            </div>

            {/* Furnished Status */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Furnished Status</label>
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              >
                <option value="">Select Status</option>
                <option value="Fully furnished">Fully furnished</option>
                <option value="Semi-furnished">Semi-furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Describe your property, nearby amenities, and any special features..."
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm sm:text-base">
                Property Images (Max 4)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-white/20"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-gray-400 text-xs mt-2">First image will be used as the main property image</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              List Property
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-6 sm:mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Listing Guidelines</h3>
          <ul className="text-blue-200 space-y-2 text-sm sm:text-base">
            <li>• Provide accurate information about your property</li>
            <li>• Set competitive rent prices based on market rates</li>
            <li>• Be responsive to student inquiries</li>
            <li>• Ensure the property is student-friendly</li>
          </ul>
        </div>

        {/* Your Listed Properties Section */}
        {userProperties.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Your Listed Properties ({userProperties.length})
            </h3>
            <div className="space-y-4">
              {userProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4"
                >
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-16 h-16 rounded-lg object-cover border border-white/20 mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-white font-semibold text-sm sm:text-base">{property.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">{property.address}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm">
                      <span className="text-green-400 font-semibold">₹{property.rent.toLocaleString()}/month</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{property.details.type}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{property.details.furnished}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-xs sm:text-sm">
                <strong>Note:</strong> Removing a property will immediately remove it from the browse properties section
                and cannot be undone.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

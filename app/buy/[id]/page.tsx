"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Home, Users, Wifi, Phone } from "lucide-react"

// Combined property data (initial + user added)
const getAllProperties = () => {
  const initialProperties = [
    {
      id: 1,
      name: "Mass Residency (Men’s PG)",
      address: "No:5/6, Eswaran Kovil Street, Ramapuram, Chennai – 600089.",
      rent: 7000,
      image: "/prop1.1.png",
      phone: "+91 95001 60822",
      images: [
        "/prop1.3.jpg",
        "/prop1.2.jpg",
        "/prop1.4.jpg",
        "/prop1.5.jpg",
      ],
      details: {
        type: "2 Sharing",
        area: "850 sq ft",
        furnished: "Semi-furnished",
        deposit: 30000,
        amenities: ["WiFi", "Parking", "Security", "Water Supply"],
        description: "Perfect for students! Close to university campus with all basic amenities.",
      },
    },
    {
      id: 2,
      name: "RSD HIFI PG For Men",
    address: "No: 2/6, Kalaignar Street, Shanthi Nagar, Ramapuram, Chennai – 600089",
    rent: 5500,
    image: "/green-residential-building.png",
    phone: "+91 75980 42920",
      images: [
        "/prop2.11.jpg",
        "/prop2.2.jpg",
        "/prop2.3.jpg",
        "/prop2.1.jpg",
      ],
      details: {
        type: "1BHK",
        area: "600 sq ft",
        furnished: "Furnished",
        deposit: 24000,
        amenities: ["WiFi", "Laundry", "Security", "Power Backup"],
        description: "Apartment's ideal for single students.",
      },
    },
    {
      id: 3,
      name: "Sree Hari (Sri Hari) Women’s Hostel",
      address: "VMS Garden / Krishnaveni Nagar, Mugalivakkam (near DLF back gate)",
      rent: 7800,
      image: "/tall-apartment-building.png",
      phone: "+91 8460449824",
      images: [
        "/3.1.jpg",
        "/3.2.jpg",
        "/3.3.jpg",
        "/3.4.jpg",
      ],
      details: {
        type: "1/2BHK",
        area: "852 sq ft",
        furnished: "Semi-furnished",
        deposit: 36000,
        amenities: ["WiFi", "Parking", "Security"],
        description: "Premium apartment in Budget. Perfect for sharing among 3-4 students.",
      },
    },
    {
    id: 4,
    name: "Yube1 Meadows PG/Hostel",
      address: "259H+4RJ, 3/248, Ramapuram, Parthasarathy Nagar, Manapakkam, Ramapuram, Chennai, Tamil Nadu 600089",
      rent: 8500,
    image: "/4.11.jpg",
    phone: "+91 91508 81113",
    images: ["/4.1.jpg", "/4.2.jpg", "/4.3.jpg", "/4.4.jpg"],
    details: {
      type: "1/2BHK",
      area: "400/800 sq ft",
      furnished: "Unfurnished",
      deposit: 16000,
      amenities: ["Water Supply", "Security", "Power Backup"],
      description: "Most affordable option for budget-conscious students.",
    },
  },
    // {
    //   id: 5,
    //   name: "Yube1 Meadows PG/Hostel",
    //   address: "259H+4RJ, 3/248, Ramapuram, Parthasarathy Nagar, Manapakkam, Ramapuram, Chennai, Tamil Nadu 600089",
    //   rent: 8500,
    //   image: "/4.11.jpg",
    //   phone: "+91 54321 09876",
    //   images: [
    //     "/luxury-living-room.png",
    //     "/premium-bedroom.png",
    //     "/designer-kitchen.png",
    //     "/placeholder.svg?height=400&width=600",
    //   ],
    //   details: {
    //     type: "2BHK",
    //     area: "1000 sq ft",
    //     furnished: "Fully furnished",
    //     deposit: 44000,
    //     amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Parking", "Housekeeping"],
    //     description: "Luxury living for students who want the best amenities and comfort.",
    //   },
    // },
  ]

  // Get user-added properties from localStorage
  if (typeof window !== "undefined") {
    const savedProperties = localStorage.getItem("userProperties")
    const userProperties = savedProperties ? JSON.parse(savedProperties) : []
    return [...initialProperties, ...userProperties]
  }

  return initialProperties
}

// Simple login check function
const isUserLoggedIn = () => {
  return localStorage.getItem("liveEasyLoggedIn") === "true"
}

export default function PropertyDetailsPage({ params }) {
  const [property, setProperty] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [propertyId, setPropertyId] = useState(null)
  const [showContact, setShowContact] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Handle params - check if it's a Promise or regular object
    const resolveParams = async () => {
      try {
        let resolvedParams

        // Check if params is a Promise
        if (params && typeof params.then === "function") {
          resolvedParams = await params
        } else {
          resolvedParams = params
        }

        const id = Number.parseInt(resolvedParams.id)
        setPropertyId(id)
      } catch (error) {
        console.error("Error resolving params:", error)
        router.push("/buy")
        return
      }
    }

    resolveParams()
  }, [params, router])

  useEffect(() => {
    if (propertyId === null) return

    // Simple login check
    if (!isUserLoggedIn()) {
      router.push("/login?redirect=/buy&type=buy")
      return
    }
    setIsLoggedIn(true)

    // Get stored location
    const storedLocation = localStorage.getItem("userLocation")
    if (!storedLocation) {
      router.push("/login?redirect=/buy&type=buy")
      return
    }

    // Find the property
    const allProperties = getAllProperties()
    const foundProperty = allProperties.find((p) => p.id === propertyId)

    if (foundProperty) {
      setProperty(foundProperty)
    } else {
      router.push("/buy")
    }

    setIsLoading(false)
  }, [propertyId, router])

  const handleSelectProperty = () => {
    const propertyData = encodeURIComponent(JSON.stringify(property))
    router.push(`/select-property?property=${propertyData}`)
  }

  if (isLoading || propertyId === null) {
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

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pt-4 sm:pt-8">
          <Link href="/buy">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </button>
          </Link>
        </div>

        {/* Property Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">{property.name}</h1>
          <div className="flex items-start gap-2 text-gray-300 mb-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
            <span className="text-sm sm:text-base">{property.address}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-green-400">₹{property.rent.toLocaleString()}/month</div>
        </div>

        {/* Images Grid */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Property Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="w-full aspect-video overflow-hidden rounded-lg border border-white/20">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${property.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Basic Details */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Property Details</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <div>
                  <span className="text-gray-400 text-sm sm:text-base">Type:</span>
                  <span className="text-white ml-2 font-semibold text-sm sm:text-base">{property.details.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <div>
                  <span className="text-gray-400 text-sm sm:text-base">Area:</span>
                  <span className="text-white ml-2 font-semibold text-sm sm:text-base">{property.details.area}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <div>
                  <span className="text-gray-400 text-sm sm:text-base">Furnished:</span>
                  <span className="text-white ml-2 font-semibold text-sm sm:text-base">
                    {property.details.furnished}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 font-bold text-sm sm:text-base">₹</span>
                <div>
                  <span className="text-gray-400 text-sm sm:text-base">Security Deposit:</span>
                  <span className="text-white ml-2 font-semibold text-sm sm:text-base">
                    ₹{property.details.deposit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.details.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-gray-300 text-sm sm:text-base">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Description</h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{property.details.description}</p>
        </div>

        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Interested in this property?</h3>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Contact the owner directly or select this property to proceed with your application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!showContact ? (
              <button
                onClick={() => setShowContact(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors"
              >
                Contact Owner
              </button>
            ) : (
              <div className="bg-white/5 rounded-lg p-4 sm:p-6 mb-4">
                <h4 className="text-lg font-bold text-white mb-4">Owner Contact Details</h4>
                <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-semibold">
                  <Phone className="w-5 h-5" />
                  <span>{property.phone || "+91 98765 43210"}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Call or WhatsApp for property visit</p>
                <button
                  onClick={() => setShowContact(false)}
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Hide Contact
                </button>
              </div>
            )}

            <button
              onClick={handleSelectProperty}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors"
            >
              Select This Property
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

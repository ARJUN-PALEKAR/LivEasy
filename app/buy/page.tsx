"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Eye, Filter, X } from "lucide-react"

// Initial mock property data
const initialProperties = [
  {
    id: 1,
    name: "Sunrise Apartments",
    address: "123 College Street, University District",
    rent: 15000,
    image: "/modern-apartment-building.png",
    phone: "+91 98765 43210",
    images: [
      "/cozy-apartment-living-room.png",
      "/cozy-apartment-bedroom.png",
      "/modern-apartment-kitchen.png",
      "/apartment-bathroom.png",
    ],
    details: {
      type: "2BHK",
      area: "850 sq ft",
      furnished: "Semi-furnished",
      deposit: 30000,
      amenities: ["WiFi", "Parking", "Security", "Water Supply"],
      description: "Perfect for students! Close to university campus with all basic amenities.",
    },
  },
  {
    id: 2,
    name: "Green Valley Residency",
    address: "456 Park Avenue, Student Zone",
    rent: 12000,
    image: "/green-residential-building.png",
    phone: "+91 87654 32109",
    images: [
      "/cozy-apartment-living-room.png",
      "/cozy-student-bedroom.png",
      "/small-kitchen.png",
      "/clean-bathroom.png",
    ],
    details: {
      type: "1BHK",
      area: "600 sq ft",
      furnished: "Furnished",
      deposit: 24000,
      amenities: ["WiFi", "Laundry", "Security", "Power Backup"],
      description: "Fully furnished apartment ideal for single students or couples.",
    },
  },
  {
    id: 3,
    name: "Campus View Heights",
    address: "789 University Road, Academic Area",
    rent: 18000,
    image: "/tall-apartment-building.png",
    phone: "+91 76543 21098",
    images: [
      "/spacious-living-room.png",
      "/luxurious-master-bedroom.png",
      "/modern-kitchen.png",
      "/luxury-bathroom.png",
    ],
    details: {
      type: "3BHK",
      area: "1200 sq ft",
      furnished: "Semi-furnished",
      deposit: 36000,
      amenities: ["WiFi", "Gym", "Swimming Pool", "Parking", "Security"],
      description: "Premium apartment with campus view. Perfect for sharing among 3-4 students.",
    },
  },
  {
    id: 4,
    name: "Budget Student Homes",
    address: "321 Hostel Lane, College District",
    rent: 8000,
    image: "/budget-apartment-building.png",
    phone: "+91 65432 10987",
    images: ["/simple-living-room.png", "/basic-bedroom.png", "/basic-kitchen.png", "/simple-bathroom.png"],
    details: {
      type: "1RK",
      area: "400 sq ft",
      furnished: "Unfurnished",
      deposit: 16000,
      amenities: ["Water Supply", "Security", "Power Backup"],
      description: "Most affordable option for budget-conscious students.",
    },
  },
  {
    id: 5,
    name: "Elite Student Suites",
    address: "654 Premium Street, Uptown Campus",
    rent: 22000,
    image: "/luxury-apartment-building.png",
    phone: "+91 54321 09876",
    images: [
      "/luxury-living-room.png",
      "/premium-bedroom.png",
      "/designer-kitchen.png",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      type: "2BHK",
      area: "1000 sq ft",
      furnished: "Fully furnished",
      deposit: 44000,
      amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Parking", "Housekeeping"],
      description: "Luxury living for students who want the best amenities and comfort.",
    },
  },
]

// Simple login check function
const isUserLoggedIn = () => {
  return localStorage.getItem("liveEasyLoggedIn") === "true"
}

export default function BuyPage() {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [location, setLocation] = useState("")
  const [locationGranted, setLocationGranted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    minRent: "",
    maxRent: "",
    furnished: "",
    sortBy: "",
  })
  const router = useRouter()

  useEffect(() => {
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

    setLocation(storedLocation)
    setLocationGranted(true)

    // Load properties
    const savedProperties = localStorage.getItem("userProperties")
    const allProperties = savedProperties ? [...initialProperties, ...JSON.parse(savedProperties)] : initialProperties

    setProperties(allProperties)
    setFilteredProperties(allProperties)
    setIsLoading(false)
  }, [router])

  // Apply filters
  useEffect(() => {
    if (!locationGranted) return

    let filtered = [...properties]

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((p) => p.details.type === filters.type)
    }

    // Filter by rent range
    if (filters.minRent) {
      filtered = filtered.filter((p) => p.rent >= Number.parseInt(filters.minRent))
    }
    if (filters.maxRent) {
      filtered = filtered.filter((p) => p.rent <= Number.parseInt(filters.maxRent))
    }

    // Filter by furnished status
    if (filters.furnished) {
      filtered = filtered.filter((p) => p.details.furnished === filters.furnished)
    }

    // Sort
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.rent - b.rent)
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.rent - a.rent)
    }

    setFilteredProperties(filtered)
  }, [filters, properties, locationGranted])

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
    setLocationGranted(false)
    router.push("/")
  }

  const clearFilters = () => {
    setFilters({
      type: "",
      minRent: "",
      maxRent: "",
      furnished: "",
      sortBy: "",
    })
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

  const PropertyCard = ({ property }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Circular Image */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/30"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{property.name}</h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-2 flex items-center gap-1 justify-center sm:justify-start">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            {property.address}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xl sm:text-2xl font-bold text-green-400">₹{property.rent.toLocaleString()}/month</div>
            <Link href={`/buy/${property.id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                More Details
              </button>
            </Link>
          </div>
          {/* Phone Number */}
          <div className="mt-3 text-white text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start">
            <span className="font-semibold">Contact:</span>
            <span>{property.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 pt-4 sm:pt-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">Find LiveEasy Housing</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {locationGranted ? (
          <>
            {/* Location Display */}
            <div className="mb-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-sm sm:text-base">Your Location:</span>
                    <span className="text-green-300 text-sm sm:text-base font-semibold">{location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Available Properties ({filteredProperties.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Filter Properties</h3>
                    <button onClick={() => setShowFilters(false)} className="text-white hover:text-gray-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Property Type */}
                    <div>
                      <label className="block text-white mb-2 text-sm">Property Type</label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Types</option>
                        <option value="1RK">1RK</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                      </select>
                    </div>

                    {/* Min Rent */}
                    <div>
                      <label className="block text-white mb-2 text-sm">Min Rent</label>
                      <input
                        type="number"
                        value={filters.minRent}
                        onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
                        placeholder="5000"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Max Rent */}
                    <div>
                      <label className="block text-white mb-2 text-sm">Max Rent</label>
                      <input
                        type="number"
                        value={filters.maxRent}
                        onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                        placeholder="25000"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Furnished Status */}
                    <div>
                      <label className="block text-white mb-2 text-sm">Furnished</label>
                      <select
                        value={filters.furnished}
                        onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All</option>
                        <option value="Fully furnished">Fully furnished</option>
                        <option value="Semi-furnished">Semi-furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-white mb-2 text-sm">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={clearFilters}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Properties List */}
            <div className="space-y-4 sm:space-y-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-2">No Properties Found</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Location Access Required</h2>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                We need access to your location to show you properties in your area. Please log in again to provide your
                location.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

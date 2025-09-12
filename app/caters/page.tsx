import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Phone, ChefHat } from 'lucide-react'

// Mock cook data
const cooks = [
  {
    id: 1,
    name: "Priya Sharma",
    specialty: "North Indian & Chinese",
    experience: "5 years",
    rating: 4.8,
    location: "University Area",
    price: "₹3,000-4,000/month",
    image: "/placeholder.svg?height=150&width=150",
    description: "Specializes in healthy home-cooked meals. Expert in North Indian cuisine and Chinese dishes. Flexible meal plans available.",
    services: ["Breakfast", "Lunch", "Dinner", "Tiffin Service"],
    contact: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    specialty: "South Indian & Continental",
    experience: "7 years",
    rating: 4.9,
    location: "College District",
    price: "₹2,500-3,500/month",
    image: "/placeholder.svg?height=150&width=150",
    description: "Traditional South Indian cook with modern continental skills. Known for authentic dosas, idlis, and pasta dishes.",
    services: ["Breakfast", "Lunch", "Dinner", "Special Occasions"],
    contact: "+91 87654 32109"
  },
  {
    id: 3,
    name: "Meera Patel",
    specialty: "Gujarati & Punjabi",
    experience: "4 years",
    rating: 4.7,
    location: "Student Zone",
    price: "₹2,800-3,800/month",
    image: "/placeholder.svg?height=150&width=150",
    description: "Home-style Gujarati and Punjabi cooking. Perfect for students who miss home food. Vegetarian specialist.",
    services: ["Lunch", "Dinner", "Tiffin Service", "Festival Specials"],
    contact: "+91 76543 21098"
  },
  {
    id: 4,
    name: "Ahmed Ali",
    specialty: "Mughlai & Biryani",
    experience: "6 years",
    rating: 4.6,
    location: "Campus Area",
    price: "₹3,200-4,200/month",
    image: "/placeholder.svg?height=150&width=150",
    description: "Master of Mughlai cuisine and authentic biryanis. Perfect for students who love rich, flavorful food.",
    services: ["Lunch", "Dinner", "Weekend Specials", "Party Orders"],
    contact: "+91 65432 10987"
  },
  {
    id: 5,
    name: "Lakshmi Nair",
    specialty: "Kerala & Multi-cuisine",
    experience: "8 years",
    rating: 4.9,
    location: "Hostel Area",
    price: "₹2,700-3,700/month",
    image: "/placeholder.svg?height=150&width=150",
    description: "Authentic Kerala cuisine expert with multi-cuisine skills. Known for healthy coconut-based dishes and seafood.",
    services: ["All Meals", "Diet Plans", "Seafood Specials", "Healthy Options"],
    contact: "+91 54321 09876"
  }
]

export default function CatersPage() {
  const CookCard = ({ cook }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
        {/* Cook Image */}
        <img 
          src={cook.image || "/placeholder.svg"} 
          alt={cook.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/30 mx-auto sm:mx-0"
        />
        
        {/* Basic Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{cook.name}</h3>
          <p className="text-blue-300 font-semibold mb-1 text-sm sm:text-base">{cook.specialty}</p>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 justify-center sm:justify-start">
            <span>{cook.experience} experience</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
              <span>{cook.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Price */}
        <div className="text-center sm:text-right">
          <div className="text-base sm:text-lg font-bold text-green-400">{cook.price}</div>
          <div className="text-xs sm:text-sm text-gray-400">per month</div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-300 mb-3 justify-center sm:justify-start">
        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-sm">{cook.location}</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-4 text-xs sm:text-sm leading-relaxed text-center sm:text-left">{cook.description}</p>

      {/* Services */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2 text-sm text-center sm:text-left">Services:</h4>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {cook.services.map((service, index) => (
            <span 
              key={index}
              className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full text-xs"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-gray-300">
          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{cook.contact}</span>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors">
          Contact Cook
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pt-4 sm:pt-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">Find Personal Cooks</h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <h2 className="text-lg sm:text-2xl text-gray-300">
              Home-cooked meals by experienced cooks
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Tired of hostel food? Find experienced personal cooks who specialize in student-friendly, 
            budget-conscious meal plans. Enjoy home-style cooking without the hassle.
          </p>
        </div>

        {/* Cooks List */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Available Cooks ({cooks.length})</h2>
          {cooks.map((cook) => (
            <CookCard key={cook.id} cook={cook} />
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">How It Works</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">1</div>
                <p className="text-sm sm:text-base">Browse available cooks in your area</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">2</div>
                <p className="text-sm sm:text-base">Contact them directly to discuss meal plans</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">3</div>
                <p className="text-sm sm:text-base">Agree on menu, timing, and monthly rates</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">4</div>
                <p className="text-sm sm:text-base">Enjoy fresh, home-cooked meals daily!</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Benefits</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm sm:text-base">Fresh, home-cooked meals daily</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm sm:text-base">Customizable meal plans and menus</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm sm:text-base">Budget-friendly monthly packages</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm sm:text-base">No cooking or cleaning hassle</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm sm:text-base">Experienced and verified cooks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

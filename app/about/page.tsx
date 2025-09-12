import Link from "next/link"
import { ArrowLeft, Home, Building, ChefHat } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8 pt-4 sm:pt-8">
          <Link href="/">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">About LiveEasy</h1>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">About LiveEasy</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing student housing by eliminating broker fees and connecting students directly with
            property owners and service providers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Broker Fees</h3>
            <p className="text-gray-300">
              Connect directly with property owners and save thousands in broker commissions.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Student-Focused</h3>
            <p className="text-gray-300">
              All properties and services are specifically curated for student needs and budgets.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Complete Solution</h3>
            <p className="text-gray-300">From housing to home-cooked meals, we provide everything students need.</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To make student life easier and more affordable by providing a transparent, broker-free platform where
              students can find quality housing and essential services without the traditional hassles and hidden costs
              of the rental market.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">For Students Looking for Housing</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <p>Browse verified properties in your area</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <p>Contact property owners directly</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <p>Schedule visits and finalize deals</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <p>Move in without paying broker fees!</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">For Property Owners</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <p>List your property for free</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <p>Connect directly with students</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <p>No commission fees to pay</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <p>Find reliable student tenants</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flexible Content Box */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">More About LiveEasy</h3>
            <div className="bg-white/5 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <p className="text-gray-400 text-lg">Content will be added here soon...</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-8">Why Choose LiveEasy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">0%</div>
              <p className="text-gray-300">Broker Fees</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
              <p className="text-gray-300">Properties Listed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-gray-300">Verified Cooks</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <p className="text-gray-300">Support</p>
            </div>
          </div>
        </div> */}

        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Get Started Today</h3>
          <p className="text-gray-300 mb-6">
            Join thousands of students who have found their perfect home through LiveEasy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?redirect=/buy&type=buy">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                Find Housing
              </button>
            </Link>
            <Link href="/login?redirect=/sell&type=sell">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                List Property
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

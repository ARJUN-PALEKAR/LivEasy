"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  MapPin,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  Home,
  Utensils,
  Car,
  ShoppingBag,
  Plus,
  Trash2,
  ArrowLeft,
  Edit3,
  Check,
  X,
} from "lucide-react"
import Link from "next/link"

// Simple login check function
const isUserLoggedIn = () => {
  return localStorage.getItem("liveEasyLoggedIn") === "true"
}

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [rentAmount, setRentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState([])

  // Expense Tracker State
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
  })
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [monthlyBudget, setMonthlyBudget] = useState(15000)
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const [tempBudget, setTempBudget] = useState("")

  // Selected Property State
  const [selectedProperty, setSelectedProperty] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Simple login check
    if (!isUserLoggedIn()) {
      router.push("/login?redirect=/profile&type=profile")
      return
    }

    setIsLoggedIn(true)

    // Get user type from stored data
    const storedUserType = localStorage.getItem("liveEasyUserType")
    if (storedUserType) {
      setUserType(storedUserType === "buyer" ? "Buyer" : storedUserType === "seller" ? "Seller" : "User")
    } else {
      setUserType("User")
    }

    // Load user data
    const location = localStorage.getItem("userLocation") || "Location not set"
    setUserLocation(location)

    // Load payment history
    const savedPayments = localStorage.getItem("paymentHistory")
    if (savedPayments) {
      setPaymentHistory(JSON.parse(savedPayments))
    }

    // Load expenses
    const savedExpenses = localStorage.getItem("userExpenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }

    // Load budget
    const savedBudget = localStorage.getItem("monthlyBudget")
    if (savedBudget) {
      setMonthlyBudget(Number.parseInt(savedBudget))
    }

    // Load selected property
    const savedSelectedProperty = localStorage.getItem("selectedProperty")
    if (savedSelectedProperty) {
      setSelectedProperty(JSON.parse(savedSelectedProperty))
    }
  }, [router])

  const handleRentPayment = (e) => {
    e.preventDefault()

    const payment = {
      id: Date.now(),
      amount: Number.parseInt(rentAmount),
      method: paymentMethod,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
      type: "Rent Payment",
    }

    const updatedHistory = [payment, ...paymentHistory]
    setPaymentHistory(updatedHistory)
    localStorage.setItem("paymentHistory", JSON.stringify(updatedHistory))

    setRentAmount("")
    setShowPaymentForm(false)
    alert("Rent payment successful!")
  }

  const clearPaymentHistory = () => {
    if (confirm("Are you sure you want to clear all payment history? This action cannot be undone.")) {
      setPaymentHistory([])
      localStorage.removeItem("paymentHistory")
    }
  }

  const handleAddExpense = (e) => {
    e.preventDefault()

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: Number.parseFloat(newExpense.amount),
    }

    const updatedExpenses = [expense, ...expenses]
    setExpenses(updatedExpenses)
    localStorage.setItem("userExpenses", JSON.stringify(updatedExpenses))

    setNewExpense({
      description: "",
      amount: "",
      category: "food",
      date: new Date().toISOString().split("T")[0],
    })
    setShowExpenseForm(false)
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem("userExpenses", JSON.stringify(updatedExpenses))
  }

  const deleteSelectedProperty = () => {
    if (confirm("Are you sure you want to remove the selected property? This will clear your rental agreement.")) {
      setSelectedProperty(null)
      localStorage.removeItem("selectedProperty")
    }
  }

  const handleBudgetEdit = () => {
    setTempBudget(monthlyBudget.toString())
    setIsEditingBudget(true)
  }

  const handleBudgetSave = () => {
    const newBudget = Number.parseInt(tempBudget)
    if (newBudget && newBudget > 0) {
      setMonthlyBudget(newBudget)
      localStorage.setItem("monthlyBudget", newBudget.toString())
      setIsEditingBudget(false)
      setTempBudget("")
    }
  }

  const handleBudgetCancel = () => {
    setIsEditingBudget(false)
    setTempBudget("")
  }

  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })
  }

  const getTotalMonthlyExpenses = () => {
    return getCurrentMonthExpenses().reduce((total, expense) => total + expense.amount, 0)
  }

  const getExpensesByCategory = () => {
    const monthlyExpenses = getCurrentMonthExpenses()
    const categories = {}

    monthlyExpenses.forEach((expense) => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount
    })

    return categories
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food":
        return <Utensils className="w-4 h-4" />
      case "transport":
        return <Car className="w-4 h-4" />
      case "shopping":
        return <ShoppingBag className="w-4 h-4" />
      case "rent":
        return <Home className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "food":
        return "text-orange-400"
      case "transport":
        return "text-blue-400"
      case "shopping":
        return "text-purple-400"
      case "rent":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
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
    router.push("/")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const totalMonthlyExpenses = getTotalMonthlyExpenses()
  const budgetUsed = (totalMonthlyExpenses / monthlyBudget) * 100
  const expensesByCategory = getExpensesByCategory()

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 pt-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-gray-400">Manage your account and track your expenses</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">User Type</label>
                  <p className="text-white font-semibold">{userType}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Location</label>
                  <p className="text-white font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    {userLocation}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Account Status</label>
                  <p className="text-green-400 font-semibold">Active</p>
                </div>
              </div>
            </div>

            {/* Selected Property */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Current Property
              </h2>
              {selectedProperty ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProperty.image || "/placeholder.svg"}
                      alt={selectedProperty.name}
                      className="w-12 h-12 rounded-lg object-cover border border-white/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm">{selectedProperty.name}</h3>
                      <p className="text-gray-400 text-xs">{selectedProperty.address}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Monthly Rent</span>
                      <span className="text-green-400 font-bold">₹{selectedProperty.rent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Property Type</span>
                      <span className="text-white text-sm">{selectedProperty.details.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Furnished</span>
                      <span className="text-white text-sm">{selectedProperty.details.furnished}</span>
                    </div>
                  </div>
                  <button
                    onClick={deleteSelectedProperty}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition-colors"
                  >
                    Remove Property
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Home className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No property rented</p>
                  <p className="text-gray-500 text-xs mt-1">Browse properties to select one</p>
                </div>
              )}
            </div>

            {/* Rent Payment */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Rent Payment
              </h2>

              {!showPaymentForm ? (
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Pay Rent
                </button>
              ) : (
                <form onSubmit={handleRentPayment} className="space-y-4">
                  <div>
                    <label className="block text-white mb-2 text-sm">Rent Amount (₹)</label>
                    <input
                      type="number"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="15000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="upi">UPI</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="netbanking">Net Banking</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Pay Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPaymentForm(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Expense Tracker */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Expense Tracker
                </h2>
                <button
                  onClick={() => setShowExpenseForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>

              {/* Budget Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400 text-sm">Monthly Budget</p>
                    {!isEditingBudget ? (
                      <button
                        onClick={handleBudgetEdit}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit Budget"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={handleBudgetSave}
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Save Budget"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleBudgetCancel}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {!isEditingBudget ? (
                    <p className="text-white text-xl font-bold">₹{monthlyBudget.toLocaleString()}</p>
                  ) : (
                    <input
                      type="number"
                      value={tempBudget}
                      onChange={(e) => setTempBudget(e.target.value)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter budget"
                      min="1000"
                      max="100000"
                      autoFocus
                    />
                  )}
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Spent This Month</p>
                  <p className="text-red-400 text-xl font-bold">₹{totalMonthlyExpenses.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Remaining</p>
                  <p className="text-green-400 text-xl font-bold">
                    ₹{(monthlyBudget - totalMonthlyExpenses).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Budget Used</span>
                  <span className="text-white">{budgetUsed.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${budgetUsed > 90 ? "bg-red-500" : budgetUsed > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                  ></div>
                </div>
                {budgetUsed > 100 && (
                  <p className="text-red-400 text-sm mt-2">⚠️ You've exceeded your monthly budget!</p>
                )}
              </div>

              {/* Add Expense Form */}
              {showExpenseForm && (
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white mb-2 text-sm">Description</label>
                        <input
                          type="text"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Lunch at cafe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2 text-sm">Amount (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="150"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2 text-sm">Category</label>
                        <select
                          value={newExpense.category}
                          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="food">Food</option>
                          <option value="transport">Transport</option>
                          <option value="shopping">Shopping</option>
                          <option value="rent">Rent</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white mb-2 text-sm">Date</label>
                        <input
                          type="date"
                          value={newExpense.date}
                          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        Add Expense
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowExpenseForm(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Recent Expenses */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Expenses</h3>
                {expenses.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {expenses.slice(0, 10).map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className={`${getCategoryColor(expense.category)}`}>
                            {getCategoryIcon(expense.category)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{expense.description}</p>
                            <p className="text-gray-400 text-xs">
                              {expense.date} • {expense.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 font-semibold">₹{expense.amount}</span>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No expenses recorded yet</p>
                )}
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Payment History
                </h2>
                {paymentHistory.length > 0 && (
                  <button
                    onClick={clearPaymentHistory}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear History
                  </button>
                )}
              </div>
              {paymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                      <div>
                        <p className="text-white font-semibold">{payment.type}</p>
                        <p className="text-gray-400 text-sm">
                          {payment.date} • {payment.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-green-300 text-sm">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No payment history available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

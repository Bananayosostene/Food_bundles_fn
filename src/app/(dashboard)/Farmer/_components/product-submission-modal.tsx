"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productSubmissionService } from "@/app/services/productSubmissionService"
import { toast } from "sonner"

// Define ProductSubmissionModalProps and ProductSubmissionData
interface ProductSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}
export interface ProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number
  location: string
}

export default function ProductSubmissionModal({ isOpen, onClose, onSubmit }: ProductSubmissionModalProps) {
  const [formData, setFormData] = useState<ProductSubmissionData>({
    productName: "",
    category: "",
    quantity: 0,
    unit: "kg",
    wishedPrice: 0,
    location: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState<string[]>([])

  const [categories, setCategories] = useState<string[]>([])
  const [locationData, setLocationData] = useState<string[]>([])
  const [productSuggestions, setProductSuggestions] = useState<string[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingData(true)
      try {
        // Fetch all required data in parallel
        const [fetchedCategories, fetchedLocations] = await Promise.all([
          productSubmissionService.fetchCategories(),
          productSubmissionService.fetchUserLocations(),
        ])

        setCategories(fetchedCategories)
        setLocationData(fetchedLocations)
      } catch (error) {
        console.error("Failed to fetch initial data:", error)
        toast.error("Failed to load form data. Please refresh the page.")
      } finally {
        setIsLoadingData(false)
      }
    }

    if (isOpen) {
      fetchInitialData()
    }
  }, [isOpen])

  useEffect(() => {
    const fetchProductSuggestions = async () => {
      if (formData.productName.length > 2) {
        try {
          const suggestions = await productSubmissionService.fetchProductSuggestions(formData.productName)
          setProductSuggestions(suggestions)

          const searchTerm = formData.productName.toLowerCase()
          let filteredResults = suggestions.filter((product) => product.toLowerCase().includes(searchTerm))

          // Filter by selected category if one is chosen
          if (formData.category) {
            filteredResults = filteredResults.filter((product) => {
              const lowerProduct = product.toLowerCase()
              switch (formData.category) {
                case "VEGETABLES":
                  return (
                    lowerProduct.includes("tomato") ||
                    lowerProduct.includes("carrot") ||
                    lowerProduct.includes("lettuce")
                  )
                case "FRUITS":
                  return lowerProduct.includes("apple") || lowerProduct.includes("fruit")
                case "GRAINS":
                  return (
                    lowerProduct.includes("wheat") || lowerProduct.includes("corn") || lowerProduct.includes("rice")
                  )
                case "TUBERS":
                  return lowerProduct.includes("potato")
                default:
                  return true
              }
            })
          }

          setFilteredSuggestions(filteredResults.slice(0, 5))
          setShowSuggestions(filteredResults.length > 0)
        } catch (error) {
          console.error("Failed to fetch product suggestions:", error)
          setShowSuggestions(false)
          setFilteredSuggestions([])
        }
      } else {
        setShowSuggestions(false)
        setFilteredSuggestions([])
      }
    }

    // Debounce the API call
    const timeoutId = setTimeout(fetchProductSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [formData.productName, formData.category]) // Added formData.category as dependency

  useEffect(() => {
    if (formData.location.length > 2) {
      const searchTerm = formData.location.toLowerCase()
      const suggestions = locationData.filter((location) => {
        const village = location.split(", ").pop()?.toLowerCase() || ""
        return village.includes(searchTerm) || location.toLowerCase().includes(searchTerm)
      })
      setFilteredLocationSuggestions(suggestions.slice(0, 8))
      setShowLocationSuggestions(suggestions.length > 0)
    } else {
      setShowLocationSuggestions(false)
      setFilteredLocationSuggestions([])
    }
  }, [formData.location, locationData])

  // Define handleInputChange and handleSubmit functions
  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, productName: suggestion }))
    setShowSuggestions(false)

    // Auto-categorize based on product name
    const lowerSuggestion = suggestion.toLowerCase()
    if (
      lowerSuggestion.includes("tomato") ||
      lowerSuggestion.includes("carrot") ||
      lowerSuggestion.includes("lettuce")
    ) {
      setFormData((prev) => ({ ...prev, category: "VEGETABLES" }))
    } else if (lowerSuggestion.includes("apple")) {
      setFormData((prev) => ({ ...prev, category: "FRUITS" }))
    } else if (
      lowerSuggestion.includes("wheat") ||
      lowerSuggestion.includes("corn") ||
      lowerSuggestion.includes("rice")
    ) {
      setFormData((prev) => ({ ...prev, category: "GRAINS" }))
    } else if (lowerSuggestion.includes("potato")) {
      setFormData((prev) => ({ ...prev, category: "TUBERS" }))
    }
  }

  const handleLocationSuggestionSelect = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, location: suggestion }))
    setShowLocationSuggestions(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0"
    if (formData.wishedPrice <= 0) newErrors.wishedPrice = "Price must be greater than 0"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await productSubmissionService.submitProduct(formData)
      if (response.success) {
        onSubmit(formData)
        toast.success("Product submitted successfully!")
        setFormData({
          productName: "",
          category: "",
          quantity: 0,
          unit: "kg",
          wishedPrice: 0,
          location: "",
        })
        setErrors({})
        onClose()
      } else {
        toast.error(response.message || "Failed to submit product")
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define handleBackdropClick function
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl bg-white">
        <CardHeader className="pb-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Submit Product</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full"
              type="button"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Fill in the details below to submit your product for approval</p>
        </CardHeader>

        <CardContent className="p-6 bg-white">
          {isLoadingData ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-2 text-gray-600">Loading form data...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category *
                </Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace("_", " & ")}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="productName" className="text-base font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Product Name *
                </Label>
                <div className="relative">
                  <input
                    id="productName"
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    onFocus={() =>
                      formData.productName.length > 2 && setShowSuggestions(filteredSuggestions.length > 0)
                    }
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={
                      formData.category
                        ? `e.g., Search ${formData.category.toLowerCase()} products`
                        : "e.g., Organic Heirloom Tomatoes"
                    }
                    className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.productName ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSuggestionSelect(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
                {formData.category && (
                  <p className="text-sm text-gray-500">
                    Showing products from {formData.category.replace("_", " & ").toLowerCase()} category
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                    Location of Farmer *
                  </Label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      onFocus={() =>
                        formData.location.length > 2 &&
                        setShowLocationSuggestions(filteredLocationSuggestions.length > 0)
                      }
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      placeholder="e.g., Search by village name"
                      className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.location ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {showLocationSuggestions && filteredLocationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredLocationSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleLocationSuggestionSelect(suggestion)}
                          >
                            <div className="font-medium">{suggestion.split(", ").pop()}</div>
                            <div className="text-gray-500 text-xs">{suggestion}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base font-semibold">
                    Quantity *
                  </Label>
                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.quantity || ""}
                    onChange={(e) => handleInputChange("quantity", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.quantity ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-base font-semibold">
                    Unit
                  </Label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {["kg", "g", "lbs", "pieces", "liters", "ml", "boxes", "bags", "bunches"].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wishedPrice" className="text-base font-semibold">
                    Wished Price * (per {formData.unit})
                  </Label>
                  <input
                    id="wishedPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.wishedPrice || ""}
                    onChange={(e) => handleInputChange("wishedPrice", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.wishedPrice ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.wishedPrice && <p className="text-red-500 text-sm">{errors.wishedPrice}</p>}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-8 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold disabled:bg-green-400"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Product"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

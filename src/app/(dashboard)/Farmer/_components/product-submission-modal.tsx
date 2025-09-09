"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, DollarSign, Package, Tag, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productSubmissionService } from "@/app/services/productSubmissionService"
import { toast } from "sonner"

interface ProductSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductSubmissionData) => void
}
export interface ProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number
  location: string
}

const categories = ["ANIMAL_PRODUCTS", "VEGETABLES", "FRUITS", "GRAINS", "TUBERS", "LEGUMES", "HERBS_SPICES", "OTHER"]

const units = ["kg", "g", "lbs", "pieces", "liters", "ml", "boxes", "bags", "bunches"]

const productSuggestions: Record<string, string[]> = {
  tomato: ["Organic Heirloom Tomatoes", "Cherry Tomatoes", "Roma Tomatoes", "Beefsteak Tomatoes"],
  apple: ["Red Delicious Apples", "Granny Smith Apples", "Gala Apples", "Honeycrisp Apples"],
  corn: ["Sweet Corn", "Field Corn", "Organic Corn", "Baby Corn"],
  wheat: ["Winter Wheat", "Spring Wheat", "Durum Wheat", "Organic Wheat"],
  rice: ["Basmati Rice", "Jasmine Rice", "Brown Rice", "Wild Rice"],
  potato: ["Russet Potatoes", "Red Potatoes", "Sweet Potatoes", "Fingerling Potatoes"],
  carrot: ["Baby Carrots", "Organic Carrots", "Purple Carrots", "Rainbow Carrots"],
  lettuce: ["Romaine Lettuce", "Iceberg Lettuce", "Butter Lettuce", "Mixed Greens"],
}

const locationData = [
  "Amajyepfo, Gisagara, Gikonko, Gikonko, Runyinya",
  "Iburasirazuba, Nyagatare, TABAGWE, Nkoma, Runyinya",
  "Amajyepfo, Gisagara, Gikonko, Rweru, Nyarurama",
  "Iburasirazuba, Nyagatare, TABAGWE, Nkoma, Gashenyi",
  "Amajyepfo, Gisagara, Mukindo, Mukindo, Nyarubuye",
  "Iburasirazuba, Nyagatare, Karangazi, Karangazi, Nyagatare",
  "Amajyepfo, Nyanza, Busasamana, Busasamana, Cyahinda",
  "Iburasirazuba, Nyagatare, Rwempasha, Rwempasha, Karama",
  "Amajyepfo, Huye, Ngoma, Ngoma, Cyarwa",
  "Iburasirazuba, Gatsibo, Gasange, Gasange, Nyagihanga",
  "Amajyepfo, Huye, Tumba, Tumba, Cyahinda",
  "Iburasirazuba, Gatsibo, Kageyo, Kageyo, Kageyo",
  "Amajyepfo, Nyanza, Busasamana, Busasamana, Cyahinda",
]

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden"
    } else {
      // Restore background scrolling
      document.body.style.overflow = "unset"
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (formData.productName.length > 2) {
      const searchTerm = formData.productName.toLowerCase()
      const suggestions: string[] = []

      Object.entries(productSuggestions).forEach(([key, products]) => {
        if (key.includes(searchTerm) || searchTerm.includes(key)) {
          suggestions.push(...products)
        }
      })

      Object.values(productSuggestions)
        .flat()
        .forEach((product) => {
          if (product.toLowerCase().includes(searchTerm) && !suggestions.includes(product)) {
            suggestions.push(product)
          }
        })

      setFilteredSuggestions(suggestions.slice(0, 5))
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
  }, [formData.productName])

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
  }, [formData.location])

  const handleInputChange = <K extends keyof ProductSubmissionData>(field: K, value: ProductSubmissionData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, productName: suggestion }))
    setShowSuggestions(false)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="pb-4 border-b border-gray-200">
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

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <Label htmlFor="productName" className="text-base font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Product Name *
                </Label>
                <div className="relative">
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    onFocus={() =>
                      formData.productName.length > 2 && setShowSuggestions(filteredSuggestions.length > 0)
                    }
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="e.g., Organic Heirloom Tomatoes"
                    className={`h-12 ${errors.productName ? "border-red-300" : ""}`}
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
                {formData.productName.length <= 2}
              </div>

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
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location of Farmer *
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  onFocus={() =>
                    formData.location.length > 2 && setShowLocationSuggestions(filteredLocationSuggestions.length > 0)
                  }
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  placeholder="e.g., Search by village name like Runyinya"
                  className={`h-12 ${errors.location ? "border-red-300" : ""}`}
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
              {formData.location.length <= 2 }
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-base font-semibold">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.quantity || ""}
                  onChange={(e) => handleInputChange("quantity", Number.parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className={`h-12 ${errors.quantity ? "border-red-300" : ""}`}
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
              </div>

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
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wishedPrice" className="text-base font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Wished Price * (per {formData.unit})
                </Label>
                <Input
                  id="wishedPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.wishedPrice || ""}
                  onChange={(e) => handleInputChange("wishedPrice", Number.parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className={`h-12 ${errors.wishedPrice ? "border-red-300" : ""}`}
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
                className="px-8 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold disabled:bg-green-400 disabled:text-white"
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
        </CardContent>
      </Card>
    </div>
  )
}

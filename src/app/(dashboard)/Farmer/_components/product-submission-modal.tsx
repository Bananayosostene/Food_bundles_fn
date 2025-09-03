"use client"

import type React from "react"

import { useState } from "react"
import { X, DollarSign, Package, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productSubmissionService } from "@/app/services/productSubmissionService"
import { toast } from "sonner"

export interface ProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number
}

interface ProductSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductSubmissionData) => void
}

const categories = [
  "VEGETABLES",
  "FRUITS",
  "GRAINS",
  "TUBERS",
  "LEGUMES",
  "HERBS_SPICES",
  "DAIRY_EGGS",
  "MEAT_POULTRY",
  "ORGANIC",
  "SEASONAL",
]

const units = ["kg", "lb", "g", "oz", "bunch", "bag", "box", "crate", "dozen", "piece", "liter", "gallon"]

export default function ProductSubmissionModal({ isOpen, onClose, onSubmit }: ProductSubmissionModalProps) {
  const [formData, setFormData] = useState<ProductSubmissionData>({
    productName: "",
    category: "",
    quantity: 0,
    unit: "kg",
    wishedPrice: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleInputChange = <K extends keyof ProductSubmissionData>(field: K, value: ProductSubmissionData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0"
    if (formData.wishedPrice <= 0) newErrors.wishedPrice = "Price must be greater than 0"

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
    } else {
      toast.error(response.message || "Failed to submit product")
    }

    // Reset form
    setFormData({
      productName: "",
      category: "",
      quantity: 0,
      unit: "kg",
      wishedPrice: 0,
    })
    setErrors({})
    onClose()
  } catch (error: any) {
    console.error("Submission error:", error)
    toast.error(error.response?.data?.message || "Something went wrong")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Submit New Product</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Fill in the details below to submit your product for approval</p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-base font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Product Name *
                </Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                  placeholder="e.g., Organic Heirloom Tomatoes"
                  className={`h-12 ${errors.productName ? "border-red-300" : ""}`}
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
              </div>

              {/* Category */}
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

            {/* Quantity and Unit */}
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

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-8 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
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
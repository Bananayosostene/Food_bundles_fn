"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductSubmissionModal, { ProductSubmissionData } from "./_components/product-submission-modal"

export default function FarmerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductSubmit = (data: ProductSubmissionData) => {
    console.log("Product submitted:", data)
    // Handle the product submission here
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          Add New Product
        </Button>
      </div>

      {/* Your other dashboard content */}
      <div className="grid gap-6">
        {/* Dashboard content */}
      </div>

      <ProductSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProductSubmit}
      />
    </div>
  )
}
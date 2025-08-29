"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"

type ProductCategory =
  | "VEGETABLES"
  | "FRUITS"
  | "GRAINS"
  | "TUBERS"
  | "LEGUMES"
  | "HERBS_SPICES"

interface Product {
  id: string
  productName: string
  unitPrice: number
  unit: string
  bonus: number
  createdBy: string
  expiryDate: Date
  images: string[]
  quantity: number
  sku: string
  category: ProductCategory
  rating: number
  soldCount: number
}

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 4 // 2 rows (assuming 2 columns per row on small screens, adjust as needed)

  const totalPages = Math.ceil(products.length / productsPerPage)
  const startIdx = (currentPage - 1) * productsPerPage
  const endIdx = startIdx + productsPerPage
  const currentProducts = products.slice(startIdx, endIdx)

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

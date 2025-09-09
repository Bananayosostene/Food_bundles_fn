"use client"

import { useState } from "react"
import { Search, Plus, MapPin, Eye, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ProductSubmissionModal from "./product-submission-modal"
import { useProducts, type Product } from "./product-context"

interface productSubmitData {
  productName: string
  category: string
  quantity: number
  unit: string
  submittedDate: string
  wishedPrice: number
  images: File[]
  location: string
}

export default function ProductManagement() {
  const { products, addProduct, deleteProduct } = useProducts()
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [dateFilter, setDateFilter] = useState("")
  const [showDateFilter, setShowDateFilter] = useState(false)

  console.log("ProductManagement rendered, products:", products.length)

  const statusOptions = ["All", "Pending", "Verified", "Approved", "Paid"]

  const filteredProducts = products.filter((product) => {
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !dateFilter || product.submittedDate === dateFilter

    return matchesStatus && matchesSearch && matchesDate
  })

  console.log("Filtered products:", filteredProducts.length)

  const handleProductSubmit = (data: productSubmitData) => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: data.productName,
      category: data.category.replace("_", " & "),
      quantity: `${data.quantity} ${data.unit}`,
      submittedDate: data.submittedDate,
      price: `RWF ${data.wishedPrice.toFixed(2)}`,
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      image:
        data.images.length > 0
          ? URL.createObjectURL(data.images[0])
          : "/placeholder.svg?height=48&width=48&text=No+Image",
      location: data.location || "Kigali, Rwanda", // Default location
      priceValue: data.wishedPrice,
    }

    addProduct(newProduct)
    console.log("Product submitted:", data)
    setShowSubmissionModal(false)
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId)
    }
  }

  const handleViewDetails = (product: Product) => {
    console.log("Viewing product details:", product)
    alert(
      `Product Details:\nName: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}\nStatus: ${product.status}`,
    )
  }

  return (
    <div className="w-full pl-28 pr-18 ">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
            <Button
              onClick={() => setShowSubmissionModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Submit Product
            </Button>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant="outline"
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className={`transition-all duration-200 ${
                  selectedStatus === status
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status}
                <span className="ml-2 text-xs">
                  ({status === "All" ? products.length : products.filter((p) => p.status === status).length})
                </span>
              </Button>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products, category, or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Get submitted by Date
              </Button>

              {dateFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDateFilter("")}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Date Filter
                </Button>
              )}
            </div>
          </div>

          {showDateFilter && (
            <div className="mt-4 max-w-sm">
              <Input
                type="date"
                placeholder="Filter by date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || dateFilter
                      ? `No products found matching the current filters`
                      : selectedStatus === "All"
                        ? "No products found. Click 'Submit Product' to add your first product."
                        : `No ${selectedStatus.toLowerCase()} products found`}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-sm">{product.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.submittedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${product.statusColor} border-0`}>{product.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(product)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedStatus !== "All" && ` (filtered by ${selectedStatus})`}
            {dateFilter && ` (filtered by date: ${dateFilter})`}
          </p>
        </div>
      </div>

      {/* Product Submission Modal */}
      <ProductSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleProductSubmit}
      />
    </div>
  )
}

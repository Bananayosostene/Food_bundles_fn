"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ProductSubmissionModal from "./product-submission-modal"

interface Product {
  id: string
  name: string
  category: string
  quantity: string
  submittedDate: string
  price: string
  status: string
  statusColor: string
  image: string
}

export default function ProductManagement() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)

  // Initialize with sample products - this should definitely show
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Apples",
      category: "Fruits",
      quantity: "25 kg",
      submittedDate: "2023-11-15",
      price: "$45.50",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      image: "/images/tomatoes.svg",
    },
    {
      id: "2",
      name: "Fresh Carrots",
      category: "Vegetables",
      quantity: "18 kg",
      submittedDate: "2023-11-14",
      price: "$32.75",
      status: "Verified",
      statusColor: "bg-blue-100 text-blue-800",
      image: "/images/carrots.svg",
    },
    {
      id: "3",
      name: "Heirloom Tomatoes",
      category: "Vegetables",
      quantity: "15 kg",
      submittedDate: "2023-11-12",
      price: "$38.25",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800",
      image: "/images/tomatoes.svg",
    },
  ])

  console.log("ProductManagement rendered, products:", products.length)

  const statusOptions = ["All", "Pending", "Verified", "Approved", "Paid"]

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  console.log("Filtered products:", filteredProducts.length)

  return (
    <div className="w-full">
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

          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm
                      ? `No products found matching "${searchTerm}"`
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
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.submittedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${product.statusColor} border-0`}>{product.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
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
          </p>
        </div>
      </div>

      {/* Product Submission Modal */}
      <ProductSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={(productData) => {
          const newProduct: Product = {
            id: (products.length + 1).toString(),
            name: productData.productName,
            category: productData.category.replace("_", " & "),
            quantity: `${productData.quantity} ${productData.unit}`,
            submittedDate: productData.submittedDate,
            price: `$${productData.wishedPrice.toFixed(2)}`,
            status: "Pending",
            statusColor: "bg-yellow-100 text-yellow-800",
            image:
              productData.images.length > 0
                ? URL.createObjectURL(productData.images[0])
                : "/placeholder.svg?height=48&width=48&text=No+Image",
          }

          setProducts((prev) => [newProduct, ...prev])
          console.log("Product submitted:", productData)
          setShowSubmissionModal(false)
        }}
      />
    </div>
  )
}

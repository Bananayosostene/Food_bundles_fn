"use client"

import { useState } from "react"
import { Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductSubmissionModal, { ProductSubmissionData } from "./product-submission-modal"
import { DataTable } from "@/components/data-table"
import { productColumns } from "./product-columns"

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
  location: string
  priceValue: number
}

export default function ProductManagement() {
  // Sample data to replace external context
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Tomatoes",
      category: "Vegetables",
      quantity: "10 kg",
      submittedDate: "2024-01-15",
      price: "RWF 5000.00",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800",
      image: "/placeholder.svg?height=48&width=48&text=Tomato",
      location: "Kigali, Rwanda",
      priceValue: 5000
    },
    {
      id: "2",
      name: "Fresh Bananas",
      category: "Fruits",
      quantity: "25 bunches",
      submittedDate: "2024-01-12",
      price: "RWF 7500.00",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      image: "/placeholder.svg?height=48&width=48&text=Banana",
      location: "Kigali, Rwanda",
      priceValue: 7500
    },
    {
      id: "3",
      name: "White Rice",
      category: "Grains",
      quantity: "50 kg",
      submittedDate: "2024-01-10",
      price: "RWF 15000.00",
      status: "Verified",
      statusColor: "bg-blue-100 text-blue-800",
      image: "/placeholder.svg?height=48&width=48&text=Rice",
      location: "Kigali, Rwanda",
      priceValue: 15000
    }
  ])

  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [dateFilter, setDateFilter] = useState("")
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const statusOptions = ["All", "Pending", "Verified", "Approved", "Paid"]

  const filteredProducts = products.filter((product) => {
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus
    const matchesDate = !dateFilter || product.submittedDate === dateFilter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesDate && matchesSearch
  })

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product])
  }

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  const handleProductSubmit = (data: ProductSubmissionData) => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: data.productName,
      category: data.category.replace("_", " & "),
      quantity: `${data.quantity} ${data.unit}`,
      submittedDate: new Date().toISOString().split("T")[0],
      price: `RWF ${data.wishedPrice.toFixed(2)}`,
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      image: "/placeholder.svg?height=48&width=48&text=Product",
      location: "Kigali, Rwanda",
      priceValue: data.wishedPrice,
    }
    addProduct(newProduct)
    setShowSubmissionModal(false)
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId)
    }
  }

  const handleViewDetails = (product: Product) => {
    alert(
      `Product Details:\nName: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}\nStatus: ${product.status}`
    )
  }

  return (
    <div className="container mx-auto px-6 pt-8 mt-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Product Management</h2>
          <Button
            onClick={() => setShowSubmissionModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Submit Product
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 p-4">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className={
                selectedStatus === status
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50"
              }
            >
              {status} ({status === "All" ? products.length : products.filter((p) => p.status === status).length})
            </Button>
          ))}
        </div>

        {/* Search and Date Filter */}
        <div className="p-4 border-b border-gray-200 space-y-4 w-120">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDateFilter(!showDateFilter)}>
                <Calendar className="w-4 h-4 mr-1" /> Filter by Date
              </Button>
              {dateFilter && (
                <Button variant="outline" size="sm" onClick={() => setDateFilter("")} className="text-red-600">
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
          {showDateFilter && (
            <div className="max-w-xs">
              <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
         <div className="p-4">
          <DataTable
            columns={productColumns(handleViewDetails, handleDeleteProduct)}
            data={filteredProducts}
            searchKey="name"
            showSearch
            showColumnVisibility
            showPagination
            showRowSelection={false}
          />
        </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">No products found</div>
              <div className="text-sm text-gray-400">
                {searchTerm || dateFilter || selectedStatus !== "All" 
                  ? "Try adjusting your filters"
                  : "Start by submitting your first product"
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simple Modal */}
      <ProductSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleProductSubmit}
      />
    </div>
  )
}
"use client"

import { useState } from "react"

export default function SimpleProductManagement() {
  const [products] = useState([
    {
      id: "1",
      name: "Organic Apples",
      category: "Fruits",
      quantity: "25 kg",
      date: "2023-11-15",
      price: "$45.50",
      status: "Pending",
    },
    {
      id: "2",
      name: "Fresh Carrots",
      category: "Vegetables",
      quantity: "18 kg",
      date: "2023-11-14",
      price: "$32.75",
      status: "Approved",
    },
    {
      id: "3",
      name: "Heirloom Tomatoes",
      category: "Vegetables",
      quantity: "15 kg",
      date: "2023-11-12",
      price: "$38.25",
      status: "Verified",
    },
  ])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Management</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-gray-600">{product.quantity}</td>
                <td className="py-3 px-4 text-gray-600">{product.date}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{product.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      product.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : product.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-500">Showing {products.length} products</div>
    </div>
  )
}

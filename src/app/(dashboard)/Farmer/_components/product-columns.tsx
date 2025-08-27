"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, MapPin } from "lucide-react"
import Image from "next/image"
import { Product } from "./product-context"

export const productColumns = (
  handleViewDetails: (p: Product) => void,
  handleDeleteProduct: (id: string) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
          {row.original.name}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">ID: {row.original.id}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
        <span className="text-sm truncate max-w-[100px]">{row.original.location}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "submittedDate",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={`${row.original.statusColor} border-0 text-xs`}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(row.original)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">View</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDeleteProduct(row.original.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-2 py-1"
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </div>
    ),
  },
]
 
import type { ProductSubmissionData } from "../(dashboard)/Farmer/_components/product-submission-modal"
import createAxiosClient from "../hooks/axiosClient"

export interface CreatProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number
  location: string
}

export interface SubmissionStats {
  totalSubmissions: number
  pendingSubmissions: number
  approvedSubmissions: number
  rejectedSubmissions: number
  totalEarnings: number
}

export interface Submission {
  id: string
  productName: string
  submittedQty: number
  wishedPrice: number
  status: "PENDING" | "VERIFIED" | "APPROVED" | "REJECTED"
  createdAt: string
  updatedAt: string
  farmerId: string
}

export interface LocationResponse {
  locations: string[]
}

export interface CategoryResponse {
  categories: string[]
}

export interface ProductSuggestionResponse {
  suggestions: string[]
}

export interface Product {
  id: string
  productName: string
  category: string
  unitPrice: number
  unit: string
}

export interface ProductsResponse {
  products: Product[]
}

// service class
export const productSubmissionService = {
  fetchUserLocations: async (): Promise<string[]> => {
    try {
      const axiosClient = createAxiosClient()
      const response = await axiosClient.get<LocationResponse>("")
      return response.data.locations
    } catch (error) {
      console.error("Failed to fetch locations from database:", error)
      return []
    }
  },

  fetchCategories: async (): Promise<string[]> => {
    try {
      const axiosClient = createAxiosClient()
      const response = await axiosClient.get<CategoryResponse>("/category")
      return response.data.categories
    } catch (error) {
      console.error("Failed to fetch categories from database:", error)
      return []
    }
  },

  fetchProductSuggestions: async (searchTerm: string, category?: string): Promise<string[]> => {
    try {
      const products = await productSubmissionService.getAllProducts(category)
      let filteredProducts = products

      // Filter by category if provided
      if (category) {
        filteredProducts = products.filter((product) => product.category === category)
      }

      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      return filteredProducts.map((product) => product.productName).slice(0, 10) // Increased limit to 10 suggestions
    } catch (error) {
      console.error("Failed to fetch product suggestions from database:", error)
      return []
    }
  },

  getAllProducts: async (category?: string): Promise<Product[]> => {
    try {
      const axiosClient = createAxiosClient()
      let url = "/products"
      if (category) {
        url += `?category=${encodeURIComponent(category)}`
      }  

      const response = await axiosClient.get<Product[]>(url)
      return response.data
    } catch (error) {
      console.error("Failed to fetch all products from database:", error)
      return []
    }
  },

  getProductSuggestionsFromExisting: async (searchTerm: string, category?: string): Promise<string[]> => {
    return await productSubmissionService.fetchProductSuggestions(searchTerm, category)
  },

  submitProduct: async (data: ProductSubmissionData) => {
    const axiosClient = createAxiosClient()
    const formData = new FormData()

    formData.append("productName", data.productName)
    formData.append("category", data.category)
    formData.append("quantity", data.quantity.toString())
    formData.append("unit", data.unit)
    formData.append("wishedPrice", data.wishedPrice.toString())
    formData.append("location", data.location)

    const response = await axiosClient.post("/farmers/submit-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },
}

// Export singleton

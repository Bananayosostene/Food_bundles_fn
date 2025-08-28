/* eslint-disable @typescript-eslint/no-explicit-any */
import createAxiosClient from "../hooks/axiosClient"

export interface ProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number
}

export const productSubmissionService = {
  submitProduct: async (productData: ProductSubmissionData) => {
    const axiosClient = createAxiosClient()

    const response = await axiosClient.post("/product-submissions", productData, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data
  },
}

import { ProductSubmissionData} from "../(dashboard)/Farmer/_components/product-submission-modal"
import createAxiosClient from "../hooks/axiosClient"


export interface CreatProductSubmissionData {
  productName: string
  category: string
  quantity: number
  unit: string
  wishedPrice: number

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
// service class
export const productSubmissionService = {
  submitProduct: async (data: ProductSubmissionData) => {
    const axiosClient = createAxiosClient();
      const formData = new FormData() 

      formData.append("productName", data.productName)
      formData.append("category", data.category)
      formData.append("quantity", data.quantity.toString())
      formData.append("unit", data.unit)
      formData.append("wishedPrice", data.wishedPrice.toString())
      const response = await axiosClient.post("/farmers/submit-product/{productId}", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
    
    } 
  

  }

// Export singleton


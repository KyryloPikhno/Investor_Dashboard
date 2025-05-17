import { PATH } from "@/constants/common"
import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
})

export const investmentsApi = {
  getAll: () => apiClient.get(PATH.INVESTMENTS),
  getById: (investorId: string) => apiClient.get(`${PATH.INVESTMENTS}/${investorId}`),
}

import axios from "axios"

import { PATH } from "@/constants/common"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  withCredentials: true,
})

export const investmentsApi = {
  getAll: () => apiClient.get(PATH.API_INVESTMENTS),
  getById: (investorId: string, filters?: Record<string, any>) =>
    apiClient.get(`${PATH.API_INVESTMENTS}/${investorId}`, {
      params: filters,
    }),
}

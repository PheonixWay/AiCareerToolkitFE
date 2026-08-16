// src/api/services/ats.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { AtsExtractResponse } from '@/types/ats.types'

export const extractAtsResume = async (formData: FormData): Promise<AtsExtractResponse> => {
  const { data } = await api.post<AtsExtractResponse>(
    API_ENDPOINTS.ats.extract,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return data
}

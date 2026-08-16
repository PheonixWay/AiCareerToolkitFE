// src/api/services/jd.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { JdExtractRequest, JdExtractResponse } from '@/types/jd.types'

export const extractJd = async (payload: JdExtractRequest): Promise<JdExtractResponse> => {
  const { data } = await api.post<JdExtractResponse>(API_ENDPOINTS.jd.extract, payload)
  return data
}

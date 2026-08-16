// src/api/services/resume.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { ResumeGenerateRequest, ResumeGenerateResponse } from '@/types/resume.types'

export const generateResume = async (payload: ResumeGenerateRequest): Promise<ResumeGenerateResponse> => {
  const { data } = await api.post<ResumeGenerateResponse>(API_ENDPOINTS.resume.generate, payload)
  return data
}

// src/api/services/auth.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { LoginCredentials, LoginResponse } from '@/types/auth.types'

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials)
  return data
}

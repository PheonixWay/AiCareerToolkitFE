// src/api/client.ts
// Axios instance with JWT request interceptor and 401 response interceptor.
// This is the ONLY file that creates an Axios instance — never create another.

import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { ENV } from '@/config/env'
import { getAuth, clearAuthStorage } from '@/utils/storage'

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor: Inject JWT ─────────────────────────────────────────
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = getAuth()
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

// ─── Response Interceptor: Handle 401 ────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Clear auth storage and redirect to login outside React tree
      clearAuthStorage()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const api = {
  get:    <T>(url: string, config?: object) => apiClient.get<T>(url, config),
  post:   <T>(url: string, data?: unknown, config?: object) => apiClient.post<T>(url, data, config),
  put:    <T>(url: string, data?: unknown, config?: object) => apiClient.put<T>(url, data, config),
  patch:  <T>(url: string, data?: unknown, config?: object) => apiClient.patch<T>(url, data, config),
  delete: <T>(url: string, config?: object) => apiClient.delete<T>(url, config),
}

export { ENV as API_CONFIG }

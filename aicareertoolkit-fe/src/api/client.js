import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('aict_auth')

  if (authToken) {
    try {
      const parsedToken = JSON.parse(authToken)
      if (parsedToken?.token) {
        config.headers.Authorization = `Bearer ${parsedToken.token}`
      }
    } catch {
      localStorage.removeItem('aict_auth')
    }
  }

  return config
})

export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
}

export { API_BASE_URL }

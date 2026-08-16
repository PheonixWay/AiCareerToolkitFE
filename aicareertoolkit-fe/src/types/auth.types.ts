// src/types/auth.types.ts

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface AuthUser {
  token: string
  username: string
}

export interface AuthStore {
  user: AuthUser | null
  isLoggedIn: boolean
  setAuth: (user: AuthUser) => void
  clearAuth: () => void
}

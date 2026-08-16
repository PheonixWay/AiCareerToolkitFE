// src/utils/storage.ts
// Typed localStorage helpers — ONLY place that touches localStorage for auth.
// Never call localStorage.getItem('aict_auth') directly anywhere else.

import type { AuthUser } from '@/types/auth.types'

const STORAGE_KEY = 'aict_auth'
const THEME_KEY = 'aict_theme'

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const getAuth = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (parsed?.token && parsed?.username) return parsed
    return null
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export const setAuthStorage = (user: AuthUser): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const clearAuthStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export type ThemeValue = 'light' | 'dark'

export const getTheme = (): ThemeValue | null => {
  const raw = localStorage.getItem(THEME_KEY)
  if (raw === 'light' || raw === 'dark') return raw
  return null
}

export const setThemeStorage = (theme: ThemeValue): void => {
  localStorage.setItem(THEME_KEY, theme)
}

// src/stores/auth.store.ts
// Global auth state — replaces AuthContext.
// Auto-hydrates from localStorage on app load. No Provider needed.

import { create } from 'zustand'
import { getAuth, setAuthStorage, clearAuthStorage } from '@/utils/storage'
import type { AuthUser, AuthStore } from '@/types/auth.types'

export const useAuthStore = create<AuthStore>((set) => ({
  user: getAuth(),                          // hydrate from localStorage on init
  isLoggedIn: Boolean(getAuth()?.token),

  setAuth: (user: AuthUser) => {
    setAuthStorage(user)                    // persist to localStorage
    set({ user, isLoggedIn: true })
  },

  clearAuth: () => {
    clearAuthStorage()                      // remove from localStorage
    set({ user: null, isLoggedIn: false })
  },
}))

// src/hooks/useAuth.ts
// Convenience hook — reads from the Zustand auth store.
// No Provider needed since Zustand is global.

import { useAuthStore } from '@/stores/auth.store'

export const useAuth = () => useAuthStore((state) => state)

// src/hooks/queries/useLoginMutation.ts
// On success: stores token in Zustand auth store (which also persists to localStorage)

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { PATHS } from '@/routes/paths'
import type { LoginCredentials } from '@/types/auth.types'

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data, variables) => {
      setAuth({
        token: data.access_token,
        username: variables.username.trim(),
      })
      navigate(PATHS.dashboard, { replace: true })
    },
  })
}

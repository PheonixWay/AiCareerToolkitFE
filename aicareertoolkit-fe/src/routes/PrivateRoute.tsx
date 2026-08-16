// src/routes/PrivateRoute.tsx
// Wraps any route that requires authentication.
// If not logged in, redirects to /login preserving the intended destination.

import type { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/routes/paths'

interface PrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />
  }

  return <>{children}</>
}

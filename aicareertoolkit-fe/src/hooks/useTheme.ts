// src/hooks/useTheme.ts
// Convenience hook — reads from ThemeContext.
// Must be used inside <ThemeProvider>.

import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return context
}

// src/context/ThemeContext.tsx
// Manages dark/light theme. Reads system preference on first visit,
// persists choice to localStorage via storage.ts helpers.

import { createContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { getTheme, setThemeStorage, type ThemeValue } from '@/utils/storage'

interface ThemeContextValue {
  theme: ThemeValue
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getInitialTheme = (): ThemeValue => {
  const saved = getTheme()
  if (saved) return saved
  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeValue>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    setThemeStorage(theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

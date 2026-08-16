// src/components/shared/ThemeToggle.tsx

import type { FC } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
        'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
        'dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

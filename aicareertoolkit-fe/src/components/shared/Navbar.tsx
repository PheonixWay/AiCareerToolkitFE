// src/components/shared/Navbar.tsx
// Top bar shown on all authenticated pages.

import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/routes/paths'
import { cn } from '@/lib/utils'

const PAGE_TITLES: Record<string, string> = {
  [PATHS.dashboard]:       'Dashboard',
  [PATHS.jdExtractor]:     'JD Extractor',
  [PATHS.atsResume]:       'ATS Resume',
  [PATHS.resumeGenerator]: 'Resume Generator',
  [PATHS.memoryBank]:      'Memory Bank',
}

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { user } = useAuth()
  const location = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname] ?? 'AI Career Toolkit'

  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6',
        'dark:border-slate-800 dark:bg-slate-950',
        className
      )}
    >
      {/* Page title */}
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {pageTitle}
      </h2>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-300 sm:inline">
            {user?.username}
          </span>
        </div>
      </div>
    </header>
  )
}

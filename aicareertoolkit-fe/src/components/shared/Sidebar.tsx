// src/components/shared/Sidebar.tsx
// Persistent left sidebar for all authenticated pages.
// Collapses to icon-only on mobile; collapse state managed by Zustand ui.store.

import type { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  FileSearch,
  Sparkles,
  Brain,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { useUIStore } from '@/stores/ui.store'
import { PATHS } from '@/routes/paths'

interface NavItem {
  label: string
  path: string
  icon: FC<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',        path: PATHS.dashboard,       icon: LayoutDashboard },
  { label: 'JD Extractor',     path: PATHS.jdExtractor,     icon: FileSearch },
  { label: 'ATS Resume',       path: PATHS.atsResume,       icon: FileText },
  { label: 'Resume Generator', path: PATHS.resumeGenerator, icon: Sparkles },
  { label: 'Memory Bank',      path: PATHS.memoryBank,      icon: Brain },
]

export const Sidebar: FC = () => {
  const { user, clearAuth } = useAuth()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate(PATHS.login, { replace: true })
  }

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300',
        'dark:border-slate-800 dark:bg-slate-950',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
          <Briefcase className="h-4 w-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <span className="animate-fadeIn text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
            AI Career Toolkit
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                title={sidebarCollapsed ? label : undefined}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    'hover:bg-slate-100 dark:hover:bg-slate-800',
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-slate-400',
                    sidebarCollapsed && 'justify-center px-2'
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span className="animate-fadeIn">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        {!sidebarCollapsed && (
          <div className="animate-fadeIn mb-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900">
            <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
              {user?.username}
            </p>
            <p className="text-xs text-slate-400">Signed in</p>
          </div>
        )}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors',
            'hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span className="animate-fadeIn">Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full',
          'border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors',
          'hover:border-emerald-300 hover:text-emerald-600',
          'dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-emerald-400'
        )}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  )
}

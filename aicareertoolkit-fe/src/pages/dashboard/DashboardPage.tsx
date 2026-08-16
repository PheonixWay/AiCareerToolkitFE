// src/pages/dashboard/DashboardPage.tsx
// Welcome page with 4 module cards linking to each tool.

import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSearch, FileText, Sparkles, Brain, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { PageHeader } from '@/components/shared/PageHeader'
import { PATHS } from '@/routes/paths'
import { cn } from '@/lib/utils'

interface ModuleCard {
  icon: FC<{ className?: string }>
  label: string
  description: string
  path: string
  color: string
  bgColor: string
  darkColor: string
  darkBgColor: string
}

const MODULES: ModuleCard[] = [
  {
    icon: FileSearch,
    label: 'JD Extractor',
    description: 'Extract job title, required skills, experience, and interview prep questions from any job description.',
    path: PATHS.jdExtractor,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    darkColor: 'dark:text-blue-400',
    darkBgColor: 'dark:bg-blue-950/40',
  },
  {
    icon: FileText,
    label: 'ATS Resume',
    description: 'Parse and analyze your resume for ATS compatibility and keyword optimization.',
    path: PATHS.atsResume,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    darkColor: 'dark:text-violet-400',
    darkBgColor: 'dark:bg-violet-950/40',
  },
  {
    icon: Sparkles,
    label: 'Resume Generator',
    description: 'Generate a context-aware, tailored resume using RAG — powered by your career memory.',
    path: PATHS.resumeGenerator,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    darkColor: 'dark:text-amber-400',
    darkBgColor: 'dark:bg-amber-950/40',
  },
  {
    icon: Brain,
    label: 'Memory Bank',
    description: 'Ingest your career history, projects, and skills into your personal AI knowledge base.',
    path: PATHS.memoryBank,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    darkColor: 'dark:text-emerald-400',
    darkBgColor: 'dark:bg-emerald-950/40',
  },
]

export const DashboardPage: FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="animate-fadeIn space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.username ?? 'there'} 👋`}
        subtitle="Your AI-powered career toolkit. Select a tool to get started."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MODULES.map(({ icon: Icon, label, description, path, color, bgColor, darkColor, darkBgColor }) => (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            className={cn(
              'group flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left',
              'transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft',
              'dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
            )}
          >
            <div className={cn('rounded-xl p-3', bgColor, darkBgColor)}>
              <Icon className={cn('h-6 w-6', color, darkColor)} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {description}
              </p>
            </div>
            <div className={cn('mt-auto flex items-center gap-1 text-sm font-medium', color, darkColor)}>
              Open tool
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// src/components/shared/PageHeader.tsx

import type { FC } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, className, children }) => {
  return (
    <div className={cn('flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
      {children && <div className="mt-2 sm:mt-0">{children}</div>}
    </div>
  )
}

// src/components/shared/LoadingSpinner.tsx

import type { FC } from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full border-slate-300 border-t-emerald-600 dark:border-slate-600 dark:border-t-emerald-400',
        sizeMap[size],
        className
      )}
    />
  )
}

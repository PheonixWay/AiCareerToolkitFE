// src/components/shared/ErrorAlert.tsx

import type { FC } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorAlertProps {
  message: string
  className?: string
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ message, className }) => {
  if (!message) return null

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700',
        'dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400',
        className
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

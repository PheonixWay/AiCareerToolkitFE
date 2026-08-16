// src/pages/auth/LoginPage.tsx
// Migrated from App.jsx — all logic now delegated to useLoginMutation hook.

import { useState, type FC, type FormEvent } from 'react'
import { Eye, EyeOff, Briefcase } from 'lucide-react'
import { useLoginMutation } from '@/hooks/queries/useLoginMutation'
import { ErrorAlert } from '@/components/shared/ErrorAlert'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { cn } from '@/lib/utils'
import axios from 'axios'

export const LoginPage: FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const { mutate: login, isPending, error } = useLoginMutation()

  const errorMessage = (() => {
    if (!error) return ''
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) return 'Incorrect username or password.'
      return 'Could not connect to backend. Please verify the API server is running.'
    }
    return 'Something went wrong. Please try again.'
  })()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!credentials.username.trim() || !credentials.password.trim()) return
    login(credentials)
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      {/* Theme toggle top-right */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-floatIn rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:rounded-3xl sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
            AI Career Toolkit
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your AI career tools
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
              className={cn(
                'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition',
                'placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
                'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500',
                'dark:focus:border-emerald-500'
              )}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                className={cn(
                  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-slate-900 outline-none transition',
                  'placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
                  'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder:text-slate-500',
                  'dark:focus:border-emerald-500'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {errorMessage && <ErrorAlert message={errorMessage} />}

          <button
            type="submit"
            disabled={isPending || !credentials.username.trim() || !credentials.password.trim()}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition',
              'hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:bg-emerald-400 dark:disabled:bg-emerald-800'
            )}
          >
            {isPending && <LoadingSpinner size="sm" />}
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}

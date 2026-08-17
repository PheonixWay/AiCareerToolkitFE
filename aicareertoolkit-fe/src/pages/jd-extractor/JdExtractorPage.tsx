import type { FC } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FileSearch, LayoutGrid, Code2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ErrorAlert } from '@/components/shared/ErrorAlert'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useJdExtractMutation } from '@/hooks/queries/useJdExtractMutation'
import { JdInputPanel } from './components/JdInputPanel'
import { JdResultCardView } from './components/JdResultCardView'
import { JdResultJsonView } from './components/JdResultJsonView'

type ViewMode = 'cards' | 'json'

export const JdExtractorPage: FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const {
    mutate: extract,
    data: extractedData,
    isPending,
    error,
    reset,
  } = useJdExtractMutation()

  const handleExtract = (rawText: string) => {
    extract({ raw_text: rawText })
  }

  const handleClear = () => {
    reset()
  }

  const getErrorMessage = (err: unknown): string => {
    if (!err) return ''
    if (axios.isAxiosError(err)) {
      const detail = err.response?.data?.detail
      if (typeof detail === 'string') return detail
      if (Array.isArray(detail)) {
        return detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join(', ')
      }
      if (err.response?.status === 401) {
        return 'Session expired or unauthorized. Please log in again.'
      }
      return err.message || 'Failed to extract job description.'
    }
    return (err as Error)?.message || 'An unexpected error occurred.'
  }

  const errorMessage = error ? getErrorMessage(error) : ''

  return (
    <div className="animate-fadeIn space-y-6 pb-12">
      <PageHeader
        title="JD Extractor"
        subtitle="Paste any job description and let AI extract structured requirements, skills, and ATS keywords."
      />

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Input Panel (5 columns) */}
        <div className="lg:col-span-5">
          <JdInputPanel
            onExtract={handleExtract}
            isLoading={isPending}
            onClear={handleClear}
          />
        </div>

        {/* Right Output Panel (7 columns) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 min-h-[500px]">
          {/* Header & View Switcher */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Extraction Results
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {extractedData
                  ? `Successfully parsed role: ${extractedData.job_title}`
                  : 'AI parsed structured output'}
              </p>
            </div>

            {extractedData && (
              <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    viewMode === 'cards'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Card View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('json')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    viewMode === 'json'
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>JSON Tree</span>
                </button>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="mt-5 flex-1">
            {errorMessage && (
              <div className="mb-4">
                <ErrorAlert message={errorMessage} />
              </div>
            )}

            {isPending && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
                  <LoadingSpinner size="lg" className="relative text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Extracting Job Insights with AI
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                    Analyzing roles, years of experience, technical skills, education criteria, and ATS keywords...
                  </p>
                </div>
              </div>
            )}

            {!isPending && !extractedData && !errorMessage && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-20 text-center dark:border-slate-800 dark:bg-slate-950/30">
                <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <FileSearch className="h-8 w-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  No Job Description Extracted Yet
                </h3>
                <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
                  Paste a job description on the left and click <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Extract JD</strong> to view structured insights here.
                </p>
              </div>
            )}

            {!isPending && extractedData && (
              <div className="animate-fadeIn">
                {viewMode === 'cards' ? (
                  <JdResultCardView data={extractedData} />
                ) : (
                  <JdResultJsonView data={extractedData} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

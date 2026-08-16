// src/pages/jd-extractor/JdExtractorPage.tsx
// Dummy placeholder — backend integration will be added in a future phase.

import type { FC } from 'react'
import { FileSearch } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'

export const JdExtractorPage: FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <PageHeader
        title="JD Extractor"
        subtitle="Paste a job description and extract structured insights instantly."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Paste Job Description
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add a full job description below to extract role title, experience, skills, and interview questions.
          </p>
          <textarea
            rows={12}
            disabled
            placeholder="Backend integration coming soon…"
            className="mt-4 w-full cursor-not-allowed resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
          />
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
            >
              Extract JD
            </button>
            <button
              type="button"
              disabled
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 opacity-50 cursor-not-allowed dark:border-slate-700 dark:text-slate-400"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Extracted Output
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 dark:border-slate-700 dark:bg-slate-800/50">
            <FileSearch className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Structured results will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

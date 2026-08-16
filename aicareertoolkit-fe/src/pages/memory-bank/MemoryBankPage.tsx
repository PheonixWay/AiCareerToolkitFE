// src/pages/memory-bank/MemoryBankPage.tsx
// Dummy placeholder — backend integration will be added in a future phase.

import type { FC } from 'react'
import { Brain, Upload, Search, Clock } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'

export const MemoryBankPage: FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <PageHeader
        title="Career Memory Bank"
        subtitle="Ingest your career history, skills, and projects into your personal AI knowledge base."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ingest Panel */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Ingest to Memory
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add career context — work experience, projects, certifications, or skills.
          </p>
          <textarea
            rows={8}
            disabled
            placeholder="Backend integration coming soon…"
            className="w-full cursor-not-allowed resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
          />
          <button
            type="button"
            disabled
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
          >
            Ingest to Memory
          </button>
        </div>

        {/* Query Panel */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Query Memory
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ask your memory bank a question to retrieve relevant career context.
          </p>
          <textarea
            rows={3}
            disabled
            placeholder="e.g. What backend projects have I worked on?"
            className="w-full cursor-not-allowed resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
          />
          <button
            type="button"
            disabled
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
          >
            Search Memory
          </button>

          {/* History placeholder */}
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Ingestion History
            </div>
            <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-800/50">
              <Brain className="h-8 w-8 text-slate-300 dark:text-slate-600" />
              <p className="text-xs text-slate-400 dark:text-slate-500">No memories ingested yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

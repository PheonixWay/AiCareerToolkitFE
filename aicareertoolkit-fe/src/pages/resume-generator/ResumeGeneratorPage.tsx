// src/pages/resume-generator/ResumeGeneratorPage.tsx
// Dummy placeholder — backend integration will be added in a future phase.

import type { FC } from 'react'
import { Sparkles, FileOutput } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'

export const ResumeGeneratorPage: FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <PageHeader
        title="Resume Generator"
        subtitle="Generate a context-aware resume tailored to any job description using your Memory Bank."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Panel */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Job Context
          </h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Paste job description or role context
            </label>
            <textarea
              rows={8}
              disabled
              placeholder="Backend integration coming soon…"
              className="w-full cursor-not-allowed resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Template
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Classic', 'Modern', 'Minimal', 'Executive'].map((t) => (
                <div
                  key={t}
                  className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-sm text-slate-400 opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
          >
            Generate Resume
          </button>
        </div>

        {/* Preview Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Resume Preview
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-20 dark:border-slate-700 dark:bg-slate-800/50">
            <FileOutput className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Generated resume will preview here
            </p>
            <Sparkles className="h-4 w-4 text-amber-300 dark:text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

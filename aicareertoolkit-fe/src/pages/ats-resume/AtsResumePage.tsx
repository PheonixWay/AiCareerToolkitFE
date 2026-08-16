// src/pages/ats-resume/AtsResumePage.tsx
// Dummy placeholder — backend integration will be added in a future phase.

import type { FC } from 'react'
import { FileText, UploadCloud } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'

export const AtsResumePage: FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <PageHeader
        title="ATS Resume Extractor"
        subtitle="Upload your resume to analyze ATS compatibility and keyword alignment."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Upload Resume
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Supported formats: PDF, DOCX
          </p>

          {/* Dropzone placeholder */}
          <div className="mt-4 flex cursor-not-allowed flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 opacity-60 dark:border-slate-700 dark:bg-slate-800/50">
            <UploadCloud className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Backend integration coming soon
            </p>
          </div>

          <button
            type="button"
            disabled
            className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed"
          >
            Analyze Resume
          </button>
        </div>

        {/* Output Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Analysis Results
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 dark:border-slate-700 dark:bg-slate-800/50">
            <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-400 dark:text-slate-500">
              ATS analysis will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

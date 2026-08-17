// src/pages/jd-extractor/components/JdInputPanel.tsx
import { type FC, type FormEvent, useState } from 'react'
import { Sparkles, Trash2, ArrowRight } from 'lucide-react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface JdInputPanelProps {
  onExtract: (text: string) => void
  isLoading: boolean
  onClear: () => void
}

const SAMPLE_JD = `Senior Full Stack Engineer
Tech Innovations Inc. - San Francisco, CA (Remote)
Department: Core Engineering
Employment Type: Full-time

About the Role:
We are seeking an experienced Senior Full Stack Engineer to architect and build scalable web applications. 

Responsibilities:
- Design, develop, and deploy cloud-native web services using React, TypeScript, and FastAPI.
- Architect scalable PostgreSQL databases and optimize query performance.
- Collaborate with product and design teams to deliver intuitive user experiences.
- Implement CI/CD pipelines and maintain automated test suites.
- Mentor junior engineers and participate in code reviews.

Requirements:
- 4+ years of professional software engineering experience.
- Strong proficiency in React, TypeScript, Python, FastAPI, and PostgreSQL.
- Experience with Docker, Kubernetes, and AWS is a huge plus.
- Excellent communication and problem-solving skills.
- Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience.`

export const JdInputPanel: FC<JdInputPanelProps> = ({
  onExtract,
  isLoading,
  onClear,
}) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim() || isLoading) return
    onExtract(text.trim())
  }

  const handleClear = () => {
    setText('')
    onClear()
  }

  const handleLoadSample = () => {
    setText(SAMPLE_JD)
  }

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Paste Job Description</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Paste the raw text of any job posting to extract structured data.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isLoading}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors underline decoration-dotted"
        >
          Load Sample
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col flex-1">
        <div className="relative flex-1">
          <textarea
            rows={14}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="Paste complete job description here (e.g. Job title, requirements, tech stack, responsibilities)..."
            className="w-full h-full min-h-[300px] resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 transition-all dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:bg-slate-950"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{text.trim().length.toLocaleString()} characters</span>
          <span>{text.trim() ? `${text.trim().split(/\s+/).length} words` : '0 words'}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none transition-all duration-150"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="border-t-white" />
                <span>Extracting with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Extract JD</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {text && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 transition-colors dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

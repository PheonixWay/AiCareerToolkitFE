// src/pages/retrieval-test/RetrievalTestPage.tsx
import { type FC, useState } from 'react'
import {
  FlaskConical,
  Search,
  Loader2,
  Sparkles,
  AlertCircle,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  ArrowRight,
  Info,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { testRetrieval } from '@/api/services/retrieval.service'
import type {
  RetrievalResultItem,
  RetrievalTestResponse,
} from '@/types/retrieval.types'

const EXAMPLE_QUERIES = [
  'Looking for a dev who knows React Native and state management',
  'Backend developer experienced with FastAPI, Python, and PostgreSQL',
  'Full stack engineer with TypeScript, Next.js, and cloud deployments',
  'Vector database, embeddings, and RAG system architecture',
  'Database optimization, schema indexing, and query tuning',
]

const CATEGORY_STYLES: Record<string, { label: string; badge: string }> = {
  experience: {
    label: 'Work Experience',
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  },
  project: {
    label: 'Project',
    badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
  },
  skill: {
    label: 'Skill & Stack',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
  },
  education: {
    label: 'Education',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
  },
}

export const RetrievalTestPage: FC = () => {
  const [query, setQuery] = useState('')
  const [topK, setTopK] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<RetrievalTestResponse | null>(null)
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
  const [queryTime, setQueryTime] = useState<number | null>(null)

  const handleTestRetrieval = async (customQuery?: string) => {
    const q = (customQuery ?? query).trim()
    if (!q) {
      setError('Please provide a search query to test vector retrieval.')
      return
    }

    if (customQuery) {
      setQuery(customQuery)
    }

    setIsLoading(true)
    setError(null)
    const startTime = performance.now()

    try {
      const response = await testRetrieval({ query: q, top_k: topK })
      setData(response)
      setQueryTime(Math.round(performance.now() - startTime))
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
            'Failed to execute vector retrieval test.'
      setError(String(errorMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getScoreBadge = (score: number) => {
    const percentage = Math.round(score * 100)
    if (percentage >= 80) {
      return {
        text: `${percentage}% Match`,
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
        barColor: 'bg-emerald-500',
      }
    }
    if (percentage >= 60) {
      return {
        text: `${percentage}% Match`,
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
        barColor: 'bg-amber-500',
      }
    }
    return {
      text: `${percentage}% Match`,
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      barColor: 'bg-slate-400',
    }
  }

  return (
    <div className="animate-fadeIn space-y-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Vector Retrieval Lab"
        subtitle="Test and inspect pgvector cosine similarity search in real-time. Verify vector math, rank accuracy, and semantic relevance."
      />

      {/* Query Input Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor="retrieval-query-input"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              <FlaskConical className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Test Query / Job Requirement
            </label>
            <span className="text-[11px] text-slate-400">
              Vectorized via Gemini (3072-dim) &bull; Cosine Distance (&lt;=&gt;)
            </span>
          </div>

          <textarea
            id="retrieval-query-input"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type or paste a job requirement query (e.g. 'Looking for a dev who knows React Native and state management')..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-950 transition-colors"
          />

          {/* Quick Example Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-slate-400">
              Quick Test Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_QUERIES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleTestRetrieval(example)}
                  disabled={isLoading}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 transition-all text-left truncate max-w-xs sm:max-w-md"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Bar: Top-K Slider + Submit Button */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 dark:border-slate-800/80">
            {/* Top-K Range Slider */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Top-K:
                </span>
                <span className="inline-flex min-w-[28px] items-center justify-center rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {topK}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={1}
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-700"
              />
              <span className="text-[11px] text-slate-400">(3 to 10 chunks)</span>
            </div>

            {/* Test Retrieval Trigger Button */}
            <button
              type="button"
              onClick={() => handleTestRetrieval()}
              disabled={isLoading || !query.trim()}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Embedding & Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Test Retrieval
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-800/80 dark:bg-red-950/40 dark:text-red-300 animate-fadeIn">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <p className="flex-1">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-900 dark:text-red-400"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Indicator Banner */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/40 py-16 text-center dark:border-emerald-800 dark:bg-emerald-950/20 animate-fadeIn">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="mt-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
            Vectorizing Query & Searching pgvector Database
          </p>
          <p className="mt-1 max-w-sm text-[11px] text-slate-500 dark:text-slate-400">
            Calling <span className="font-mono text-emerald-600 dark:text-emerald-400">gemini-embedding-001</span> with task_type=&quot;retrieval_query&quot; and sorting by cosine similarity.
          </p>
        </div>
      )}

      {/* Results Section */}
      {data && !isLoading && (
        <div className="space-y-4 animate-fadeIn">
          {/* Results Summary Bar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {data.total_results} Ranked Chunks Returned
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Query: &ldquo;<span className="italic font-medium text-slate-700 dark:text-slate-300">{data.query}</span>&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              {queryTime !== null && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {queryTime}ms roundtrip
                </span>
              )}
              <span className="flex items-center gap-1 rounded-md bg-slate-200/70 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Cpu className="h-3 w-3 mr-0.5" />
                Cosine Distance (&lt;=&gt;)
              </span>
            </div>
          </div>

          {/* Empty Results State */}
          {data.results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center dark:border-slate-800 dark:bg-slate-900">
              <Info className="h-8 w-8 text-slate-400" />
              <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                No matching memory chunks found in database
              </p>
              <p className="mt-1 max-w-sm text-[11px] text-slate-400 dark:text-slate-500">
                Make sure you have ingested a resume in the Career Memory Bank or added memory entries.
              </p>
            </div>
          ) : (
            /* Results Cards Grid */
            <div className="grid gap-4 md:grid-cols-2">
              {data.results.map((item: RetrievalResultItem, index: number) => {
                const categoryConfig =
                  CATEGORY_STYLES[item.category.toLowerCase()] || {
                    label: item.category,
                    badge: 'bg-slate-100 text-slate-700 border-slate-200',
                  }
                const scoreConfig = getScoreBadge(item.similarity_score)
                const isExpanded = expandedCards[item.id] || false
                const isLongContent = item.content.length > 250

                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800/80"
                  >
                    <div className="space-y-3">
                      {/* Card Top: Rank & Category & Score */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            #{index + 1}
                          </span>
                          <span
                            className={`rounded-xl border px-2.5 py-0.5 text-[10px] font-semibold ${categoryConfig.badge}`}
                          >
                            {categoryConfig.label}
                          </span>
                        </div>

                        {/* Similarity Score Pill */}
                        <div
                          className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-0.5 text-xs font-bold shadow-xs ${scoreConfig.badgeClass}`}
                          title={`Raw Cosine Similarity: ${item.similarity_score.toFixed(4)}`}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{scoreConfig.text}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {item.title || 'Untitled Memory Chunk'}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                          {isExpanded || !isLongContent
                            ? item.content
                            : `${item.content.slice(0, 250)}...`}
                        </p>

                        {isLongContent && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                          >
                            {isExpanded ? (
                              <>
                                Show less <ChevronUp className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                Read full chunk <ChevronDown className="h-3 w-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Similarity Progress Bar & Metadata */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Relevance Score</span>
                        <span className="font-mono font-medium">
                          {(item.similarity_score * 100).toFixed(1)}% ({item.similarity_score.toFixed(4)})
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${scoreConfig.barColor}`}
                          style={{
                            width: `${Math.max(0, Math.min(100, item.similarity_score * 100))}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>Chunk ID: #{item.id}</span>
                        <span>
                          {new Date(item.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

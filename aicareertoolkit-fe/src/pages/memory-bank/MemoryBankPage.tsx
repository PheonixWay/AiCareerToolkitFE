// src/pages/memory-bank/MemoryBankPage.tsx
import { type FC, useEffect, useState } from 'react'
import {
  Brain,
  Plus,
  Loader2,
  AlertCircle,
  Upload,
  Search,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { PdfUploadZone } from '@/components/memory/PdfUploadZone'
import { MemoryCard } from '@/components/memory/MemoryCard'
import { AddEntryModal } from '@/components/memory/AddEntryModal'
import { useMemoryStore } from '@/stores/memory.store'
import type { MemoryCategory, UpdateMemoryRequest } from '@/types/memory.types'

const TABS: { value: MemoryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Items' },
  { value: 'experience', label: 'Work Experience' },
  { value: 'project', label: 'Projects' },
  { value: 'skill', label: 'Skills & Stack' },
  { value: 'education', label: 'Education' },
]

export const MemoryBankPage: FC = () => {
  const {
    cards,
    isLoading,
    isUploading,
    uploadProgress,
    error,
    fetchMemories,
    uploadPdf,
    addEntry,
    editEntry,
    removeEntry,
    clearError,
  } = useMemoryStore()

  const [activeTab, setActiveTab] = useState<MemoryCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  const handlePdfUpload = async (file: File) => {
    try {
      const result = await uploadPdf(file)
      setSuccessMessage(
        `🎉 Resume vectorized! ${result.chunks_saved} semantic memory chunks saved.`
      )
      setTimeout(() => setSuccessMessage(null), 7000)
    } catch {
      // Error handled via store
    }
  }

  const handleEdit = (id: number, payload: UpdateMemoryRequest) => {
    editEntry(id, payload)
  }

  // Filter cards by category tab and search query
  const tabFiltered =
    activeTab === 'all' ? cards : cards.filter((c) => c.category === activeTab)

  const filteredCards = tabFiltered.filter((card) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    const titleMatch = card.title?.toLowerCase().includes(q) ?? false
    const contentMatch = card.content.toLowerCase().includes(q)
    return titleMatch || contentMatch
  })

  const isEmpty = cards.length === 0

  return (
    <div className="animate-fadeIn space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Career Memory Bank"
          subtitle="Your personal AI knowledge base — vectorized semantic memory powering your resume and ATS tailoring."
        />
        {!isEmpty && (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchMemories()}
              disabled={isLoading}
              title="Refresh memories"
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs font-medium text-emerald-800 shadow-sm dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p>{successMessage}</p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="ml-auto text-emerald-600 hover:text-emerald-900 dark:text-emerald-400"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-800/80 dark:bg-red-950/40 dark:text-red-300 animate-fadeIn">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <p className="flex-1">{error}</p>
          <button
            type="button"
            onClick={clearError}
            className="text-red-600 hover:text-red-900 dark:text-red-400"
          >
            ✕
          </button>
        </div>
      )}

      {/* ─── EMPTY STATE: Onboarding Drag & Drop Zone ─────────────────────── */}
      {isEmpty && !isLoading && (
        <div className="mx-auto max-w-2xl space-y-6 pt-4">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/40">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                Initialize Your Career Knowledge Base
              </h2>
              <p className="mx-auto mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
                Upload your existing resume to let our AI engine extract, parse into semantic
                chunks, and store vectors with Google Gemini embeddings in PostgreSQL.
              </p>
            </div>

            <PdfUploadZone
              onFileSelected={handlePdfUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="text-xs font-medium text-slate-400">or manual entry</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-all"
            >
              <Plus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Add First Experience Manually
            </button>
          </div>
        </div>
      )}

      {/* ─── LOADING SPINNER ──────────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
          <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            Loading Career Memory Bank...
          </p>
        </div>
      )}

      {/* ─── MAIN DASHBOARD: Displaying Ingested Memories ─────────────────── */}
      {!isEmpty && !isLoading && (
        <div className="space-y-5">
          {/* Re-upload Ingestion Bar / Progress */}
          {isUploading ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Vectorizing resume chunks...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-200/60 dark:bg-emerald-900">
                <div
                  className="h-1.5 rounded-full bg-emerald-600 transition-all duration-500 dark:bg-emerald-400"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {cards.length} Total Memory Chunks Stored
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Continuously vector-indexed for rapid ATS resume tailoring
                  </p>
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/40 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300 transition-all">
                <Upload className="h-3.5 w-3.5" />
                Re-upload Resume PDF
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handlePdfUpload(f)
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
          )}

          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TABS.map((tab) => {
                const isSelected = activeTab === tab.value
                const count =
                  tab.value === 'all'
                    ? cards.length
                    : cards.filter((c) => c.category === tab.value).length

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        isSelected
                          ? 'bg-emerald-700 text-white dark:bg-emerald-800'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Cards Grid */}
          {filteredCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {searchQuery ? 'No matching memories found' : `No ${activeTab} memories yet`}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Click "Add Experience" to add your first item to this category.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card) => (
                <MemoryCard
                  key={card.id}
                  card={card}
                  onDelete={removeEntry}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Entry Modal */}
      {showAddModal && (
        <AddEntryModal
          onClose={() => setShowAddModal(false)}
          onSubmit={addEntry}
        />
      )}
    </div>
  )
}

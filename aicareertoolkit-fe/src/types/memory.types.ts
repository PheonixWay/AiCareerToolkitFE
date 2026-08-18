// src/types/memory.types.ts

export type MemoryCategory = 'experience' | 'project' | 'skill' | 'education'

// ─── API Models ──────────────────────────────────────────────────────────────
export interface MemoryCard {
  id: number
  category: MemoryCategory
  title: string | null
  content: string
  created_at: string // ISO datetime string
}

// ─── Ingest PDF ───────────────────────────────────────────────────────────────
export interface IngestPdfResponse {
  message: string
  chunks_saved: number
}

// ─── Add Memory (Direct Manual Input) ─────────────────────────────────────────
export interface AddMemoryRequest {
  category: MemoryCategory
  title: string
  content: string
}

// ─── Update Memory ────────────────────────────────────────────────────────────
export interface UpdateMemoryRequest {
  category?: MemoryCategory
  title?: string
  content?: string
}

// ─── Delete Memory ────────────────────────────────────────────────────────────
export interface DeleteMemoryResponse {
  message: string
}

// ─── Legacy / Compatibility ──────────────────────────────────────────────────
/** @deprecated Use AddMemoryRequest instead */
export interface MemoryIngestRequest {
  content: string
}

/** @deprecated Use IngestPdfResponse or MemoryCard instead */
export interface MemoryIngestResponse {
  [key: string]: unknown
}

export interface MemoryQueryRequest {
  query: string
}

export interface MemoryQueryResponse {
  [key: string]: unknown
}

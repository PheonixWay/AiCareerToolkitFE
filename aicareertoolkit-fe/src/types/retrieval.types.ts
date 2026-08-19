// src/types/retrieval.types.ts
import type { MemoryCategory } from './memory.types'

export interface RetrievalResultItem {
  id: number
  title: string | null
  category: MemoryCategory | string
  content: string
  similarity_score: number // e.g. 0.8923
  created_at: string
}

export interface RetrievalTestRequest {
  query: string
  top_k?: number
}

export interface RetrievalTestResponse {
  query: string
  total_results: number
  results: RetrievalResultItem[]
}

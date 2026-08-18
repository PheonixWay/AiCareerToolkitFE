// src/api/services/memory.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type {
  MemoryCard,
  IngestPdfResponse,
  AddMemoryRequest,
  UpdateMemoryRequest,
  DeleteMemoryResponse,
  MemoryIngestRequest,
  MemoryIngestResponse,
  MemoryQueryRequest,
  MemoryQueryResponse,
} from '@/types/memory.types'

/** Upload a PDF file — runs the full 5-step ingestion pipeline on the backend. */
export const ingestPdf = async (file: File): Promise<IngestPdfResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post<IngestPdfResponse>(
    API_ENDPOINTS.memory.ingestPdf,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return data
}

/** Fetch all career memory cards. */
export const getAllMemories = async (): Promise<MemoryCard[]> => {
  const { data } = await api.get<MemoryCard[]>(API_ENDPOINTS.memory.getAll)
  return data
}

/** Add a single memory entry via plain text (no PDF). */
export const addMemory = async (payload: AddMemoryRequest): Promise<MemoryCard> => {
  const { data } = await api.post<MemoryCard>(API_ENDPOINTS.memory.add, payload)
  return data
}

/** Update a memory card's text fields. */
export const updateMemory = async (
  id: number,
  payload: UpdateMemoryRequest
): Promise<MemoryCard> => {
  const { data } = await api.patch<MemoryCard>(API_ENDPOINTS.memory.update(id), payload)
  return data
}

/** Delete a memory card. */
export const deleteMemory = async (id: number): Promise<DeleteMemoryResponse> => {
  const { data } = await api.delete<DeleteMemoryResponse>(API_ENDPOINTS.memory.delete(id))
  return data
}

// ─── Legacy functions ────────────────────────────────────────────────────────
export const ingestMemory = async (payload: MemoryIngestRequest): Promise<MemoryIngestResponse> => {
  const { data } = await api.post<MemoryIngestResponse>(API_ENDPOINTS.memory.ingest, payload)
  return data
}

export const queryMemory = async (payload: MemoryQueryRequest): Promise<MemoryQueryResponse> => {
  const { data } = await api.post<MemoryQueryResponse>(API_ENDPOINTS.memory.query, payload)
  return data
}

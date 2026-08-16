// src/api/services/memory.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type {
  MemoryIngestRequest,
  MemoryIngestResponse,
  MemoryQueryRequest,
  MemoryQueryResponse,
} from '@/types/memory.types'

export const ingestMemory = async (payload: MemoryIngestRequest): Promise<MemoryIngestResponse> => {
  const { data } = await api.post<MemoryIngestResponse>(API_ENDPOINTS.memory.ingest, payload)
  return data
}

export const queryMemory = async (payload: MemoryQueryRequest): Promise<MemoryQueryResponse> => {
  const { data } = await api.post<MemoryQueryResponse>(API_ENDPOINTS.memory.query, payload)
  return data
}

// src/api/services/retrieval.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type {
  RetrievalTestRequest,
  RetrievalTestResponse,
} from '@/types/retrieval.types'

/**
 * Test Vector Retrieval:
 * Sends query text and top_k to backend, where Google Gemini generates query embeddings
 * and PostgreSQL pgvector calculates Cosine Similarity (<=>).
 */
export const testRetrieval = async (
  payload: RetrievalTestRequest
): Promise<RetrievalTestResponse> => {
  const { data } = await api.post<RetrievalTestResponse>(
    API_ENDPOINTS.memory.testRetrieval,
    payload
  )
  return data
}

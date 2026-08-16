// src/types/memory.types.ts
// Response shapes to be confirmed once backend Memory Bank module is ready

export interface MemoryIngestRequest {
  content: string
}

export interface MemoryIngestResponse {
  // TBD — will be updated when backend is implemented
  [key: string]: unknown
}

export interface MemoryQueryRequest {
  query: string
}

export interface MemoryQueryResponse {
  // TBD — will be updated when backend is implemented
  [key: string]: unknown
}

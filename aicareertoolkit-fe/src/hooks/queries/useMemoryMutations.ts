// src/hooks/queries/useMemoryMutations.ts

import { useMutation } from '@tanstack/react-query'
import { ingestMemory, queryMemory } from '@/api/services/memory.service'
import type { MemoryIngestRequest, MemoryQueryRequest } from '@/types/memory.types'

export const useMemoryIngestMutation = () => {
  return useMutation({
    mutationFn: (payload: MemoryIngestRequest) => ingestMemory(payload),
  })
}

export const useMemoryQueryMutation = () => {
  return useMutation({
    mutationFn: (payload: MemoryQueryRequest) => queryMemory(payload),
  })
}

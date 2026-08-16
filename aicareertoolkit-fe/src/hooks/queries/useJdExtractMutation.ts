// src/hooks/queries/useJdExtractMutation.ts

import { useMutation } from '@tanstack/react-query'
import { extractJd } from '@/api/services/jd.service'
import type { JdExtractRequest } from '@/types/jd.types'

export const useJdExtractMutation = () => {
  return useMutation({
    mutationFn: (payload: JdExtractRequest) => extractJd(payload),
  })
}

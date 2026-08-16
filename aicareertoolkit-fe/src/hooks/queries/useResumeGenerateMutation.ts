// src/hooks/queries/useResumeGenerateMutation.ts

import { useMutation } from '@tanstack/react-query'
import { generateResume } from '@/api/services/resume.service'
import type { ResumeGenerateRequest } from '@/types/resume.types'

export const useResumeGenerateMutation = () => {
  return useMutation({
    mutationFn: (payload: ResumeGenerateRequest) => generateResume(payload),
  })
}

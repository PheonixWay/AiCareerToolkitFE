// src/hooks/queries/useAtsExtractMutation.ts

import { useMutation } from '@tanstack/react-query'
import { extractAtsResume } from '@/api/services/ats.service'

export const useAtsExtractMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => extractAtsResume(formData),
  })
}

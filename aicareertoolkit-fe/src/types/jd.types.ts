// src/types/jd.types.ts
// Re-exports typed schemas generated from FastAPI OpenAPI specs.
// Run `npm run generate-types` to refresh.

import type { components } from './api.generated'

export type ExperienceInfo = components['schemas']['ExperienceInfo']
export type SkillSet = components['schemas']['SkillSet']
export type EducationInfo = components['schemas']['EducationInfo']
export type JdExtractionResult = components['schemas']['JDExtractionModel']
export type JdExtractRequest = components['schemas']['JobDescriptionRequest']

// Backwards compatibility alias
export type JdExtractResponse = JdExtractionResult


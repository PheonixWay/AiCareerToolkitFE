// src/types/jd.types.ts

export interface JdExtractRequest {
  raw_text: string
}

export interface JdExtractResponse {
  job_title: string
  years_of_experience: string
  must_have_skills: string[]
  good_to_have_skills: string[]
  potential_interview_questions: string[]
}

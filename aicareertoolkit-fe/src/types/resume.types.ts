// src/types/resume.types.ts
// Response shape to be confirmed once backend Resume Generator module is ready

export interface ResumeGenerateRequest {
  job_context: string
  template_id?: string
}

export interface ResumeGenerateResponse {
  // TBD — will be updated when backend is implemented
  [key: string]: unknown
}

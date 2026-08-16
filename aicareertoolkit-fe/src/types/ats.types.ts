// src/types/ats.types.ts
// Response shape to be confirmed once backend ATS module is ready

export interface AtsExtractRequest {
  // FormData with file upload — handled via multipart/form-data
  file: File
}

export interface AtsExtractResponse {
  // TBD — will be updated when backend is implemented
  [key: string]: unknown
}

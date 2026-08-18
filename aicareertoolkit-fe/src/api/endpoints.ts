// src/api/endpoints.ts
// Single source of truth for ALL API endpoint URL strings.
// Never hardcode endpoint paths anywhere else — always import from here.

export const API_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
  },
  jd: {
    extract: '/api/v1/jd/extract',
  },
  ats: {
    extract: '/api/v1/ats/extract',
  },
  resume: {
    generate: '/api/v1/resume/generate',
  },
  memory: {
    ingestPdf: '/api/v1/memory/ingest-pdf',
    add: '/api/v1/memory/add',
    getAll: '/api/v1/memory/',
    update: (id: number) => `/api/v1/memory/${id}`,
    delete: (id: number) => `/api/v1/memory/${id}`,
    // legacy
    ingest: '/api/v1/memory/ingest',
    query: '/api/v1/memory/query',
  },
} as const

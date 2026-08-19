// src/routes/paths.ts
// Single source of truth for all route path strings.
// Always use PATHS.* — never hardcode route strings anywhere else.

export const PATHS = {
  login:           '/login',
  dashboard:       '/dashboard',
  jdExtractor:     '/tools/jd-extractor',
  atsResume:       '/tools/ats-resume',
  resumeGenerator: '/tools/resume-generator',
  memoryBank:      '/tools/memory-bank',
  retrievalTest:   '/tools/retrieval-test',
} as const

// src/routes/AppRouter.tsx
// Root router — defines all public and private routes.
// Private routes are wrapped with the authenticated layout (Sidebar + Navbar).

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { PATHS } from '@/routes/paths'

// Pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { JdExtractorPage } from '@/pages/jd-extractor/JdExtractorPage'
import { AtsResumePage } from '@/pages/ats-resume/AtsResumePage'
import { ResumeGeneratorPage } from '@/pages/resume-generator/ResumeGeneratorPage'
import { MemoryBankPage } from '@/pages/memory-bank/MemoryBankPage'

// Layout
import { AppLayout } from '@/components/shared/AppLayout'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={PATHS.login} element={<LoginPage />} />

        {/* Private routes — wrapped in AppLayout (Sidebar + Navbar) */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path={PATHS.dashboard} element={<DashboardPage />} />
          <Route path={PATHS.jdExtractor} element={<JdExtractorPage />} />
          <Route path={PATHS.atsResume} element={<AtsResumePage />} />
          <Route path={PATHS.resumeGenerator} element={<ResumeGeneratorPage />} />
          <Route path={PATHS.memoryBank} element={<MemoryBankPage />} />
        </Route>

        {/* Fallback — redirect root to dashboard */}
        <Route path="/" element={<Navigate to={PATHS.dashboard} replace />} />
        <Route path="*" element={<Navigate to={PATHS.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

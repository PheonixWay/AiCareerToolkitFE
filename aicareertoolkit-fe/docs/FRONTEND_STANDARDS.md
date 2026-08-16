# AI Career Toolkit — Frontend Standards & Source of Truth

> **Version**: 1.0.0
> **Last Updated**: 2026-08-16
> **Maintainer**: Danish Ansari
> **Status**: 🟡 Awaiting Approval

This document is the **single source of truth** for all frontend engineering decisions, conventions, and standards for the AI Career Toolkit project. Every architectural choice, naming rule, and tooling decision lives here. When in doubt — refer to this document first.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Setup](#3-environment-setup)
4. [Folder Structure](#4-folder-structure)
5. [Naming Conventions](#5-naming-conventions)
6. [TypeScript Standards](#6-typescript-standards)
7. [State Management](#7-state-management)
8. [API Layer](#8-api-layer)
9. [Routing](#9-routing)
10. [Component Standards](#10-component-standards)
11. [Styling — Tailwind CSS & Shadcn UI](#11-styling--tailwind-css--shadcn-ui)
12. [Theme — Dark / Light Mode](#12-theme--dark--light-mode)
13. [Authentication](#13-authentication)
14. [Modules Reference](#14-modules-reference)
15. [Git & Branching](#15-git--branching)
16. [Do's and Don'ts](#16-dos-and-donts)

---

## 1. Project Overview

**AI Career Toolkit** is a web application that helps users leverage AI for career development. It provides four core tools powered by a FastAPI backend.

| # | Module | Short Description |
|---|--------|-------------------|
| 1 | **JD Extractor** | Extract structured data (title, skills, experience, interview Qs) from raw job descriptions |
| 2 | **ATS Resume Extractor** | Parse and analyze resumes for ATS compatibility |
| 3 | **Resume Generator** | Context-aware resume generation using RAG |
| 4 | **Career Memory Bank** | Personal career knowledge base (RAG ingestion + retrieval) |

- **Backend**: FastAPI + Python (separate repo)
- **Frontend**: React + TypeScript (this repo)
- **Communication**: REST API over HTTP via Axios

---

## 2. Tech Stack

### Core

| Tool | Version | Purpose |
|------|---------|---------|
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety across the entire frontend |
| **Vite** | 8.x | Build tool + dev server |

### Styling & UI

| Tool | Version | Purpose |
|------|---------|---------|
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **Shadcn UI** | Latest | Pre-built, accessible, unstyled component library |
| **Radix UI** | Latest | Headless primitives used internally by Shadcn |
| **lucide-react** | Latest | Icon library |
| **class-variance-authority (CVA)** | Latest | Component variant management |
| **clsx + tailwind-merge** | Latest | Safe conditional class merging |

### State Management

| Tool | Version | Purpose |
|------|---------|---------|
| **Zustand** | 4.x | Global **client** state (auth, UI flags, sidebar) |
| **TanStack Query (React Query)** | 5.x | **Server** state (API calls, caching, loading/error) |

### Networking

| Tool | Version | Purpose |
|------|---------|---------|
| **Axios** | 1.x | HTTP client with interceptors |
| **@tanstack/react-query-devtools** | 5.x | Dev-only query inspector |

### Routing

| Tool | Version | Purpose |
|------|---------|---------|
| **React Router DOM** | 6.x | Client-side routing |

---

## 3. Environment Setup

### `.env` file (project root)

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Rules

- All env variables **must** be prefixed with `VITE_` to be accessible in the browser.
- Never commit secrets or `.env.local` files (they are git-ignored).
- Access variables exclusively via `src/config/env.ts` — never call `import.meta.env` directly in components.

```ts
// src/config/env.ts
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000',
} as const
```

---

## 4. Folder Structure

```
src/
├── api/
│   ├── client.ts                  # Axios instance + request/response interceptors
│   ├── endpoints.ts               # All API endpoint URL constants (SINGLE SOURCE)
│   ├── index.ts                   # Re-exports
│   └── services/                  # Pure async functions — one file per module
│       ├── auth.service.ts
│       ├── jd.service.ts
│       ├── ats.service.ts
│       ├── resume.service.ts
│       └── memory.service.ts
│
├── components/
│   ├── ui/                        # Shadcn UI generated files — DO NOT MANUALLY EDIT
│   └── shared/                    # Custom reusable components
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       ├── ThemeToggle.tsx
│       ├── PageHeader.tsx
│       ├── ErrorAlert.tsx
│       └── LoadingSpinner.tsx
│
├── config/
│   └── env.ts                     # Typed env variable access
│
├── context/
│   └── ThemeContext.tsx           # Dark/light mode state + toggle logic
│
├── hooks/
│   ├── useAuth.ts                 # Reads from Zustand auth.store
│   ├── useTheme.ts                # Reads from ThemeContext
│   └── queries/                   # TanStack Query hooks — one file per module
│       ├── useLoginMutation.ts
│       ├── useJdExtractMutation.ts
│       ├── useAtsExtractMutation.ts
│       ├── useResumeGenerateMutation.ts
│       └── useMemoryMutations.ts
│
├── lib/
│   └── utils.ts                   # cn() helper (auto-created by Shadcn init)
│
├── pages/
│   ├── auth/
│   │   └── LoginPage.tsx
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── jd-extractor/
│   │   └── JdExtractorPage.tsx
│   ├── ats-resume/
│   │   └── AtsResumePage.tsx
│   ├── resume-generator/
│   │   └── ResumeGeneratorPage.tsx
│   └── memory-bank/
│       └── MemoryBankPage.tsx
│
├── routes/
│   ├── AppRouter.tsx              # Root router — defines all routes
│   ├── PrivateRoute.tsx           # Auth guard — redirects to /login if not authenticated
│   └── paths.ts                   # Route path string constants
│
├── stores/                        # Zustand global client state
│   ├── auth.store.ts              # { user, token, isLoggedIn, setAuth, clearAuth }
│   └── ui.store.ts                # { sidebarCollapsed, toggleSidebar }
│
├── types/                         # Shared TypeScript interfaces / types
│   ├── auth.types.ts
│   ├── jd.types.ts
│   ├── ats.types.ts
│   ├── resume.types.ts
│   └── memory.types.ts
│
├── utils/
│   └── storage.ts                 # Typed localStorage helpers
│
├── App.tsx                        # Root component — providers only
├── main.tsx                       # App entry point
└── index.css                      # Global styles + Tailwind directives + CSS variables
```

### Folder Rules

- **No** business logic in `pages/` — pages only compose components and call hooks.
- **No** direct Axios calls in components — all calls go through `services/` → `hooks/queries/`.
- `components/ui/` is **read-only** — it is Shadcn generated code.
- Each page gets its own folder so page-specific sub-components can be co-located later.

---

## 5. Naming Conventions

### Files & Folders

| Item | Convention | Example |
|------|-----------|---------|
| React components | `PascalCase.tsx` | `Sidebar.tsx`, `LoginPage.tsx` |
| Hooks | `camelCase.ts` with `use` prefix | `useAuth.ts`, `useJdExtractMutation.ts` |
| Zustand stores | `camelCase.store.ts` | `auth.store.ts`, `ui.store.ts` |
| Service files | `camelCase.service.ts` | `jd.service.ts` |
| Type files | `camelCase.types.ts` | `auth.types.ts` |
| Utility files | `camelCase.ts` | `storage.ts`, `utils.ts` |
| Page folders | `kebab-case` | `jd-extractor/`, `memory-bank/` |
| Other folders | `camelCase` | `hooks/`, `stores/`, `queries/` |

### Variables & Symbols

| Item | Convention | Example |
|------|-----------|---------|
| Variables | `camelCase` | `isLoggedIn`, `jdText` |
| Functions | `camelCase` | `handleLogin()`, `extractJd()` |
| Constants | `UPPER_SNAKE_CASE` | `API_ENDPOINTS`, `STORAGE_KEY` |
| Types & Interfaces | `PascalCase` | `AuthUser`, `JdExtractResponse` |
| React components | `PascalCase` | `<Sidebar />`, `<LoginPage />` |

### Interfaces vs Types

- Use **`interface`** for object shapes (API responses, component props) — they are extendable.
- Use **`type`** for unions, intersections, primitives.

```ts
// ✅ Correct
interface LoginCredentials { username: string; password: string }
type Theme = 'light' | 'dark'
```

---

## 6. TypeScript Standards

### Compiler Settings

`tsconfig.json` uses `"strict": true`. This enforces:
- `noImplicitAny` — all variables must be typed
- `strictNullChecks` — no unchecked null/undefined access
- `noUnusedLocals` — dead variables are a compile error

### Path Aliases

Use `@/` as the alias for the `src/` directory.

```ts
// ✅ Good
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/routes/paths'

// ❌ Bad
import { useAuth } from '../../hooks/useAuth'
```

### Component Props Pattern

Always define an explicit `interface` for component props, suffixed with `Props`:

```ts
interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => { ... }
```

### Error Handling — No `any`

Never use `any`. Use `unknown` for caught errors, then narrow with type guards.

```ts
// ✅ Good
} catch (err: unknown) {
  if (err instanceof AxiosError) {
    console.error(err.response?.data)
  }
}

// ❌ Bad
} catch (err: any) { ... }
```

---

## 7. State Management

### The Golden Rule

> **TanStack Query** = server state (API responses, loading, errors, caching)
> **Zustand** = global client state (auth session, sidebar, UI flags)
> **`useState`** = local component-only state (form fields, modal toggles)

### Decision Table

| What state? | Where it lives |
|------------|---------------|
| API response data, loading flag, error | TanStack Query (`useMutation` / `useQuery`) |
| Auth token + logged-in user | Zustand — `auth.store.ts` |
| Sidebar collapsed state | Zustand — `ui.store.ts` |
| Form field values | `useState` (local) |
| Modal open/close (local to one component) | `useState` (local) |
| Dark / light theme preference | `ThemeContext` + `localStorage` |

### Zustand Store Pattern

```ts
// src/stores/auth.store.ts
import { create } from 'zustand'
import { getAuth, setAuthStorage, clearAuthStorage } from '@/utils/storage'
import type { AuthUser, AuthStore } from '@/types/auth.types'

export const useAuthStore = create<AuthStore>((set) => ({
  user: getAuth(),
  isLoggedIn: Boolean(getAuth()?.token),

  setAuth: (user: AuthUser) => {
    setAuthStorage(user)                    // persist to localStorage
    set({ user, isLoggedIn: true })
  },

  clearAuth: () => {
    clearAuthStorage()                      // remove from localStorage
    set({ user: null, isLoggedIn: false })
  },
}))
```

### TanStack Query Mutation Pattern

```ts
// src/hooks/queries/useJdExtractMutation.ts
import { useMutation } from '@tanstack/react-query'
import { extractJd } from '@/api/services/jd.service'
import type { JdExtractRequest } from '@/types/jd.types'

export const useJdExtractMutation = () => {
  return useMutation({
    mutationFn: (payload: JdExtractRequest) => extractJd(payload),
  })
}

// Usage inside a component:
const { mutate, isPending, isError, data, error } = useJdExtractMutation()
```

> **Why `useMutation` for all 4 modules?** Every module action is user-triggered (not auto-fetched), so `useMutation` is correct. `useQuery` will be introduced later for read-only history/list endpoints.

### QueryClient Default Config

```ts
// App.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries:   { retry: 1, staleTime: 5 * 60 * 1000 },  // 5 min cache
    mutations: { retry: 0 },
  },
})
```

---

## 8. API Layer

### Call Chain

```
Page / Component
      ↓  calls
TanStack Query hook   (src/hooks/queries/)
      ↓  calls
Service function      (src/api/services/)
      ↓  calls
Axios client          (src/api/client.ts)
      ↓  HTTP
FastAPI Backend
```

### Axios Client (`src/api/client.ts`)

- Single Axios instance; `baseURL` from `ENV.API_BASE_URL`.
- **Request interceptor**: Reads JWT via `storage.ts` and injects `Authorization: Bearer <token>` on every request automatically.
- **Response interceptor**: On `401 Unauthorized`, calls `clearAuth()` from Zustand store and redirects to `/login`.

### Endpoints (`src/api/endpoints.ts`) — Single Source of Truth

All endpoint URL strings must be declared here. **Never** hardcode paths in service files or components.

```ts
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
    ingest: '/api/v1/memory/ingest',
    query:  '/api/v1/memory/query',
  },
} as const
```

### Service Function Pattern

```ts
// src/api/services/jd.service.ts
import { api } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import type { JdExtractRequest, JdExtractResponse } from '@/types/jd.types'

export const extractJd = async (payload: JdExtractRequest): Promise<JdExtractResponse> => {
  const { data } = await api.post<JdExtractResponse>(API_ENDPOINTS.jd.extract, payload)
  return data
}
```

---

## 9. Routing

### Route Constants (`src/routes/paths.ts`)

```ts
export const PATHS = {
  login:           '/login',
  dashboard:       '/dashboard',
  jdExtractor:     '/tools/jd-extractor',
  atsResume:       '/tools/ats-resume',
  resumeGenerator: '/tools/resume-generator',
  memoryBank:      '/tools/memory-bank',
} as const
```

**Always use `PATHS.*` — never hardcode route strings.**

### Route Map

| Path | Page Component | Auth Required |
|------|---------------|:---:|
| `/` | Redirect → `/dashboard` | — |
| `/login` | `LoginPage` | ❌ Public |
| `/dashboard` | `DashboardPage` | ✅ Private |
| `/tools/jd-extractor` | `JdExtractorPage` | ✅ Private |
| `/tools/ats-resume` | `AtsResumePage` | ✅ Private |
| `/tools/resume-generator` | `ResumeGeneratorPage` | ✅ Private |
| `/tools/memory-bank` | `MemoryBankPage` | ✅ Private |

### `PrivateRoute` Pattern

```tsx
// src/routes/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/routes/paths'

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to={PATHS.login} replace />
}
```

---

## 10. Component Standards

### Component File Template

```tsx
import type { FC } from 'react'
import { cn } from '@/lib/utils'

interface ExampleProps {
  title: string
  className?: string
}

export const Example: FC<ExampleProps> = ({ title, className }) => {
  return (
    <div className={cn('text-slate-900 dark:text-slate-50', className)}>
      {title}
    </div>
  )
}
```

### Rules

| Rule | Detail |
|------|--------|
| **Named exports** | Always export components as named exports. Default exports only for pages (lazy loading). |
| **No inline styles** | Use Tailwind classes only — no `style={{}}` attributes. |
| **`cn()` for class merging** | Always use `cn()` from `@/lib/utils` for conditional/merged classes. |
| **`className` prop** | Every reusable component accepts an optional `className` for external overrides. |
| **Max file size** | Keep components under ~150 lines. Extract sub-components into same folder if needed. |
| **No API calls in components** | Components call hooks only — hooks call services — services call Axios. |

### Shared Components Overview

| Component | Purpose |
|-----------|---------|
| `<Navbar />` | Top bar: current page title, theme toggle, signed-in user |
| `<Sidebar />` | Left nav: module links, logo, user info, logout |
| `<ThemeToggle />` | Sun / Moon icon button that calls `toggleTheme()` |
| `<PageHeader />` | Reusable section header: title + optional subtitle |
| `<ErrorAlert />` | Standardized error message block |
| `<LoadingSpinner />` | Centered loading indicator |

---

## 11. Styling — Tailwind CSS & Shadcn UI

### Tailwind Version: **v3**

`tailwind.config.js` key settings:

```js
export default {
  darkMode: 'class',                              // .dark class on <html> element
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

### Shadcn UI

- **Init**: `npx shadcn-ui@latest init`
- **Add components**: `npx shadcn-ui@latest add <component>`
- **Generated path**: `src/components/ui/` — **do not manually edit these files**
- Shadcn components use CSS custom properties defined in `index.css` for theming.

### Components to Install (Phase 1)

```bash
npx shadcn-ui@latest add button input label card badge avatar tooltip separator dropdown-menu sheet skeleton
```

### `cn()` Utility

Provided by Shadcn init at `src/lib/utils.ts`. Use it everywhere for class merging:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

---

## 12. Theme — Dark / Light Mode

### Strategy

| Aspect | Decision |
|--------|---------|
| **Method** | Class-based: `.dark` toggled on `<html>` element |
| **Persistence** | `localStorage` key: `aict_theme` |
| **Default** | System preference (`prefers-color-scheme`) on first visit |
| **Provider** | `ThemeContext` wraps the full app in `App.tsx` |

### `ThemeContext` Contract

```ts
interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

### Usage in Components

```tsx
const { theme, toggleTheme } = useTheme()
```

### Tailwind Dark Mode Classes Pattern

```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  content
</div>
```

---

## 13. Authentication

### Flow

```
LoginPage form submit
  → useLoginMutation (TanStack Query)
    → loginUser() in auth.service.ts
      → POST /api/v1/auth/login
        ← { access_token }
  → on success: useAuthStore.setAuth({ token, username })
    → persisted to localStorage (key: aict_auth)
    → React Router navigates to /dashboard

Logout click
  → useAuthStore.clearAuth()
    → localStorage cleared
    → React Router navigates to /login
```

### Storage

- **Key**: `aict_auth`
- **Value**: `JSON.stringify({ token: string, username: string })`
- Managed **only** through `src/utils/storage.ts`. No direct `localStorage` calls outside this file.

```ts
// src/utils/storage.ts
const STORAGE_KEY = 'aict_auth'

export const getAuth = (): AuthUser | null => { ... }
export const setAuthStorage = (user: AuthUser): void => { ... }
export const clearAuthStorage = (): void => { ... }
```

### Token Injection

The Axios request interceptor in `client.ts` automatically reads the token via `getAuth()` and sets:

```
Authorization: Bearer <token>
```

**Never** pass the token manually from any component.

### Session Expiry Handling

When backend returns `401`, the Axios **response interceptor** automatically:
1. Calls `useAuthStore.getState().clearAuth()`
2. Navigates to `/login` via `window.location` (outside React tree)

---

## 14. Modules Reference

### Module 1 — JD Extractor

| Item | Value |
|------|-------|
| **Route** | `/tools/jd-extractor` |
| **Page** | `src/pages/jd-extractor/JdExtractorPage.tsx` |
| **Service fn** | `extractJd()` in `jd.service.ts` |
| **Query hook** | `useJdExtractMutation` |
| **Endpoint** | `POST /api/v1/jd/extract` |
| **Request body** | `{ raw_text: string }` |
| **Response shape** | `{ job_title, years_of_experience, must_have_skills[], good_to_have_skills[], potential_interview_questions[] }` |

### Module 2 — ATS Resume Extractor

| Item | Value |
|------|-------|
| **Route** | `/tools/ats-resume` |
| **Page** | `src/pages/ats-resume/AtsResumePage.tsx` |
| **Service fn** | `extractAtsResume()` in `ats.service.ts` |
| **Query hook** | `useAtsExtractMutation` |
| **Endpoint** | `POST /api/v1/ats/extract` |
| **Request body** | `FormData` with resume file (PDF / DOCX) |
| **Response shape** | TBD by backend |

### Module 3 — Resume Generator (RAG)

| Item | Value |
|------|-------|
| **Route** | `/tools/resume-generator` |
| **Page** | `src/pages/resume-generator/ResumeGeneratorPage.tsx` |
| **Service fn** | `generateResume()` in `resume.service.ts` |
| **Query hook** | `useResumeGenerateMutation` |
| **Endpoint** | `POST /api/v1/resume/generate` |
| **Request body** | `{ job_context: string, template_id?: string }` |
| **Response shape** | TBD by backend |

### Module 4 — Career Memory Bank (RAG)

| Item | Value |
|------|-------|
| **Route** | `/tools/memory-bank` |
| **Page** | `src/pages/memory-bank/MemoryBankPage.tsx` |
| **Service fns** | `ingestMemory()`, `queryMemory()` in `memory.service.ts` |
| **Query hooks** | `useMemoryIngestMutation`, `useMemoryQueryMutation` |
| **Endpoints** | `POST /api/v1/memory/ingest`, `POST /api/v1/memory/query` |
| **Ingest body** | `{ content: string }` or file upload |
| **Query body** | `{ query: string }` |
| **Response shape** | TBD by backend |

---

## 15. Git & Branching

### Branch Strategy

```
main          →  Production-ready code only
dev           →  Integration branch; all PRs merge here first
```

### Branch Naming

```
feature/<scope>-<short-desc>     # new features
fix/<short-desc>                 # bug fixes
chore/<short-desc>               # tooling, deps, config, cleanup
docs/<short-desc>                # documentation only
refactor/<short-desc>            # code restructuring, no new features
```

**Examples:**
```
feature/auth-zustand-store
feature/jd-extractor-page
feature/sidebar-navigation
fix/sidebar-collapse-mobile
chore/install-tanstack-query
docs/update-frontend-standards
```

### Commit Messages — Conventional Commits

```
<type>(<scope>): <short description in present tense>
```

| Type | When to use |
|------|------------|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `chore` | Dependency install, config, tooling |
| `refactor` | Code restructure without behavior change |
| `style` | Formatting, class name changes (no logic) |
| `docs` | Documentation only |
| `test` | Adding / updating tests |

**Examples:**
```
feat(auth): add zustand auth store with localStorage hydration
feat(jd-extractor): add dummy page with placeholder UI
feat(routing): add private route guard and app router
fix(sidebar): fix active link highlight on route change
chore(deps): install tanstack query and zustand
docs: add FRONTEND_STANDARDS.md as project source of truth
```

---

## 16. Do's and Don'ts

### ✅ Always Do

- Use `PATHS.*` constants for all navigation — never hardcode route strings
- Use `API_ENDPOINTS.*` for all endpoint URLs — never hardcode in service files
- Use `@/` path alias for all cross-folder imports
- Use `cn()` for all conditional or merged Tailwind class strings
- Use `useAuth()` hook to read auth state — never access `localStorage` directly in components
- Define explicit TypeScript types for all function parameters and return values
- Keep pages thin — delegate logic to hooks, delegate HTTP to services

### ❌ Never Do

- Edit files inside `src/components/ui/` (Shadcn managed — re-run CLI to update)
- Call Axios directly from a component or page file
- Store server-response data in Zustand (that's TanStack Query's job)
- Use the `any` TypeScript type — use `unknown` + type guards instead
- Use relative `../../` style imports — always use `@/` alias
- Commit `.env.local` or any file with secrets or tokens
- Write business logic in `App.tsx` — it is providers only

---

*This document must be updated whenever a new architectural decision is made or a standard changes. Treat it as a living document — never let it go stale.*

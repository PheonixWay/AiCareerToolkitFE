// src/App.tsx
// Root component — providers only. No business logic here.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/context/ThemeContext'
import { AppRouter } from '@/routes/AppRouter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:   { retry: 1, staleTime: 5 * 60 * 1000 }, // 5 min cache
    mutations: { retry: 0 },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

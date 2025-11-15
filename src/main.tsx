import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'modern-normalize/modern-normalize.css'
import './index.css'
import App from './components/App/App'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      <App />
    </QueryClientProvider>
  </StrictMode>
)

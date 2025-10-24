// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/components/Providers/AuthProvider'
import { useState } from 'react'
import { ThemeProvider } from 'flowbite-react'
import { basicTheme } from '@/lib/flowbite/themes/basicTheme'
import {
  ModalProvider,
  ModalRegistry,
} from '@/components/Providers/ModalProvider'
import ReviewEditModal from '@/app/(main)/bar-search/[barId]/_components/Footer/Review/Modal/ReviewEditModal'
import ReviewCreateModal from '@/app/(main)/bar-search/[barId]/_components/Footer/Review/Modal/ReviewCreateModal'
import ConfirmModal from '@/components/Modals/ConfirmModal'
import { SnackBarProvider } from '@/components/Providers/SnackBarProvider'

const modalRegistry: ModalRegistry = {
  ReviewCreateModal: ReviewCreateModal,
  ReviewEditModal: ReviewEditModal,
  ConfirmModal: ConfirmModal,
}

export function Providers({ children }: { children: React.ReactNode }) {
  // useState로 감싸야 Client HMR 시 QueryClient가 재생성되지 않음
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  )

  if (typeof window !== 'undefined') {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={basicTheme}>
          <ModalProvider registry={modalRegistry}>
            <SnackBarProvider>
              {children}
              <div id="modal-root" />
              <div id="snackbar-root" />
            </SnackBarProvider>
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient
  }
}

// This code is for all users

// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/app/_providers/AuthProvider'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'flowbite-react'
import { basicTheme } from '@/lib/flowbite/basicTheme'
import { ModalProvider, ModalRegistry } from '@/app/_providers/ModalProvider'
import ReviewEditModal from '@/app/(main)/bar-search/[barId]/_components/Footer/Review/Modal/ReviewEditModal'
import ReviewCreateModal from '@/app/(main)/bar-search/[barId]/_components/Footer/Review/Modal/ReviewCreateModal'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { SnackBarProvider } from '@/app/_providers/SnackBarProvider'
import { queryClientOptions } from '@/lib/tanstack-query/tanstack-query'
import { getAllTags } from '@/api/tag/getAllTags'
import { useTagStore } from '@/stores/tag.store'

const modalRegistry: ModalRegistry = {
  ReviewCreateModal: ReviewCreateModal,
  ReviewEditModal: ReviewEditModal,
  ConfirmModal: ConfirmModal,
}

export function Providers({ children }: { children: React.ReactNode }) {
  // useState로 감싸야 Client HMR 시 QueryClient가 재생성되지 않음
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))
  const setAllTags = useTagStore((state) => state.setAllTags)
  const setAtmosphereTags = useTagStore((state) => state.setAtmosphereTags)
  const setReviewTags = useTagStore((state) => state.setReviewTags)
  const setPostTags = useTagStore((state) => state.setPostTags)

  if (typeof window !== 'undefined') {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await getAllTags()
        setAllTags(data)
        setAtmosphereTags(data.filter((tag) => tag.category === 'atmosphere'))
        setReviewTags(data.filter((tag) => tag.category === 'review'))
        setPostTags(data.filter((tag) => tag.category === 'post'))
      } catch (error) {
        console.error('태그 로드 실패:', error)
      }
    }
    fetchTags()
  }, [])

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

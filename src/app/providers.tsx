// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/app/_providers/AuthProvider'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'flowbite-react'
import { basicTheme } from '@/lib/flowbite/basicTheme'
import { ModalProvider, ModalRegistry } from '@/app/_providers/ModalProvider'
import ReviewEditModal from '@/app/(main)/bars/[barId]/_components/Footer/Review/Modal/ReviewEditModal'
import ReviewCreateModal from '@/app/(main)/bars/[barId]/_components/Footer/Review/Modal/ReviewCreateModal'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { SnackBarProvider } from '@/app/_providers/SnackBarProvider'
import { queryClientOptions } from '@/lib/tanstack-query/tanstack-query'
import { getAllTags } from '@/api/tag/getAllTags'
import { useTagStore } from '@/stores/tag.store'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'

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
        const tagsData = await queryClient.fetchQuery({
          ...queries.tag.all,
          staleTime: Infinity, // 태그는 거의 변하지 않으므로 무한 캐시
        })

        if (tagsData?.data) {
          setAllTags(tagsData.data)
          setAtmosphereTags(
            tagsData.data.filter((tag) => tag.category === 'atmosphere'),
          )
          setReviewTags(
            tagsData.data.filter((tag) => tag.category === 'review'),
          )
          setPostTags(tagsData.data.filter((tag) => tag.category === 'post'))
        }
      } catch (error) {
        console.error('태그 로드 실패:', error)
      }
    }
    fetchTags()
  }, [queryClient, setAllTags, setAtmosphereTags, setReviewTags, setPostTags])

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

// ReviewCreateModal.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewForm, ReviewFormSchema } from './ReviewFormModal.schemes'
import ReviewFormModal from './ReviewFormModal'
import { useAuthStore } from '@/stores/auth.store'
import { useBarDetailStore } from '../../../_stores/bar-detail.store'
import {
  postBarReview,
  PostBarReviewBody,
} from '@/lib/supabase/api/review/postBarReview'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { uploadFiles } from '@/lib/supabase/api/storage'
import z from 'zod'

export type ReviewCreateModalProps = {
  barId: number
  onClose: () => void
}

export default function ReviewCreateModal({
  barId,
  onClose,
}: ReviewCreateModalProps) {
  const { userData } = useAuthStore()
  const barDetail = useBarDetailStore((state) => state.barDetail)
  const { invalidateQueries } = useInvalidateQueries()

  const form = useForm<ReviewForm>({
    mode: 'onSubmit',
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 0,
      visitDate: new Date(),
      body: '',
      images: null,
      tagIds: [],
    },
  })

  const { mutate: createReviewMutation } = useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string
      body: PostBarReviewBody
    }) => postBarReview({ barId: barId, userId, body }),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', barId]])
      onClose()
    },
    onError: (error) => {
      console.error('리뷰 등록 실패', error)
    },
  })

  const createReview = async (data: ReviewForm) => {
    try {
      const imageUrls: string[] = []
      if (!userData) {
        throw new Error('로그인 후 리뷰를 작성할 수 있습니다.')
      }
      if (!barId) {
        throw new Error('바 정보가 없습니다.')
      }
      if (data.images) {
        const results = await uploadFiles(
          data.images,
          `bars/${barId}/review-images/${userData.id}`,
        )
        results.forEach((result) => {
          imageUrls.push(result.data?.path || '')
          if (result.error) {
            throw new Error(`이미지 업로드 실패: ${result.error.message}`)
          }
        })
      }

      const body = {
        rating: data.rating,
        body: data.body,
        images: imageUrls,
        tagIds: data.tagIds,
        visitDate: data.visitDate.toISOString(),
      }

      createReviewMutation({ userId: userData.id, body })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ReviewFormModal
      title="리뷰 작성"
      description={`${barDetail?.name || '이름 없음'}에 대한 리뷰를 작성해주세요`}
      form={form}
      onSubmit={() => createReview(form.getValues())}
      onClose={onClose}
      submitButtonText="리뷰 등록"
    />
  )
}

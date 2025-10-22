// ReviewEditModal.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewForm, ReviewFormSchema } from './ReviewFormModal.schemes'
import ReviewFormModal from './ReviewFormModal'
import { useAuthStore } from '@/stores/auth.store'
import { useBarDetailStore } from '@bar-detail/_stores/bar-detail.store'
import { patchBarReview } from '@/lib/supabase/api/review/patchBarReview'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'
import { uploadFiles } from '@/lib/supabase/api/storage'

export type ReviewEditModalProps = {
  barId: number
  review: BarReview
  onClose: () => void
}

export default function ReviewEditModal({
  barId,
  review,
  onClose,
}: ReviewEditModalProps) {
  const { userData } = useAuthStore()
  const barDetail = useBarDetailStore((state) => state.barDetail)
  const { invalidateQueries } = useInvalidateQueries()

  const form = useForm<ReviewForm>({
    mode: 'onSubmit',
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: review.rating,
      body: review.body || '',
      images: null,
      existingImages: review.images || [],
      tagIds: review.review_tags.map((tag) => tag.tags?.id),
      visitDate: new Date(review.visit_date),
    },
  })

  const { mutate: updateReviewMutation } = useMutation({
    mutationFn: ({ userId, body }: { userId: string; body: any }) =>
      patchBarReview({ reviewId: review.id, userId, body }),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', barId]])
      onClose()
    },
    onError: (error) => {
      console.error('리뷰 수정 실패', error)
    },
  })

  const updateReview = form.handleSubmit(async (data) => {
    try {
      const imageUrls: string[] = []
      if (!userData) {
        throw new Error('로그인 후 리뷰를 작성할 수 있습니다.')
      }
      if (!barId) {
        throw new Error('바 정보가 없습니다.')
      }
      if (data.existingImages) {
        imageUrls.push(...data.existingImages)
      }
      if (data.images) {
        const results = await uploadFiles(
          data.images,
          `bars/${barId}/review-images/${userData.id}`,
        )
        results.forEach((result) => {
          if (result.data?.path) {
            imageUrls.push(result.data.path)
          }
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

      updateReviewMutation({ userId: userData.id, body })
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <ReviewFormModal
      title="리뷰 수정"
      description={`${barDetail?.name || '이름 없음'}에 대한 리뷰를 수정해주세요`}
      disableRating={true}
      form={form}
      onSubmit={updateReview}
      onClose={onClose}
      submitButtonText="리뷰 수정"
    />
  )
}

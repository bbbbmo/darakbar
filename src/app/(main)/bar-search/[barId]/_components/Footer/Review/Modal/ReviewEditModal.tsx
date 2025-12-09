// ReviewEditModal.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewForm, ReviewFormSchema } from './ReviewFormModal.schemes'
import ReviewFormModal from './ReviewFormModal'
import { useAuthStore } from '@/stores/auth.store'
import { useBarDetailStore } from '@/app/(main)/bar-search/[barId]/_stores/bar-detail.store'
import { patchBarReview, patchBarReviewBody } from '@/api/review/patchBarReview'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import { BarReview } from '@api/review/getBarReviews'
import { uploadFiles } from '@/api/file/storage'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { barReviewsKeys } from '@/api/queries/reviewKeys'

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
      existingImages: review.image_paths || [],
      tagIds: review.review_tags.map((tag) => tag.tags?.id),
      visitDate: new Date(review.visit_date),
    },
  })

  const { mutate: updateReviewMutation } = useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string
      body: patchBarReviewBody
    }) => patchBarReview({ reviewId: review.id, userId, body }),
    onSuccess: () => {
      console.log('barId', barId)
      invalidateQueries([barReviewsKeys.all(barId).queryKey])
      snackBar.showSuccess(
        '리뷰 수정 성공',
        '리뷰가 성공적으로 수정되었습니다.',
      )
      onClose()
    },
    onError: (error) => {
      snackBar.showError(
        '리뷰 수정 실패',
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
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
        const uploadedImagePaths = await uploadFiles(
          data.images,
          `bars/${barId}/review-images/${userData.id}`,
        )
        uploadedImagePaths.forEach((path) => {
          if (path) {
            imageUrls.push(path)
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
      snackBar.showError(
        '리뷰 수정 실패',
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
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

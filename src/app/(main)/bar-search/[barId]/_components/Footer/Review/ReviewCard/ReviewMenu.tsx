'use client'

import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import { deleteBarReview } from '@api/review/deleteBarReview'
import { useMutation } from '@tanstack/react-query'
import { BarReview } from '@api/review/getBarReviews'
import { useModal } from '@/app/_providers/ModalProvider'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { PostgrestError } from '@supabase/supabase-js'
import { barReviewsKeys } from '@/api/queries/reviewKeys'
import ActionMenu from '@/components/ui/ActionMenu'

export default function ReviewMenu({ review }: { review: BarReview }) {
  const { invalidateQueries } = useInvalidateQueries()
  const { open, close, confirm } = useModal()

  const { mutate: deleteReviewMutation } = useMutation({
    mutationFn: () => deleteBarReview(review.id),
    onSuccess: () => {
      invalidateQueries([barReviewsKeys.all(review.bar_id).queryKey])
      snackBar.showSuccess(
        '리뷰 삭제 성공',
        '리뷰가 성공적으로 삭제되었습니다.',
      )
    },
    onError: (error) => {
      snackBar.showError(
        '리뷰 삭제 실패',
        error instanceof PostgrestError
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
    },
  })

  const openReviewEditModal = () => {
    open('ReviewEditModal', { barId: review.bar_id, review, onClose: close })
  }

  const deleteReview = async () => {
    const isConfirmed = await confirm({
      title: '리뷰 삭제',
      message: '리뷰를 삭제하시겠습니까?',
    })
    if (isConfirmed) {
      deleteReviewMutation()
    }
  }
  return <ActionMenu onEdit={openReviewEditModal} onDelete={deleteReview} />
}

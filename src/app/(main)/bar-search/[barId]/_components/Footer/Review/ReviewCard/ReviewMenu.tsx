'use client'

import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { deleteBarReview } from '@/lib/supabase/api/review/deleteBarReview'
import { useMutation } from '@tanstack/react-query'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { HiDotsHorizontal, HiPencil, HiTrash } from 'react-icons/hi'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'
import { useModal } from '@/components/Providers/ModalProvider'
import { snackBar } from '@/components/Providers/SnackBarProvider'
import { PostgrestError } from '@supabase/supabase-js'

export default function ReviewMenu({ review }: { review: BarReview }) {
  const { invalidateQueries } = useInvalidateQueries()
  const { open, close, confirm } = useModal()

  const { mutate: deleteReviewMutation } = useMutation({
    mutationFn: () => deleteBarReview(review.id),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', String(review.bar_id)]])
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
  return (
    <Dropdown
      arrowIcon={false}
      inline
      placement="bottom"
      label={<HiDotsHorizontal className="cursor-pointer" size={24} />}
    >
      <DropdownItem icon={HiPencil} onClick={openReviewEditModal}>
        수정
      </DropdownItem>
      <DropdownItem icon={HiTrash} onClick={deleteReview}>
        삭제
      </DropdownItem>
    </Dropdown>
  )
}

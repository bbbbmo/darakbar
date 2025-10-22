'use client'

import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { deleteBarReview } from '@/lib/supabase/api/review/deleteBarReview'
import { useMutation } from '@tanstack/react-query'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { HiDotsHorizontal, HiPencil, HiTrash } from 'react-icons/hi'
import { useBar } from '../../../_providers/BarProviders'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'
import { useModal } from '@/components/Providers/ModalProvider'

export default function ReviewMenu({ review }: { review: BarReview }) {
  const { invalidateQueries } = useInvalidateQueries()
  const { barId } = useBar()
  const { open, close, confirm } = useModal()
  const { mutate: deleteReviewMutation } = useMutation({
    mutationFn: () => deleteBarReview(review.id),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', barId]])
    },
  })

  const openReviewEditModal = () => {
    open('ReviewEditModal', { review, onClose: close })
  }

  const deleteReview = async () => {
    await confirm({
      title: '리뷰 삭제',
      message: '리뷰를 삭제하시겠습니까?',
      onConfirm: () => {
        deleteReviewMutation()
      },
      onCancel: () => {
        return
      },
    })
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

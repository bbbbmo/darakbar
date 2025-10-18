'use client'

import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { deleteBarReview } from '@/lib/supabase/api/review/deleteBarReview'
import { useMutation } from '@tanstack/react-query'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { HiDotsHorizontal, HiPencil, HiTrash } from 'react-icons/hi'
import { useBar } from '../../../_providers/BarProviders'

export default function ReviewEditMenu({ reviewId }: { reviewId: number }) {
  const { invalidateQueries } = useInvalidateQueries()
  const { barId } = useBar()
  const { mutate: deleteReviewMutation } = useMutation({
    mutationFn: () => deleteBarReview(reviewId),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', barId]])
    },
  })
  return (
    <Dropdown
      arrowIcon={false}
      inline
      placement="bottom"
      label={<HiDotsHorizontal className="cursor-pointer" size={24} />}
    >
      <DropdownItem icon={HiPencil}>수정</DropdownItem>
      <DropdownItem icon={HiTrash} onClick={() => deleteReviewMutation()}>
        삭제
      </DropdownItem>
    </Dropdown>
  )
}

'use client'

import FormOption from '@/components/Forms/FormOption'
import Stars from '@/components/Stars'
import { Button, Pagination } from 'flowbite-react'
import { useState } from 'react'
import ReviewCard from './ReviewCard/ReviewCard'
import { mockReviews } from '../../../_mocks/reviews.mocks'
import { useQuery } from '@tanstack/react-query'

import { useBar } from '../../../_providers/BarProviders'
import { getBarReviews } from '@/lib/supabase/api/review/getBarReviews'
import UploadCard from '@components/Cards/UploadCard'
import { HiOutlineChat, HiPencil } from 'react-icons/hi'
import { useModal } from '@/components/Providers/ModalProvider'

export default function ReviewTab() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages = Math.ceil(mockReviews.length / 5)

  const { barId } = useBar()
  const { open, close } = useModal()

  const { data: reviews } = useQuery({
    queryKey: ['bar-reviews', barId],
    queryFn: () => getBarReviews(barId),
    enabled: !!barId,
  })

  const onPageChange = (page: number) => setCurrentPage(page)

  const openReviewCreateModal = () => {
    console.log('모달 열기 시작')
    if (!barId) {
      console.error('barId가 없습니다')
      return
    }
    open('ReviewCreateModal', { barId, onClose: close })
  }
  return (
    <div className="px-4">
      <section className="mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">{0.0}</span>
          <Stars rating={0.0} size={24} />
        </div>
        <div className="flex items-center justify-between">
          <span>리뷰 {reviews?.data?.length || 0}개</span>
          <FormOption
            className="min-w-28"
            options={['최신순', '평점순', '좋아요순']}
          />
        </div>
      </section>
      <div className="flex flex-col gap-4">
        {reviews?.data &&
          reviews.data.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        <UploadCard
          icon={<HiOutlineChat size={40} className="text-gray-400" />}
          title="이곳을 방문해 보셨나요? "
          description="다른 사용자들에게 도움이 될 수 있도록 리뷰를 남겨주세요"
        >
          <Button
            color="primary"
            className="flex w-40 items-center gap-2"
            onClick={openReviewCreateModal}
          >
            <HiPencil size={20} />
            리뷰 작성하기
          </Button>
        </UploadCard>
      </div>
      <div className="mt-4 flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  )
}

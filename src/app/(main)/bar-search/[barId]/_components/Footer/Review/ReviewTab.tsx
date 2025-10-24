'use client'

import FormOption from '@/components/Forms/FormOption'
import Stars from '@/components/Stars'
import { Button, Pagination } from 'flowbite-react'
import { useEffect, useMemo, useState } from 'react'
import ReviewCard from './ReviewCard/ReviewCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useBar } from '../../../_providers/BarProviders'
import { getBarReviews } from '@/lib/supabase/api/review/getBarReviews'
import UploadCard from '@components/Cards/UploadCard'
import { HiOutlineChat, HiPencil } from 'react-icons/hi'
import { useModal } from '@/components/Providers/ModalProvider'
import { reviewSortOptions } from './review.const'

export default function ReviewTab() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortOption, setSortOption] = useState<string>(reviewSortOptions[0])

  const { barId } = useBar()
  const { open, close } = useModal()

  const { data: reviews } = useSuspenseQuery({
    queryKey: ['bar-reviews', barId],
    queryFn: () => getBarReviews(barId),
  })

  const openReviewCreateModal = () => {
    open('ReviewCreateModal', { barId, onClose: close })
  }

  const onPageChange = (page: number) => setCurrentPage(page)

  const sortedReviews = useMemo(() => {
    if (!reviews?.data) return []

    const sorted = [...reviews.data]

    switch (sortOption) {
      case '최신순':
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
      case '평점순':
        return sorted.sort((a, b) => b.rating - a.rating)
      case '좋아요순':
        return sorted.sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
      default:
        return sorted
    }
  }, [reviews?.data, sortOption])

  const totalRating = useMemo(() => {
    if (!reviews?.data || reviews.data.length === 0) return 0

    return (
      reviews.data.reduce((acc, review) => acc + review.rating, 0) /
      reviews.data.length
    )
  }, [reviews?.data])
  return (
    <div className="px-4">
      <section className="mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">{totalRating}</span>
          <Stars rating={totalRating} size={24} />
        </div>
        <div className="flex items-center justify-between">
          <span>리뷰 {reviews?.data?.length || 0}개</span>
          <FormOption
            className="min-w-28"
            options={reviewSortOptions}
            setOption={setSortOption}
          />
        </div>
      </section>
      <div className="flex flex-col gap-4">
        {reviews?.data &&
          sortedReviews.map((review) => (
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
          totalPages={Math.ceil((reviews?.data?.length || 0) / 5)}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  )
}

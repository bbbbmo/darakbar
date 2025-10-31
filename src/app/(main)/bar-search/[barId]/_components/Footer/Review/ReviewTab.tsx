'use client'

import FormOption from '@/components/Forms/FormOption'
import Stars from '@/components/Stars'
import { Button, Pagination } from 'flowbite-react'
import { useMemo, useState } from 'react'
import ReviewCard from './ReviewCard/ReviewCard'
import UploadCard from '@components/Cards/UploadCard'
import { HiOutlineChat, HiPencil } from 'react-icons/hi'
import { useModal } from '@/components/Providers/ModalProvider'
import { reviewSortOptions } from './review.const'
import { BarReview } from '@/api/review/getBarReviews'

export default function ReviewTab({ reviews }: { reviews: BarReview[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortOption, setSortOption] = useState<string>(reviewSortOptions[0])

  const { open, close } = useModal()

  const openReviewCreateModal = () => {
    open('ReviewCreateModal', { barId: reviews[0].bar_id, onClose: close })
  }

  const onPageChange = (page: number) => setCurrentPage(page)

  const sortedReviews = useMemo(() => {
    if (!reviews) return []

    const sorted = [...reviews]

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
  }, [reviews, sortOption])

  const totalRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0

    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    )
  }, [reviews])
  return (
    <div className="px-4">
      <section className="mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">{totalRating}</span>
          <Stars rating={totalRating} size={24} />
        </div>
        <div className="flex items-center justify-between">
          <span>리뷰 {reviews?.length || 0}개</span>
          <FormOption
            className="min-w-28"
            options={reviewSortOptions}
            setOption={setSortOption}
          />
        </div>
      </section>
      <div className="flex flex-col gap-4">
        {reviews &&
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
      {reviews && reviews.length > 5 && (
        <div className="mt-4 flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((reviews.length || 0) / 5)}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </div>
  )
}

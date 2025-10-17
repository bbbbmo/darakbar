'use client'

import FormOption from '@/components/Forms/FormOption'
import Stars from '@/components/Stars'
import { Button, Pagination } from 'flowbite-react'
import { useState } from 'react'
import ReviewCard from './ReviewCard'
import { mockReviews } from '../../../_mocks/reviews.mocks'
import { useAuthStore } from '@/stores/auth.store'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  postBarReview,
  PostBarReviewBody,
} from '@/lib/supabase/api/review/postBarReview'
import { useBar } from '../../../_providers/BarProviders'
import { getBarReviews } from '@/lib/supabase/api/review/getBarReviews'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import UploadCard from '../../../../../../../components/Cards/UploadCard'
import { HiOutlineChat, HiPencil } from 'react-icons/hi'

export default function ReviewTab() {
  const rating = 4.5
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages = Math.ceil(mockReviews.length / 5)

  const { barId } = useBar()
  const { userData } = useAuthStore()
  const { invalidateQueries } = useInvalidateQueries()

  const { data: reviews } = useQuery({
    queryKey: ['bar-reviews', barId],
    queryFn: () => getBarReviews(barId),
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
    },
  })

  const createReview = () => {
    try {
      if (!userData) {
        throw new Error('로그인 후 리뷰를 작성할 수 있습니다.')
      }
      if (!barId) {
        throw new Error('바 정보가 없습니다.')
      }
      const body = {
        rating: 4,
        body: 'test',
        images: [],
        tagIds: [10, 11, 12],
      }
      createReviewMutation({ userId: userData.id, body })
    } catch (error) {
      console.error(error)
    }
  }

  const onPageChange = (page: number) => setCurrentPage(page)
  return (
    <div className="px-4">
      <section className="mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">{rating}</span>
          <Stars rating={rating} size={24} />
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
          action={
            <Button
              color="primary"
              className="flex w-40 items-center gap-2"
              onClick={createReview}
            >
              <HiPencil size={20} />
              리뷰 작성하기
            </Button>
          }
        />
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

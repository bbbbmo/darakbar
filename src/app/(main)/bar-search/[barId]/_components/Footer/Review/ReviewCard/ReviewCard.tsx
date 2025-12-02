'use client'

import Tags from '@/components/ui/Tags'
import { Avatar, Card } from 'flowbite-react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { BarReview } from '@api/review/getBarReviews'
import Stars from '@/components/ui/Stars'
import ReviewMenu from './ReviewMenu'
import { useAuthStore } from '@/stores/auth.store'
import { useParseFile } from '@/hooks/useParseFile'
import ReviewLike from './ReviewLike'
import ImageSkeleton from '@/components/ui/skeletons/ImageSkeleton'

export default function ReviewCard({ review }: { review: BarReview }) {
  const { userData } = useAuthStore()

  const isOwner = userData?.id === review.userinfo?.id

  const { publicUrls: avatarUrl } = useParseFile(
    review.userinfo?.profile_img_url || '',
  )

  const { publicUrls: reviewImages, isLoading: isReviewImagesLoading } =
    useParseFile(review.images || [])

  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <div className="flex justify-between">
        <Avatar img={typeof avatarUrl === 'string' ? avatarUrl : ''} rounded>
          <div className="font-medium dark:text-white">
            <div className="flex items-center gap-2">
              {review.userinfo?.name}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {dayjs(review.visit_date).format('YYYY.MM.DD')} 방문
              </span>
            </div>
            <Stars rating={review.rating} />
          </div>
        </Avatar>
        {isOwner && <ReviewMenu review={review} />}
      </div>

      <p>{review.body}</p>
      <div className="flex flex-wrap gap-2">
        {reviewImages.length > 0 &&
          reviewImages.map((url, index) =>
            isReviewImagesLoading ? (
              <ImageSkeleton key={index} width={100} height={100} />
            ) : (
              <Image
                key={index}
                className="cursor-pointer rounded-md object-cover transition-all duration-200 ease-in-out hover:scale-103"
                src={url}
                alt={'리뷰 이미지 ' + index + 1}
                width={100}
                height={100}
                style={{ width: 'auto', height: 'auto' }}
              />
            ),
          )}
      </div>
      <Tags
        tags={review.review_tags
          .map((tag) => tag.tags)
          .filter((tag) => tag !== null)}
      />
      <div className="flex justify-between text-zinc-500">
        <ReviewLike review={review} userData={userData} />
        <span>
          {review.updated_at
            ? `${dayjs(review.updated_at).format('YYYY.MM.DD')} 수정됨`
            : `${dayjs(review.created_at).format('YYYY.MM.DD')} 작성`}
        </span>
      </div>
    </Card>
  )
}

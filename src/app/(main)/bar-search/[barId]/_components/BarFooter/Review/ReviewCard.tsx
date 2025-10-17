'use client'

import Tags from '@/components/Tags'
import { Avatar, Card, Dropdown, DropdownItem } from 'flowbite-react'
import Image from 'next/image'
import {
  HiDotsHorizontal,
  HiOutlineChat,
  HiOutlineThumbUp,
  HiPencil,
  HiTrash,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'

export default function ReviewCard({ review }: { review: BarReview }) {
  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <div className="flex justify-between">
        <Avatar img={review.userinfo?.profile_img_url || ''} rounded>
          <div className="font-medium dark:text-white">
            <div className="flex items-center gap-2">
              {review.userinfo?.name}{' '}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {dayjs(review.visit_date).format('YYYY.MM.DD')} 방문
              </span>
            </div>
          </div>
        </Avatar>
        <Dropdown
          arrowIcon={false}
          inline
          placement="bottom"
          label={<HiDotsHorizontal className="cursor-pointer" size={24} />}
        >
          <DropdownItem icon={HiPencil}>수정</DropdownItem>
          <DropdownItem icon={HiTrash}>삭제</DropdownItem>
        </Dropdown>
      </div>

      <p>{review.body}</p>
      {review.images && review.images.length > 0 && (
        <Image
          src={review.images[0]}
          alt={'리뷰 이미지'}
          width={100}
          height={100}
        />
      )}
      <Tags tags={review.review_tags.map((tag) => tag.tags?.name || '')} />
      <div className="flex justify-between text-zinc-500">
        <div className="flex gap-5">
          <div className="flex cursor-pointer items-center gap-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-amber-400 hover:text-neutral-900">
            <HiOutlineThumbUp size={20} />
            {review.like_count || 0}개
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-amber-400 hover:text-neutral-900">
            <HiOutlineChat size={20} />
            {review.comment_count || 0}개
          </div>
        </div>
        <span>{dayjs(review.created_at).format('YYYY.MM.DD')} 작성</span>
      </div>
    </Card>
  )
}

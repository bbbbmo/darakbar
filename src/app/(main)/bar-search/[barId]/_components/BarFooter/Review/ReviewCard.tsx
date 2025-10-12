'use client'

import Stars from '@/components/Stars'
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
import { Review } from '@/lib/supabase/api/review/getReviews'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <div className="flex justify-between">
        <Avatar img={review.profileImageUrl || ''} rounded>
          <div className="font-medium dark:text-white">
            <div className="flex items-center gap-2">
              {review.userName}{' '}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.visitDate} 방문
              </span>
            </div>
            <div>
              <Stars rating={review.rating} />
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

      <p>{review.comment}</p>
      {review.images && (
        <Image
          src={review.images[0]}
          alt={review.user_name}
          width={100}
          height={100}
        />
      )}
      <Tags tags={review.tags} />
      <div className="flex justify-between text-zinc-500">
        <div className="flex gap-8">
          <div className="flex items-center gap-1">
            <HiOutlineThumbUp size={20} className="cursor-pointer" />
            {review.likeCount}개
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineChat size={20} className="cursor-pointer" />
            {review.likeCount}개
          </div>
        </div>
        <span>{dayjs(review.createdAt).format('YYYY.MM.DD')} 작성</span>
      </div>
    </Card>
  )
}

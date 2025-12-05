import Tags from '@/components/ui/Tags'
import { Tag } from '@/types/default.schemes'
import dayjs from 'dayjs'
import { Avatar } from 'flowbite-react'

export type PostHeaderProps = {
  businessUserId: string
  createdAt: string
  postTag: Tag
}

export default function PostHeader({
  businessUserId,
  createdAt,
  postTag,
}: PostHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Avatar img={''} rounded>
          <span className="font-medium dark:text-white">{'가상데이터'}</span>
        </Avatar>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {dayjs(createdAt).format('YYYY.MM.DD')}
        </span>
      </div>
      <Tags tags={[postTag]} />
    </div>
  )
}

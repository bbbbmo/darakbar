import Tags from '@/components/ui/Tags'
import { useParseFile } from '@/hooks/useParseFile'
import { Tag } from '@/types/default.schemes'
import dayjs from 'dayjs'
import { Avatar } from 'flowbite-react'

export type PostHeaderProps = {
  userInfo: {
    id: string
    name: string | null
    profile_image_path: string | null
  }
  createdAt: string
  postTag: Tag
}

export default function PostHeader({
  userInfo,
  createdAt,
  postTag,
}: PostHeaderProps) {
  const { publicUrls } = useParseFile(userInfo.profile_image_path)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {publicUrls && (
          <Avatar img={publicUrls} rounded>
            <span className="font-medium dark:text-white">
              {userInfo.name || '이름 정보 없음'}
            </span>
          </Avatar>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {dayjs(createdAt).format('YYYY.MM.DD')}
        </span>
      </div>
      <Tags tags={[postTag]} />
    </div>
  )
}

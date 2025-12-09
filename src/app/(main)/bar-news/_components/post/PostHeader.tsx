import ActionMenu from '@/components/ui/ActionMenu'
import { useParseFile } from '@/hooks/useParseFile'
import { useAuthStore } from '@/stores/auth.store'
import { Tag } from '@/types/default.schemes'
import dayjs from 'dayjs'
import { Avatar, Badge } from 'flowbite-react'

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
  const { userData: me } = useAuthStore()

  const isOwner = me?.id === userInfo.id

  const getPostTagColor = (postTag: Tag) => {
    switch (postTag.name) {
      case '신메뉴':
        return 'failure'
      case '이벤트':
        return 'indigo'
      case '소식':
        return 'success'
    }
  }

  return (
    <div className="flex items-center justify-between">
      {publicUrls && (
        <Avatar img={publicUrls} rounded>
          <span className="flex flex-row flex-wrap gap-2">
            <Badge color={getPostTagColor(postTag)}>{postTag.name}</Badge>
          </span>
          <p className="mt-2 flex gap-2">
            <span className="font-medium dark:text-white">
              {userInfo.name || '이름 정보 없음'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {dayjs(createdAt).format('YYYY.MM.DD')}
            </span>
          </p>
        </Avatar>
      )}
      {isOwner && <ActionMenu vertical onEdit={() => {}} onDelete={() => {}} />}
    </div>
  )
}

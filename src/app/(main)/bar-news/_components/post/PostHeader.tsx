import { deletePost } from '@/api/post/deletePost'
import { Post } from '@/api/post/getPosts'
import { queries } from '@/api/queries'
import { useModal } from '@/app/_providers/ModalProvider'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import ActionMenu from '@/components/ui/ActionMenu'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import { useParseFile } from '@/hooks/useParseFile'
import { useAuthStore } from '@/stores/auth.store'
import { Tag } from '@/stores/tag.store'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Avatar, Badge } from 'flowbite-react'
import { useRouter } from 'next/navigation'

export type PostHeaderProps = {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const router = useRouter()
  const { publicUrls } = useParseFile(post.userinfo.profile_image_path)
  const { invalidateQueries } = useInvalidateQueries()
  const { confirm } = useModal()
  const { userData: me } = useAuthStore()

  const isOwner = me?.id === post.user_id

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

  const goEditPostPage = () => {
    router.push(`/bar-news/${post.id}/edit`)
  }

  const { mutate: deletePostMutation } = useMutation({
    mutationFn: async () => await deletePost(post.id),
    onSuccess: () => {
      snackBar.showSuccess(
        '게시글 삭제 성공',
        '게시글이 성공적으로 삭제되었습니다.',
      )
      invalidateQueries([queries.post.all().queryKey])
    },
    onError: (error) => {
      snackBar.showError('게시글 삭제 실패', error.message)
    },
  })

  const handleDeletePost = async () => {
    const isConfirmed = await confirm({
      title: '게시글 삭제',
      message: '게시글을 삭제하시겠습니까?',
    })
    if (isConfirmed) {
      deletePostMutation()
    }
  }

  return (
    <div className="flex items-center justify-between">
      {publicUrls && (
        <Avatar img={publicUrls} rounded>
          <span className="flex flex-row flex-wrap gap-2">
            <Badge color={getPostTagColor(post.tags)}>{post.tags.name}</Badge>
          </span>
          <p className="mt-2 flex gap-2">
            <span className="font-medium dark:text-white">
              {post.userinfo.name || '이름 정보 없음'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {post.updated_at
                ? `${dayjs(post.updated_at).format('YYYY.MM.DD')} 수정됨`
                : dayjs(post.created_at).format('YYYY.MM.DD')}
            </span>
          </p>
        </Avatar>
      )}
      {isOwner && (
        <ActionMenu
          vertical
          onEdit={goEditPostPage}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  )
}

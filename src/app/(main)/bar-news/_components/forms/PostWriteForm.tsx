'use client'

import { Button } from 'flowbite-react'
import NewMenuInputs from './NewMenuInputs'
import PostInputs from './PostInputs'
import PostTypeSelect from './PostTypeSelect'
import { useTagStore } from '@/stores/tag.store'

export type PostWriteFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  currentPostTypeId: number
  newMenuTypeId: number
}

export default function PostWriteForm({
  onSubmit,
  currentPostTypeId,
  newMenuTypeId,
}: PostWriteFormProps) {
  const postTags = useTagStore((state) => state.postTags)

  const isEventPostType = currentPostTypeId === newMenuTypeId
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <PostTypeSelect postTypes={postTags} />
      <PostInputs />
      {isEventPostType && <NewMenuInputs />}
      <Button type="submit">게시글 생성</Button>
    </form>
  )
}

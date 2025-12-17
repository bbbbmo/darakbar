'use client'

import NewMenuInputs from './NewMenuInputs'
import PostInputs from './PostInputs'
import PostTypeSelect from './PostTypeSelect'
import { useTagStore } from '@/stores/tag.store'
import { PostForm } from '../../_types/form.schemes'
import { useFormContext } from 'react-hook-form'

export type PostWriteFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  newMenuTypeId: number
}

export default function PostWriteForm({
  onSubmit,
  newMenuTypeId,
}: PostWriteFormProps) {
  const postTags = useTagStore((state) => state.postTags)

  const { watch } = useFormContext<PostForm>()

  const watchedPostTypeId = watch('postTypeId')

  const isEventPostType = watchedPostTypeId === newMenuTypeId
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <PostTypeSelect postTypes={postTags} />
      <PostInputs />
      {isEventPostType && <NewMenuInputs />}
    </form>
  )
}

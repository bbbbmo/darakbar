'use client'

import NewMenuInputs from './forms/NewMenuInputs'
import PostInputs from './forms/PostInputs'
import PostTypeSelect from './forms/PostTypeSelect'
import { FormProvider, useForm } from 'react-hook-form'
import {
  PostCreateInput,
  PostCreateInputSchema,
} from '../_types/post-create-form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { postCreateDefaultValues } from '../_const/form.const'
import { queries } from '@/api/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function PostCreateForm() {
  const { data: postTypes } = useSuspenseQuery(queries.tag.posts)
  const newMenuTypeId = postTypes.data.find(
    (type) => type.name === '신메뉴',
  )!.id

  const methods = useForm<PostCreateInput>({
    resolver: zodResolver(PostCreateInputSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: postCreateDefaultValues(newMenuTypeId),
  })

  const watchedPostTypeId = methods.watch('postTypeId')
  const isEventPostType = watchedPostTypeId === newMenuTypeId

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4">
        <PostTypeSelect postTypes={postTypes.data || []} />
        <PostInputs />
        {isEventPostType && <NewMenuInputs />}
      </form>
    </FormProvider>
  )
}

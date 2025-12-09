'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, PostFormSchema } from '../../../_types/form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTagStore } from '@/stores/tag.store'
import PostWriteForm from '../../../_components/forms/PostWriteForm'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'
import { useParams } from 'next/navigation'

export default function PostEditForm() {
  const postTags = useTagStore((state) => state.postTags)
  const newMenuTypeId = postTags.find((tag) => tag.name === '신메뉴')!.id
  const { postId } = useParams()

  const { data: post } = useQuery(queries.post.detail(Number(postId)))

  const methods = useForm<PostForm>({
    resolver: zodResolver(PostFormSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      postTypeId: newMenuTypeId,
      title: post?.data?.title ?? '',
      content: post?.data?.content ?? '',
      postImages: [],
      eventStartDate: post?.data?.event_start_date
        ? new Date(post.data.event_start_date)
        : null,
      eventEndDate: post?.data?.event_end_date
        ? new Date(post.data.event_end_date)
        : null,
      newMenus: post?.data?.new_menus?.map((menu) => ({
        type: menu.type,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        newMenuImage: null,
      })),
    },
  })

  const watchedPostTypeId = methods.watch('postTypeId')

  return (
    <FormProvider {...methods}>
      <PostWriteForm
        onSubmit={() => {}}
        currentPostTypeId={watchedPostTypeId}
        newMenuTypeId={newMenuTypeId}
      />
    </FormProvider>
  )
}

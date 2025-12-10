'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, PostFormSchema } from '../../../_types/form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTagStore } from '@/stores/tag.store'
import PostWriteForm from '../../../_components/forms/PostWriteForm'
import { useSuspenseQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { newMenuDefaultValues } from '../../../_const/form.const'

export default function PostEditForm() {
  const postTags = useTagStore((state) => state.postTags)
  const newMenuTypeId = postTags.find((tag) => tag.name === '신메뉴')!.id
  const { postId } = useParams()

  const { data: post } = useSuspenseQuery(queries.post.detail(Number(postId)))

  const methods = useForm<PostForm>({
    resolver: zodResolver(PostFormSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      postTypeId: newMenuTypeId,
      title: '',
      content: '',
      postImages: [],
      eventStartDate: new Date(),
      eventEndDate: new Date(),
      newMenus: [newMenuDefaultValues],
    },
  })

  // post 데이터가 변경되면 폼 값 업데이트
  useEffect(() => {
    if (post.data) {
      methods.reset({
        postTypeId: post.data.tag_id ?? newMenuTypeId,
        title: post.data.title ?? '',
        content: post.data.content ?? '',
        postImages: [],
        existingPostImages: post.data.image_paths ?? [],
        eventStartDate: post.data.event_start_date
          ? dayjs(post.data.event_start_date).toDate()
          : null,
        eventEndDate: post.data.event_end_date
          ? dayjs(post.data.event_end_date).toDate()
          : null,
        newMenus: post.data.new_menus.map((menu) => ({
          type: menu.type,
          name: menu.name,
          description: menu.description,
          price: menu.price,
          newMenuImage: null,
          existingNewMenuImages: menu.image_path,
        })),
      })
    }
  }, [post])

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

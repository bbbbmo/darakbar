'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, PostFormSchema } from '../../../_types/form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTagStore } from '@/stores/tag.store'
import PostWriteForm from '../../../_components/forms/PostWriteForm'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { newMenuDefaultValues } from '../../../_const/form.const'
import { patchPost } from '@/api/post/patchPost'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'

export default function PostEditForm() {
  const postTags = useTagStore((state) => state.postTags)
  const newMenuTypeId = postTags.find((tag) => tag.name === '신메뉴')!.id
  const { postId } = useParams()
  const { invalidateQueries } = useInvalidateQueries()

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

  const { mutate: updatePostMutation } = useMutation({
    mutationFn: async (data: PostForm) => {
      await patchPost(Number(postId), data)
    },
    onSuccess: () => {
      snackBar.showSuccess(
        '게시글 수정 성공',
        '게시글이 성공적으로 수정되었습니다.',
      )
      methods.reset()
      invalidateQueries([queries.post.all().queryKey])
    },
    onError: (error) => {
      snackBar.showError('게시글 수정 실패', error.message)
    },
  })

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = await methods.trigger()
    if (!isValid) {
      const firstError = Object.values(methods.formState.errors)[0]
      console.log(firstError)
      snackBar.showError(
        '입력 오류',
        firstError?.message ?? '모든 필드를 올바르게 입력해주세요.',
      )
      return
    }
    updatePostMutation(methods.getValues())
  }

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

  return (
    <FormProvider {...methods}>
      <PostWriteForm onSubmit={updatePost} newMenuTypeId={newMenuTypeId} />
    </FormProvider>
  )
}

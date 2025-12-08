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
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { postPost } from '@/api/post/postPost'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'

export default function PostCreateForm() {
  const { data: postTypes } = useSuspenseQuery(queries.tag.posts)
  const { invalidateQueries } = useInvalidateQueries()

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

  const { mutate: createPostMutation } = useMutation({
    mutationFn: async (data: PostCreateInput) => {
      await postPost(data)
    },
    onSuccess: () => {
      snackBar.showSuccess(
        '게시글 생성 성공',
        '게시글이 성공적으로 생성되었습니다.',
      )
      methods.reset()
      invalidateQueries([queries.post.all().queryKey])
    },
    onError: (error) => {
      snackBar.showError('게시글 생성 실패', error.message)
    },
  })

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
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
    createPostMutation(methods.getValues())
  }

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={createPost}>
        <PostTypeSelect postTypes={postTypes.data || []} />
        <PostInputs />
        {isEventPostType && <NewMenuInputs />}
        <Button type="submit">게시글 생성</Button>
      </form>
    </FormProvider>
  )
}

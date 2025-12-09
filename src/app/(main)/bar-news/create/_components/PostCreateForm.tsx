'use client'

import NewMenuInputs from '../../_components/forms/NewMenuInputs'
import PostInputs from '../../_components/forms/PostInputs'
import PostTypeSelect from '../../_components/forms/PostTypeSelect'
import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, PostFormSchema } from '../../_types/form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { newMenuDefaultValues } from '../../_const/form.const'
import { queries } from '@/api/queries'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { postPost } from '@/api/post/postPost'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'

export default function PostCreateForm() {
  const { data: postTypes } = useQuery(queries.tag.posts)
  const { invalidateQueries } = useInvalidateQueries()

  const newMenuTypeId = postTypes?.data?.find(
    (type) => type.name === '신메뉴',
  )!.id

  const methods = useForm<PostForm>({
    resolver: zodResolver(PostFormSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      postTypeId: newMenuTypeId ?? 0,
      title: '',
      content: '',
      postImages: [],
      eventStartDate: new Date(),
      eventEndDate: new Date(),
      newMenus: [newMenuDefaultValues],
    },
  })

  const watchedPostTypeId = methods.watch('postTypeId')
  const isEventPostType = watchedPostTypeId === newMenuTypeId

  const { mutate: createPostMutation } = useMutation({
    mutationFn: async (data: PostForm) => {
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
        <PostTypeSelect postTypes={postTypes?.data || []} />
        <PostInputs />
        {isEventPostType && <NewMenuInputs />}
        <Button type="submit">게시글 생성</Button>
      </form>
    </FormProvider>
  )
}

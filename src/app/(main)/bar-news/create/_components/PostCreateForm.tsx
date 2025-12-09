'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, PostFormSchema } from '../../_types/form.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { newMenuDefaultValues } from '../../_const/form.const'
import { queries } from '@/api/queries'
import { useMutation } from '@tanstack/react-query'
import { postPost } from '@/api/post/postPost'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import PostWriteForm from '../../_components/forms/PostWriteForm'
import { useTagStore } from '@/stores/tag.store'

export default function PostCreateForm() {
  const { invalidateQueries } = useInvalidateQueries()
  const { postTags } = useTagStore()
  const newMenuTypeId = postTags.find((tag) => tag.name === '신메뉴')!.id

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
      <PostWriteForm
        onSubmit={createPost}
        currentPostTypeId={watchedPostTypeId}
        newMenuTypeId={newMenuTypeId}
      />
    </FormProvider>
  )
}

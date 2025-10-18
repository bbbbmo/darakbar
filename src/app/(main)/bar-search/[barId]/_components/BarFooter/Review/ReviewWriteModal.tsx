'use client'

import {
  Button,
  Datepicker,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from 'flowbite-react'
import {
  postBarReview,
  PostBarReviewBody,
} from '@/lib/supabase/api/review/postBarReview'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth.store'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { useBarDetailStore } from '../../../_stores/bar-detail.store'
import FormDescription from '@/components/Forms/FormDescription'
import FormItem from '@/components/Forms/FormItem'
import Stars from '@/components/Stars'
import FormFileInput from '@/components/Forms/FormFileInput'
import Tags from '@/components/Tags'
import { getReviewTags } from '@/lib/supabase/api/tag/getReviewTags'
import {
  ReviewWriteForm,
  ReviewWriteFormSchema,
} from './ReviewWriteModal.schemes'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadFiles } from '@/lib/supabase/api/storage'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'

export type ReviewWriteModalProps = {
  barId: number
  onClose: () => void
}

export default function ReviewWriteModal({
  barId,
  onClose,
}: ReviewWriteModalProps) {
  const ratingInfo = [
    '매우 별로에요',
    '별로에요',
    '괜찮아요',
    '좋아요',
    '최고에요!',
  ]

  const { userData } = useAuthStore()
  const barDetail = useBarDetailStore((state) => state.barDetail)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReviewWriteForm>({
    mode: 'onSubmit',
    resolver: zodResolver(ReviewWriteFormSchema),
    defaultValues: {
      rating: 0,
      visitDate: new Date(),
      body: '',
      images: null,
      tagIds: [],
    },
  })

  const watchedRating = watch('rating')

  const { invalidateQueries } = useInvalidateQueries()

  const { data: reviewTags } = useQuery({
    queryKey: ['review-tags'],
    queryFn: getReviewTags,
  })

  const { mutate: createReviewMutation } = useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string
      body: PostBarReviewBody
    }) => postBarReview({ barId: barId, userId, body }),
    onSuccess: () => {
      invalidateQueries([['bar-reviews', barId]])
      onClose()
    },
    onError: (error) => {
      console.error('리뷰 등록 실패', error)
    },
  })

  const createReview = async (data: ReviewWriteForm) => {
    try {
      console.log(data)
      const imageUrls: string[] = []
      if (!userData) {
        throw new Error('로그인 후 리뷰를 작성할 수 있습니다.')
      }
      if (!barId) {
        throw new Error('바 정보가 없습니다.')
      }
      if (data.images) {
        const results = await uploadFiles(
          data.images,
          `bars/${barId}/review-images/${userData.id}`,
        )
        results.forEach((result) => {
          imageUrls.push(result.data?.path || '')
          if (result.error) {
            throw new Error(`이미지 업로드 실패: ${result.error.message}`)
          }
        })
      }

      const body = {
        rating: data.rating,
        body: data.body,
        images: imageUrls,
        tagIds: data.tagIds,
        visitDate: data.visitDate.toISOString(),
      }

      console.log(body)
      createReviewMutation({ userId: userData.id, body })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Modal show={true} onClose={onClose} size="2xl">
      <ModalHeader className="bg-primary">
        <span className="text-2xl font-bold">리뷰 작성</span>
      </ModalHeader>
      <ModalBody className="bg-primary">
        <form id="review-form" onSubmit={handleSubmit(createReview)}>
          <FormDescription>
            {barDetail?.name || '이름 없음'}에 대한 리뷰를 작성해주세요
          </FormDescription>
          <div className="flex flex-col gap-2">
            <FormItem label="평점" required>
              <div className="flex items-center gap-2">
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Stars
                      rating={field.value}
                      size={24}
                      active={true}
                      setRating={field.onChange}
                    />
                  )}
                />
                <span className="text-sm text-gray-500">
                  {watchedRating > 0 ? ratingInfo[watchedRating - 1] : ''}
                </span>
              </div>
              <FormErrorMessage error={errors.rating} />
            </FormItem>
            <FormItem label="방문 날짜" required>
              <Controller
                name="visitDate"
                control={control}
                render={({ field }) => (
                  <Datepicker
                    language="ko"
                    labelTodayButton="오늘"
                    labelClearButton="초기화"
                    weekStart={1}
                    title="방문 날짜"
                    maxDate={new Date()}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <FormErrorMessage error={errors.visitDate} />
            </FormItem>
            <FormItem label="리뷰 내용" required>
              <Textarea
                color="primary"
                placeholder="이 곳에 대한 솔직한 리뷰를 작성해주세요"
                {...register('body')}
              />
              <FormErrorMessage error={errors.body} />
            </FormItem>
            <FormItem label="사진 (최대 3장)" required>
              <FormFileInput
                registeration={register('images')}
                setValue={setValue}
                trigger={trigger}
              />
            </FormItem>
            <FormItem label="태그 (최대 5개)" required>
              <Controller
                name="tagIds"
                control={control}
                render={({ field }) => (
                  <Tags
                    tags={reviewTags?.data || []}
                    active={true}
                    setTagIds={field.onChange}
                  />
                )}
              />
            </FormItem>
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="bg-primary">
        <div className="flex gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button color="primary" type="submit" form="review-form">
            리뷰 등록
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

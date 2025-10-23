// ReviewFormModal.tsx
'use client'

import {
  Button,
  Card,
  Datepicker,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import FormDescription from '@/components/Forms/FormDescription'
import FormItem from '@/components/Forms/FormItem'
import Stars from '@/components/Stars'
import FormFileInput from '@/components/Forms/FormFileInput'
import Tags from '@/components/Tags'
import { getReviewTags } from '@/lib/supabase/api/tag/getReviewTags'
import { Controller, UseFormReturn } from 'react-hook-form'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import { ReviewForm } from './ReviewFormModal.schemes'
import { basicTheme } from '@/lib/flowbite/themes/basicTheme'

export type ReviewFormModalProps = {
  title: string
  description: string
  disableRating?: boolean
  form: UseFormReturn<ReviewForm>
  onSubmit: () => void
  onClose: () => void
  submitButtonText: string
}

export default function ReviewFormModal({
  title,
  description,
  disableRating = false,
  form,
  onSubmit,
  onClose,
  submitButtonText,
}: ReviewFormModalProps) {
  const ratingInfo = [
    '매우 별로에요',
    '별로에요',
    '괜찮아요',
    '좋아요',
    '최고에요!',
  ]

  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form
  const watchedRating = watch('rating')
  const existingImages = watch('existingImages')

  const { data: reviewTags } = useQuery({
    queryKey: ['review-tags'],
    queryFn: getReviewTags,
  })

  return (
    <Modal show={true} onClose={onClose} size="2xl">
      <ModalHeader className="bg-primary">
        <span className="text-2xl font-bold">{title}</span>
      </ModalHeader>
      <ModalBody className="bg-primary">
        <form id="review-form" onSubmit={onSubmit}>
          <FormDescription>{description}</FormDescription>
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
                      active={!disableRating}
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
                    theme={basicTheme.datepicker}
                    color="primary"
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

            <FormItem label="사진 (최대 3장)">
              <FormFileInput
                registeration={register('images')}
                setValue={setValue}
                trigger={trigger}
                existingImages={existingImages}
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
                    existingTagIds={field.value}
                    setTagIds={field.onChange}
                  />
                )}
              />
            </FormItem>
            <Card className="border-neutral-600 bg-neutral-800">
              <p className="text-sm text-gray-500">
                작성하신 리뷰는 다른 사용자들에게 공개됩니다. 허위 정보나
                부적절한 내용이 포함된 리뷰는 관리자에 의해 삭제될 수 있습니다.
              </p>
            </Card>
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="bg-primary">
        <div className="ml-auto flex gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button color="primary" type="submit" form="review-form">
            {submitButtonText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

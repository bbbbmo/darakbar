import FormDescription from '@/components/Forms/FormDescription'
import FormItem from '@/components/Forms/FormItem'
import { BarReview } from '@/lib/supabase/api/review/getBarReviews'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from 'flowbite-react'
import { Controller, useForm } from 'react-hook-form'
import { ReviewEditForm, ReviewEditFormSchema } from './ReviewEditModal.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import FormFileInput from '@/components/Forms/FormFileInput'
import Tags from '@/components/Tags'
import { useQuery } from '@tanstack/react-query'
import { getReviewTags } from '@/lib/supabase/api/tag/getReviewTags'

export type ReviewEditModalProps = {
  review: BarReview
  onClose: () => void
}

export default function ReviewEditModal({
  review,
  onClose,
}: ReviewEditModalProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReviewEditForm>({
    mode: 'onSubmit',
    resolver: zodResolver(ReviewEditFormSchema),
    defaultValues: {
      visitDate: new Date(review.visit_date),
      body: review.body || '',
      images: review.images,
      tagIds: review.review_tags.map((tag) => tag.tags?.id),
    },
  })

  const { data: reviewTags } = useQuery({
    queryKey: ['review-tags'],
    queryFn: getReviewTags,
  })
  return (
    <Modal show={true} onClose={onClose} size="2xl">
      <ModalHeader className="bg-primary">
        <span className="text-2xl font-bold">리뷰 수정</span>
      </ModalHeader>
      <ModalBody className="bg-primary">
        <form id="review-form">
          <FormDescription>리뷰를 수정해주세요</FormDescription>
          <div className="flex flex-col gap-2">
            <FormItem label="리뷰 내용" required>
              <Textarea
                color="primary"
                placeholder="이 곳에 대한 솔직한 리뷰를 작성해주세요"
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

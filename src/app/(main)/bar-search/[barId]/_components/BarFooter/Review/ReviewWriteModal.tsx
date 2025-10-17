'use client'

import {
  Button,
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
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth.store'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import { useBarDetailStore } from '../../../_stores/bar-detail.store'
import FormDescription from '@/components/Forms/FormDescription'
import FormItem from '@/components/Forms/FormItem'

export type ReviewWriteModalProps = {
  barId: number
  onClose: () => void
}

export default function ReviewWriteModal({
  barId,
  onClose,
}: ReviewWriteModalProps) {
  const { userData } = useAuthStore()
  const barDetail = useBarDetailStore((state) => state.barDetail)

  const { invalidateQueries } = useInvalidateQueries()
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
    },
  })

  const createReview = () => {
    try {
      if (!userData) {
        throw new Error('로그인 후 리뷰를 작성할 수 있습니다.')
      }
      if (!barId) {
        throw new Error('바 정보가 없습니다.')
      }
      const body = {
        rating: 4,
        body: 'test',
        images: [],
        tagIds: [10, 11, 12],
      }
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
        <FormDescription>
          {barDetail?.name || '이름 없음'}에 대한 리뷰를 작성해주세요
        </FormDescription>
        <div className="flex flex-col gap-2">
          <FormItem label="리뷰 내용" required>
            <Textarea
              color="primary"
              placeholder="이 곳에 대한 솔직한 리뷰를 작성해주세요"
            />
          </FormItem>
        </div>
      </ModalBody>
      <ModalFooter className="bg-primary">
        <div className="flex gap-2">
          <Button onClick={onClose}>취소</Button>
          <Button color="primary" onClick={createReview}>
            리뷰 등록
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

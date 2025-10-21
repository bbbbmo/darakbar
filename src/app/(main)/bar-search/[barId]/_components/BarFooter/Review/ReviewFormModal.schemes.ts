import z from 'zod'

export const ReviewFormSchema = z.object({
  rating: z.number().min(1, '평점을 선택해주세요'),
  visitDate: z.date().refine((date) => date <= new Date(), {
    message: '방문 날짜는 오늘 이전이어야 합니다',
  }),
  body: z.string().min(1, '리뷰를 입력해주세요'),
  images: z
    .array(z.instanceof(File))
    .max(3, '사진은 최대 3장까지 업로드할 수 있습니다')
    .nullable(),
  tagIds: z.array(z.number()).min(1, '태그를 선택해주세요'),
})

export type ReviewForm = z.infer<typeof ReviewFormSchema>

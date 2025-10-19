import z from 'zod'

export const ReviewEditFormSchema = z.object({
  visitDate: z.date().max(new Date(), '방문 날짜를 선택해주세요'),
  body: z.string().min(1, '리뷰를 입력해주세요'),
  images: z
    .array(z.instanceof(File))
    .max(3, '사진은 최대 3장까지 업로드할 수 있습니다')
    .nullable(),
  tagIds: z.array(z.number()).min(1, '태그를 선택해주세요'),
})

export type ReviewEditForm = z.infer<typeof ReviewEditFormSchema>

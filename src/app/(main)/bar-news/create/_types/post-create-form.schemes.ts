import { FileInputSchema } from '@/types/default.schemes'
import z from 'zod'

const NewMenuInputSchema = z.object({
  type: z.string(),
  name: z.string().min(1, '메뉴 이름을 입력해주세요'),
  description: z.string().min(1, '메뉴 설명을 입력해주세요'),
  price: z.number().min(1, '메뉴 가격을 입력해주세요'),
  newMenuImage: FileInputSchema.nullable(),
})

export const PostCreateInputSchema = z.object({
  postTypeId: z.number(),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  postImages: z.array(FileInputSchema).nullable(),
  eventStartDate: z.date().nullable(),
  eventEndDate: z.date().nullable(),
  newMenus: z.array(NewMenuInputSchema),
})

export type NewMenuInput = z.infer<typeof NewMenuInputSchema>

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>

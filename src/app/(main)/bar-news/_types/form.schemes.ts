import { FileInputSchema } from '@/types/default.schemes'
import z from 'zod'

const NewMenuFormSchema = z.object({
  type: z.string(),
  name: z.string().min(1, '메뉴 이름을 입력해주세요'),
  description: z.string().min(1, '메뉴 설명을 입력해주세요'),
  price: z.number().min(1, '메뉴 가격을 입력해주세요'),
  existingNewMenuImages: z.string().nullable().optional(),
  newMenuImage: FileInputSchema.nullable(),
})

export const PostFormSchema = z.object({
  postTypeId: z.number(),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  postImages: z.array(FileInputSchema),
  existingPostImages: z.array(z.string()).optional(),
  eventStartDate: z.date().nullable(),
  eventEndDate: z.date().nullable(),
  newMenus: z.array(NewMenuFormSchema),
})

export type NewMenuForm = z.infer<typeof NewMenuFormSchema>

export type PostForm = z.infer<typeof PostFormSchema>

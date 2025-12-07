import { FileInputSchema } from '@/types/default.schemes'
import { PostType } from '../_const/post-type.const'
import z from 'zod'

const PostInputsSchema = z.object({
  postType: z.nativeEnum(PostType),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  images: z.array(FileInputSchema).nullable(),
  event_start_date: z.date(),
  event_end_date: z.date(),
})

const NewMenuInputsSchema = z.object({
  type: z.string(),
  name: z.string().min(1, '메뉴 이름을 입력해주세요'),
  description: z.string().min(1, '메뉴 설명을 입력해주세요'),
  price: z.number().min(1, '메뉴 가격을 입력해주세요'),
  image: FileInputSchema.nullable(),
})

export const PostCreateFormSchema = z.object({
  post: PostInputsSchema,
  newMenus: z.array(NewMenuInputsSchema).nullable(),
})

export type PostCreateForm = z.infer<typeof PostCreateFormSchema>

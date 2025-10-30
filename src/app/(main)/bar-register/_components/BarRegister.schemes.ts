import { FileInputSchema, TagSchema } from '@/types/default.schemes'
import z from 'zod'

export const SignatureCocktailFormSchema = z.object({
  name: z.string().min(1, '칵테일 이름을 입력해주세요'),
  description: z
    .string()
    .min(1, '칵테일 설명을 입력해주세요')
    .max(200, '칵테일 설명은 200자 이하로 입력해주세요'),
  image: FileInputSchema.nullable().optional(),
  price: z.number().positive('가격은 0보다 커야 합니다'),
  abv: z.number().positive('알코올 도수는 0보다 커야 합니다'),
  ingredients: z.array(
    z
      .string()
      .min(1, '재료명을 입력해주세요')
      .max(15, '재료명은 15자 이하로 입력해주세요'),
  ),
})

export type SignatureCocktailForm = z.infer<typeof SignatureCocktailFormSchema>

export const BarRegisterFormSchema = z.object({
  name: z
    .string()
    .min(1, '바 이름을 입력해주세요')
    .max(30, '바 이름은 30자 이하로 입력해주세요'),
  address: z.string().min(1, '바 주소를 입력해주세요'),
  phoneNumber: z.string().min(1, '바 전화번호를 입력해주세요'),
  description: z
    .string()
    .min(1, '바 설명을 입력해주세요')
    .max(200, '바 설명은 200자 이하로 입력해주세요'),
  barImages: z
    .array(FileInputSchema.nullable().optional())
    .max(3, '바 이미지는 최대 3장까지 업로드할 수 있습니다')
    .nullable()
    .optional(),
  category: z.string().nullable(),
  atmosphereTagIds: z.array(z.number()).nullable(),
  instagramUrl: z.string().nullable().optional(),
  websiteUrl: z.string().nullable().optional(),
  signatureCocktails: SignatureCocktailFormSchema.array(),
})

export type BarRegisterForm = z.infer<typeof BarRegisterFormSchema>

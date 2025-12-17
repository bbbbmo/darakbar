import { FileInputSchema } from '@/types/default.schemes'
import z from 'zod'

export const BusinessHourSchema = z.object({
  dayOfWeek: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
  openTime: z.string().min(1, '영업 시작 시간을 입력해주세요'),
  closeTime: z.string().min(1, '영업 종료 시간을 입력해주세요'),
  lastOrderTime: z.string().min(1, '라스트 오더 시간을 입력해주세요'),
  isClosed: z.boolean(),
  significant: z.string().nullable(),
})

export type BusinessHourForm = z.infer<typeof BusinessHourSchema>

export const IngredientSchema = z.object({
  ingredientId: z
    .number()
    .nullable()
    .refine((value) => value !== null, {
      message: '재료를 선택해주세요',
    }),
})

export const SignatureCocktailFormSchema = z.object({
  name: z.string().min(1, '칵테일 이름을 입력해주세요'),
  description: z
    .string()
    .min(1, '칵테일 설명을 입력해주세요')
    .max(200, '칵테일 설명은 200자 이하로 입력해주세요'),
  image: FileInputSchema.nullable(),
  price: z.number().positive('가격은 0보다 커야 합니다'),
  abv: z.number().nonnegative('알코올 도수는 0 이상이어야 합니다'),
  ingredients: z.array(IngredientSchema).refine(
    (ingredients) => {
      const ingredientIds = ingredients.map(
        (ingredient) => ingredient.ingredientId,
      )
      return ingredientIds.length === new Set(ingredientIds).size
    },
    {
      message: '중복된 재료를 선택할 수 없습니다',
    },
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
    .array(FileInputSchema)
    .max(3, '바 이미지는 최대 3장까지 업로드할 수 있습니다')
    .nullable(),
  atmosphereTagIds: z.array(z.number()).min(1, '분위기 태그를 선택해주세요'),
  instagramUrl: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  signatureCocktails: z.array(SignatureCocktailFormSchema),
  businessHours: z.array(BusinessHourSchema),
})

export type BarRegisterForm = z.infer<typeof BarRegisterFormSchema>

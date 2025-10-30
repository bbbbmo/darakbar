import { FileInputSchema } from '@/types/default.schemes'
import { z } from 'zod'

/** Ingredient 스키마 */
export const IngredientSchema = z.object({
  name: z
    .string()
    .min(1, '재료명을 입력하세요.')
    .max(15, '15자 이하로 입력해주세요'),
  amount: z.number().positive('용량은 0보다 커야 합니다.').multipleOf(0.01),
  unit: z.string().min(1, '단위를 입력하세요.'),
  is_base_liquor: z.boolean().default(false),
})

/** IngredientForm 스키마 */
export const IngredientFormSchema = z.object({
  ingredients: z
    .array(IngredientSchema)
    .min(2, '추가 재료를 하나 이상 입력하세요.'),
})
export type IngredientForm = z.infer<typeof IngredientFormSchema>

/** BasicInfoForm 스키마 */
export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, '칵테일 이름을 입력하세요.'),
  image: FileInputSchema.optional(),
  glassType: z.string().min(1, '잔 종류를 선택하세요.').optional(),
})
export type BasicInfoForm = z.infer<typeof BasicInfoFormSchema>

/** DescriptionForm 스키마 */
export const DescriptionFormSchema = z.object({
  instructions: z.string().min(1, '제조 방법을 입력하세요.'),
  description: z.string().max(500, '설명은 500자 이하여야 합니다.'),
})
export type DescriptionForm = z.infer<typeof DescriptionFormSchema>

/** CreateRecipeForm 스키마 (모든 폼 병합) */
export const CreateRecipeFormSchema = z.object({
  ...IngredientFormSchema.shape,
  ...BasicInfoFormSchema.shape,
  ...DescriptionFormSchema.shape,
})
export type CreateRecipeForm = z.infer<typeof CreateRecipeFormSchema>

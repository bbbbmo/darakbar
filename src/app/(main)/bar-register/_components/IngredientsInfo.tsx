import { useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from './BarRegister.schemes'
import { Button, TextInput } from 'flowbite-react'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import FormItem from '@/components/Forms/FormItem'
import { HiXCircle } from 'react-icons/hi'

type IngredientsInfoProps = {
  index: number
}

export default function IngredientsInfo(props: IngredientsInfoProps) {
  const { index } = props
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    // 중첩 배열 경로: 타입 한계를 회피하기 위해 any 캐스팅
    name: `signatureCocktails.${index}.ingredients` as any,
  })

  return (
    <div className="flex flex-col gap-2">
      {ingredientFields.map((ingField, ingIndex) => (
        <div
          key={ingField.id}
          className="flex items-center justify-between gap-2"
        >
          <FormItem label={`재료 ${ingIndex + 1}`} required>
            <TextInput
              type="text"
              placeholder="재료명을 입력해주세요"
              {...register(
                `signatureCocktails.${index}.ingredients.${ingIndex}` as const,
              )}
              aria-invalid={!!errors.signatureCocktails?.[index]?.ingredients}
              className="flex-1"
            />
            <FormErrorMessage
              error={
                errors.signatureCocktails?.[index]?.ingredients?.[ingIndex]
              }
            />
          </FormItem>
          {ingIndex !== 0 && (
            <button
              className="cursor-pointer"
              onClick={() => removeIngredient(ingIndex)}
            >
              <HiXCircle size={20} className="text-gray-500" />
            </button>
          )}
        </div>
      ))}
      <div className="ml-auto">
        <Button
          size="xs"
          color="light"
          onClick={() => appendIngredient('' as string)}
        >
          재료 추가
        </Button>
      </div>
    </div>
  )
}

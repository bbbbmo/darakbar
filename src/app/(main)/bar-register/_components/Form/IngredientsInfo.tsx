import { useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import { Button, TextInput } from 'flowbite-react'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import FormItem from '@/components/Forms/FormItem'
import { HiPlusSm, HiXCircle } from 'react-icons/hi'
import clsx from 'clsx'

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
  const { fields, append, remove } = useFieldArray({
    control,
    // 중첩 배열 경로: 타입 한계를 회피하기 위해 any 캐스팅
    name: `signatureCocktails.${index}.ingredients`,
  })

  return (
    <>
      <FormItem label={'재료'} required>
        {fields.map((field, ingIndex) => (
          <div
            key={field.id}
            className={clsx(
              'flex items-center justify-between gap-2',
              ingIndex !== 0 && 'mt-1',
            )}
          >
            <TextInput
              type="text"
              color="primary"
              placeholder={`재료 ${ingIndex + 1}의 이름을 입력해주세요`}
              {...register(
                `signatureCocktails.${index}.ingredients.${ingIndex}.name`,
              )}
              aria-invalid={!!errors.signatureCocktails?.[index]?.ingredients}
              className="flex-1"
            />
            <FormErrorMessage
              error={
                errors.signatureCocktails?.[index]?.ingredients?.[ingIndex]
                  ?.name
              }
            />
            {ingIndex !== 0 && (
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => remove(ingIndex)}
              >
                <HiXCircle size={20} className="text-gray-500" />
              </button>
            )}
          </div>
        ))}
      </FormItem>

      <Button type="button" onClick={() => append({ name: '' })}>
        <HiPlusSm size={20} className="text-gray-300" />
        재료 추가
      </Button>
    </>
  )
}

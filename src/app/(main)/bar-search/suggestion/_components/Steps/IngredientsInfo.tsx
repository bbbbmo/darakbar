import { useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import { Button, Select } from 'flowbite-react'
import FormItem from '@/components/ui/forms/FormItem'
import { HiPlusSm } from 'react-icons/hi'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'
import React from 'react'
import RemoveButton from '@/components/ui/buttons/RemoveButton'

type IngredientsInfoProps = {
  index: number
}

export default function IngredientsInfo(props: IngredientsInfoProps) {
  const { data: ingredients } = useQuery({
    ...queries.ingredient.all,
  })
  const { index } = props
  const { control, register } = useFormContext<BarRegisterForm>()
  const { fields, append, remove } = useFieldArray({
    control,
    // 중첩 배열 경로: 타입 한계를 회피하기 위해 any 캐스팅
    name: `signatureCocktails.${index}.ingredients` as any,
  })

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    append({ ingredientId: 1 })
  }

  const removeIngredient = (ingIndex: number) => {
    remove(ingIndex)
  }

  return (
    <div className="flex flex-col gap-2">
      <FormItem label={'재료'} required>
        {fields.map((field, ingIndex) => (
          <div
            key={field.id}
            className={clsx(
              'flex items-center justify-between gap-2',
              ingIndex !== 0 && 'mt-1',
            )}
          >
            <Select
              color="primary"
              className="w-full"
              {...register(
                `signatureCocktails.${index}.ingredients.${ingIndex}.ingredientId`,
                {
                  valueAsNumber: true,
                },
              )}
            >
              {ingredients?.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </Select>
            {ingIndex !== 0 && (
              <RemoveButton
                onClick={() => removeIngredient(ingIndex)}
                className="ml-2"
              />
            )}
          </div>
        ))}
      </FormItem>

      <Button type="button" color="primary" size="md" onClick={addIngredient}>
        <HiPlusSm size={20} className="text-zinc-800" />
        재료 추가
      </Button>
    </div>
  )
}

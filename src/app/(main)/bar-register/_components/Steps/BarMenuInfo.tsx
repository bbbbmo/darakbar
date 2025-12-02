import NextButton from '@/components/ui/buttons/NextButton'
import FormDescription from '@/components/ui/forms/FormDescription'
import FormFileInput from '@/components/ui/forms/FormFileInput'
import FormHeader from '@/components/ui/forms/FormHeader'
import FormItem from '@/components/ui/forms/FormItem'
import { Button, Textarea, TextInput } from 'flowbite-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'
import { emptySignatureCocktail } from '../BarRegister.const'
import { HiXCircle } from 'react-icons/hi'
import { FaWonSign, FaPercent } from 'react-icons/fa6'
import { Fragment } from 'react'
import clsx from 'clsx'
import PrevButton from '@/components/ui/buttons/PrevButton'
import IngredientsInfo from './IngredientsInfo'

type BarMenuInfoProps = {
  onPrevStep: () => void
  onNextStep: () => void
}

export default function BarMenuInfo(props: BarMenuInfoProps) {
  const { onPrevStep, onNextStep } = props

  const {
    register,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'signatureCocktails',
  })

  return (
    <>
      <FormHeader title="시그니처 칵테일 정보 입력" />
      <div className="flex justify-between">
        <FormDescription>
          해당 바의 시그니처 칵테일 정보를 입력해주세요.
        </FormDescription>
        <Button
          type="button"
          size="xs"
          onClick={() => append(emptySignatureCocktail)}
        >
          메뉴 입력 추가
        </Button>
      </div>
      <div className="scroll-none flex max-h-[70vh] flex-col gap-2 overflow-y-auto">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <p
              className={clsx(
                'flex items-center justify-between gap-2 text-lg font-bold',
                index !== 0 && 'mt-5',
              )}
            >
              시그니처 칵테일 {index + 1}
              {index !== 0 && (
                <button
                  className="ml-2 cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <HiXCircle size={20} className="text-gray-500" />
                </button>
              )}
            </p>
            <FormItem key={field.id} label="칵테일 이름" required>
              <TextInput
                type="text"
                color="primary"
                placeholder="칵테일 이름을 입력해주세요"
                {...register(`signatureCocktails.${index}.name`)}
                aria-invalid={!!errors.signatureCocktails?.[index]?.name}
              />
              <FormErrorMessage
                error={errors.signatureCocktails?.[index]?.name}
              />
            </FormItem>
            <FormItem label="설명" required>
              <Textarea
                color="primary"
                placeholder="칵테일 설명을 입력해주세요"
                {...register(`signatureCocktails.${index}.description`)}
                aria-invalid={!!errors.signatureCocktails?.[index]?.description}
              />
              <FormErrorMessage
                error={errors.signatureCocktails?.[index]?.description}
              />
            </FormItem>
            <FormItem label="칵테일 이미지" required>
              <FormFileInput
                registeration={register(`signatureCocktails.${index}.image`)}
                setValue={setValue}
                trigger={trigger}
              />
              <FormErrorMessage
                error={errors.signatureCocktails?.[index]?.image}
              />
            </FormItem>
            <div className="flex w-full gap-2">
              <FormItem label="가격" required wrapperClassName="flex-1">
                <TextInput
                  type="number"
                  color="primary"
                  min={0}
                  step={1000}
                  rightIcon={FaWonSign}
                  placeholder="가격을 입력해주세요"
                  {...register(`signatureCocktails.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  aria-invalid={!!errors.signatureCocktails?.[index]?.price}
                />
                <FormErrorMessage
                  error={errors.signatureCocktails?.[index]?.price}
                />
              </FormItem>
              <FormItem label="알코올 도수" required wrapperClassName="flex-1">
                <TextInput
                  type="number"
                  color="primary"
                  min={0}
                  step={1}
                  rightIcon={FaPercent}
                  placeholder="알코올 도수를 입력해주세요"
                  {...register(`signatureCocktails.${index}.abv`, {
                    valueAsNumber: true,
                  })}
                  aria-invalid={!!errors.signatureCocktails?.[index]?.abv}
                />
                <FormErrorMessage
                  error={errors.signatureCocktails?.[index]?.abv}
                />
              </FormItem>
            </div>

            {/* 재료: 배열 입력 */}
            <IngredientsInfo index={index} />

            {index !== fields.length - 1 && (
              <hr className="my-4 border-t border-zinc-600" />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <PrevButton text="이전 단계로 이동" onClick={onPrevStep} />
        <NextButton text="다음 단계로 이동" onClick={onNextStep} />
      </div>
    </>
  )
}

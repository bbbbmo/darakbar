import NextButton from '@/components/Buttons/NextButton'
import PrevButton from '@/components/Buttons/PrevButton'
import FormDescription from '@/components/Forms/FormDescription'
import FormHeader from '@/components/Forms/FormHeader'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormItem from '@/components/Forms/FormItem'
import { TextInput } from 'flowbite-react'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'
import { Fragment } from 'react'
import { formatDayToKorean } from '@/utils/formatBusinessHour'
import FormOption from '@/components/Forms/FormOption'
import TimePicker from '@/components/TimePicker'
import { isOpenOptions } from '../BarRegister.const'

type BarBusinessHourInfoProps = {
  onPrevStep: () => void
  onNextStep: () => void
}

export default function BarBusinessHourInfo(props: BarBusinessHourInfoProps) {
  const { onPrevStep, onNextStep } = props
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()

  const { fields } = useFieldArray({
    control,
    name: 'businessHours',
  })

  const showErrorMessage = (index: number) => {
    return (
      errors.businessHours?.[index]?.openTime ||
      errors.businessHours?.[index]?.closeTime ||
      errors.businessHours?.[index]?.lastOrderTime ||
      errors.businessHours?.[index]?.isClosed ||
      errors.businessHours?.[index]?.significant
    )
  }

  return (
    <>
      <FormHeader title="운영 시간 정보 입력" />
      <FormDescription>바의 운영 시간 정보를 입력해주세요.</FormDescription>
      {fields.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <FormItem
              label={
                field.dayOfWeek
                  ? (formatDayToKorean(field.dayOfWeek) as string)
                  : ''
              }
            >
              <div className="flex gap-2">
                <div className="flex-1">
                  <Controller
                    name={`businessHours.${index}.openTime`}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value ?? ''}
                        setValue={field.onChange}
                        required
                      />
                    )}
                  />
                </div>

                <div className="flex-1">
                  <Controller
                    name={`businessHours.${index}.closeTime`}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value ?? ''}
                        setValue={field.onChange}
                        required
                      />
                    )}
                  />
                </div>

                <div className="flex-1">
                  <Controller
                    name={`businessHours.${index}.lastOrderTime`}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value ?? ''}
                        setValue={field.onChange}
                        required
                      />
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormOption
                    options={isOpenOptions}
                    setOption={(option) =>
                      setValue(
                        `businessHours.${index}.isClosed`,
                        option === '휴무' ? true : false,
                      )
                    }
                    className="w-full"
                    aria-invalid={!!errors.businessHours?.[index]?.isClosed}
                  />
                </div>
              </div>

              <TextInput
                type="text"
                color="primary"
                placeholder="특이사항이 있다면 입력해주세요 ex) 매월 첫번째 월요일 정기 휴무"
                {...register(`businessHours.${index}.significant`)}
                aria-invalid={!!errors.businessHours?.[index]?.openTime}
              />
              <FormErrorMessage error={showErrorMessage(index)} />
            </FormItem>
          </Fragment>
        )
      })}
      <div className="mt-5 flex justify-between">
        <PrevButton text="이전 단계로 이동" onClick={onPrevStep} />
        <NextButton text="등록하기" onClick={onNextStep} />
      </div>
    </>
  )
}

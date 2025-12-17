import PrevButton from '@/components/ui/buttons/PrevButton'
import FormDescription from '@/components/ui/forms/FormDescription'
import FormHeader from '@/components/ui/forms/FormHeader'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormItem from '@/components/ui/forms/FormItem'
import { Button, TextInput } from 'flowbite-react'
import FormErrorMessage from '@/components/ui/forms/FormErrorMessage'
import { Fragment, useState } from 'react'
import { formatDayToKorean } from '@/utils/formatBusinessHour'
import FormOption from '@/components/ui/forms/FormOption'
import TimePicker from '@/components/ui/TimePicker'
import { isOpenOptions } from '../BarRegister.const'
import ApplySameBusinessHourModal from './ApplySameBusinessHourModal'

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

  const [openModal, setOpenModal] = useState(false)

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
      <div className="flex justify-between">
        <FormDescription>바의 운영 시간 정보를 입력해주세요.</FormDescription>{' '}
        <Button type="button" size="xs" onClick={() => setOpenModal(true)}>
          영업 정보가 모두 동일한가요?
        </Button>
      </div>
      <div className="scroll-none flex max-h-[70vh] flex-col gap-2 overflow-y-auto">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <FormItem
              label={
                field.dayOfWeek
                  ? `${formatDayToKorean(field.dayOfWeek)} (시작/마감/라스트 오더)`
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
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <PrevButton text="이전 단계로 이동" onClick={onPrevStep} />
        <Button onClick={onNextStep}>등록하기</Button>
      </div>
      <ApplySameBusinessHourModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        setValue={setValue}
      />
    </>
  )
}

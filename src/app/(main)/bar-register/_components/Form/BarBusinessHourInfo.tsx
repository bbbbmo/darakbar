import NextButton from '@/components/Buttons/NextButton'
import PrevButton from '@/components/Buttons/PrevButton'
import FormDescription from '@/components/Forms/FormDescription'
import FormHeader from '@/components/Forms/FormHeader'
import { useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'

type BarBusinessHourInfoProps = {
  onPrevStep: () => void
  onNextStep: () => void
}

export default function BarBusinessHourInfo(props: BarBusinessHourInfoProps) {
  const { onPrevStep, onNextStep } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()

  return (
    <>
      <FormHeader title="운영 시간 정보 입력" />
      <FormDescription>바의 운영 시간 정보를 입력해주세요.</FormDescription>
      <div className="mt-5 flex justify-between">
        <PrevButton text="이전 단계로 이동" onClick={onPrevStep} />
        <NextButton text="등록하기" onClick={onNextStep} />
      </div>
    </>
  )
}

import NextButton from '@/components/Buttons/NextButton'
import FormDescription from '@/components/Forms/FormDescription'
import FormHeader from '@/components/Forms/FormHeader'
import FormItem from '@/components/Forms/FormItem'
import { TextInput, Textarea } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { BarRegisterForm } from '../BarRegister.schemes'
import FormErrorMessage from '@/components/Forms/FormErrorMessage'

type BarBasicInfoProps = {
  onNextStep: () => void
}

export default function BarBasicInfo(props: BarBasicInfoProps) {
  const { onNextStep } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<BarRegisterForm>()
  return (
    <>
      <FormHeader title="기본 정보 입력" />
      <FormDescription>바의 기본 정보를 입력해주세요.</FormDescription>
      <FormItem label="바 이름" required>
        <TextInput
          type="text"
          color="primary"
          placeholder="바 이름을 입력해주세요"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        <FormErrorMessage error={errors.name} />
      </FormItem>
      <FormItem label="바 주소" required>
        <TextInput
          type="text"
          color="primary"
          placeholder="바 주소를 입력해주세요"
          {...register('address')}
          aria-invalid={!!errors.address}
        />
        <FormErrorMessage error={errors.address} />
      </FormItem>
      <FormItem label="바 전화번호" required>
        <TextInput
          type="text"
          color="primary"
          placeholder="010-0000-0000"
          {...register('phoneNumber')}
          aria-invalid={!!errors.phoneNumber}
        />
        <FormErrorMessage error={errors.phoneNumber} />
      </FormItem>
      <FormItem label="바 설명" required>
        <Textarea
          color="primary"
          placeholder="이곳에 대한 대략적인 설명을 입력해주세요🍸"
          {...register('description')}
          aria-invalid={!!errors.description}
        />
        <FormErrorMessage error={errors.description} />
      </FormItem>
      <div className="mt-5 flex justify-end">
        <NextButton text="다음 단계로 이동" onClick={onNextStep} />
      </div>
    </>
  )
}

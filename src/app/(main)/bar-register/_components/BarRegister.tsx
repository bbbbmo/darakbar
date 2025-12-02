'use client'

import { Card } from 'flowbite-react'
import BarBasicInfo from './Steps/BarBasicInfo'
import { useFunnel } from '@/hooks/useFunnel'
import BarDetailInfo from './Steps/BarDetailInfo'
import BarMenuInfo from './Steps/BarMenuInfo'
import BarBusinessHourInfo from './Steps/BarBusinessHourInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { BarRegisterForm, BarRegisterFormSchema } from './BarRegister.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { barRegisterDefaultValues, barRegisterSteps } from './BarRegister.const'
import { postBar } from '@/api/bar/postBar'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth.store'
import { snackBar } from '@/app/_providers/SnackBarProvider'
import { useInvalidateQueries } from '@/hooks/tanstack-query/useInvalidateQueries'
import { queries } from '@/api/queries'

export default function BarRegister() {
  const { Funnel, Step, setStep } = useFunnel(barRegisterSteps['기본정보'])
  const { invalidateQueries } = useInvalidateQueries()
  const { userData } = useAuthStore()

  const methods = useForm<BarRegisterForm>({
    resolver: zodResolver(BarRegisterFormSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: barRegisterDefaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: BarRegisterForm) => {
      if (!userData?.id) {
        throw new Error('로그인이 필요합니다.')
      }
      await postBar(formData)
    },
    onSuccess: () => {
      snackBar.showSuccess('바 등록 성공', '바가 성공적으로 등록되었습니다.')
      invalidateQueries([queries.bar.all.queryKey])
      methods.reset()
      setStep(barRegisterSteps['기본정보'])
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '바 등록 중 오류가 발생했습니다.'
      snackBar.showError('바 등록 실패', errorMessage)
    },
  })

  const registerBarInfo = async () => {
    const isValid = await methods.trigger()
    if (isValid) {
      mutate(methods.getValues())
    } else {
      const firstError = Object.values(methods.formState.errors)[0]
      snackBar.showError(
        '입력 오류',
        firstError?.message ?? '모든 필드를 올바르게 입력해주세요.',
      )
    }
  }

  return (
    <div className="flex justify-center">
      <FormProvider {...methods}>
        <Card className="w-2xl p-8">
          <Funnel onSubmit={(e) => e.preventDefault()}>
            <Step name={barRegisterSteps['기본정보']}>
              <BarBasicInfo
                onNextStep={() => setStep(barRegisterSteps['상세정보'])}
              />
            </Step>
            <Step name={barRegisterSteps['상세정보']}>
              <BarDetailInfo
                onPrevStep={() => setStep(barRegisterSteps['기본정보'])}
                onNextStep={() =>
                  setStep(barRegisterSteps['시그니처칵테일정보'])
                }
              />
            </Step>
            <Step name={barRegisterSteps['시그니처칵테일정보']}>
              <BarMenuInfo
                onPrevStep={() => setStep(barRegisterSteps['상세정보'])}
                onNextStep={() => setStep(barRegisterSteps['운영시간정보'])}
              />
            </Step>
            <Step name={barRegisterSteps['운영시간정보']}>
              <BarBusinessHourInfo
                onPrevStep={() =>
                  setStep(barRegisterSteps['시그니처칵테일정보'])
                }
                onNextStep={registerBarInfo}
              />
            </Step>
          </Funnel>
        </Card>
      </FormProvider>
    </div>
  )
}

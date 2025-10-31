// src/app/(main)/bar-register/_components/BarRegister.tsx
'use client'

import { Card } from 'flowbite-react'
import BarBasicInfo from './Form/BarBasicInfo'
import { useFunnel } from '@/hooks/useFunnel'
import BarDetailInfo from './Form/BarDetailInfo'
import BarMenuInfo from './Form/BarMenuInfo'
import BarBusinessHourInfo from './Form/BarBusinessHourInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { BarRegisterForm, BarRegisterFormSchema } from './BarRegister.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { barRegisterDefaultValues, barRegisterSteps } from './BarRegister.const'

export default function BarRegister() {
  const { Funnel, Step, setStep } = useFunnel(barRegisterSteps['기본정보'])

  const methods = useForm<BarRegisterForm>({
    resolver: zodResolver(BarRegisterFormSchema),
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: barRegisterDefaultValues,
  })

  return (
    <div className="flex justify-center">
      <Card className="w-2xl p-8">
        <FormProvider {...methods}>
          <Funnel>
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
                onNextStep={() => setStep(barRegisterSteps['완료'])}
              />
            </Step>
          </Funnel>
        </FormProvider>
      </Card>
    </div>
  )
}

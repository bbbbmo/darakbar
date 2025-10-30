'use client'

import { Card } from 'flowbite-react'
import BarBasicInfo from './BarBasicInfo'
import { useFunnel } from '@/hooks/useFunnel'
import BarDetailInfo from './BarDetailInfo'
import BarMenuInfo from './BarMenuInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { BarRegisterForm, BarRegisterFormSchema } from './BarRegister.schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { barRegisterDefaultValues } from './BarRegister.const'

export default function BarRegister() {
  const { Funnel, Step, setStep } = useFunnel('기본정보')
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
            <Step name="기본정보">
              <BarBasicInfo onNextStep={() => setStep('상세정보')} />
            </Step>
            <Step name="상세정보">
              <BarDetailInfo
                onPrevStep={() => setStep('기본정보')}
                onNextStep={() => setStep('메뉴정보')}
              />
            </Step>
            <Step name="메뉴정보">
              <BarMenuInfo
                onPrevStep={() => setStep('상세정보')}
                onNextStep={() => setStep('완료')}
              />
            </Step>
          </Funnel>
        </FormProvider>
      </Card>
    </div>
  )
}

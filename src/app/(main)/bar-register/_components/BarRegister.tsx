'use client'

import { Card } from 'flowbite-react'
import BarBasicInfo from './BarBasicInfo'
import { useFunnel } from '@/hooks/useFunnel'
import BarDetailInfo from './BarDetailInfo'
import BarMenuInfo from './BarMenuInfo'

export default function BarRegister() {
  const { Funnel, Step, setStep } = useFunnel('기본정보')

  return (
    <div className="flex justify-center">
      <Card className="w-2xl p-8">
        <Funnel>
          <Step name="기본정보">
            <BarBasicInfo />
          </Step>
          <Step name="상세정보">
            <BarDetailInfo />
          </Step>
          <Step name="메뉴정보">
            <BarMenuInfo />
          </Step>
        </Funnel>
      </Card>
    </div>
  )
}

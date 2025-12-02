'use client'

import BarImage from './BasicInfo/BarImage'
import BarDescription from './BasicInfo/BarDescription'
import BarBusinessHour from './BasicInfo/BarBusinessHour'
import BarContact from './BasicInfo/BarContact'
import BackToListButton from '../../../../../components/bar/BackToListButton'
import BarFooter from './Footer/BarFooter'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useBar } from '../_providers/BarProviders'
import { useEffect } from 'react'
import { useBarDetailStore } from '../_stores/bar-detail.store'
import SignatureMenuList from './SignatureMenu/SignatureMenuList'
import { queries } from '@/api/queries'

export default function BarDetailContent() {
  const { barId } = useBar()
  const { data: barDetail } = useSuspenseQuery(queries.bar.detail(barId))

  const setBarDetail = useBarDetailStore((state) => state.setBarDetail)

  useEffect(() => {
    setBarDetail(barDetail.data)
  }, [barDetail])

  return (
    <div className="flex flex-col gap-8 md:px-[8vw]">
      <BackToListButton />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <BarImage />
        </div>
        <div className="flex flex-col gap-8">
          <BarDescription />
          <BarContact />
        </div>
        <div className="lg:col-span-2">
          <BarBusinessHour />
        </div>
        <div className="lg:col-span-2">
          <SignatureMenuList />
        </div>
      </div>
      <BarFooter />
    </div>
  )
}

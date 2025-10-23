'use client'

import BarImage from './BarDetails/BarImage'
import BarDescription from './BarDetails/BarDescription'
import BarBusinessHour from './BarDetails/BarBusinessHour'
import BarContact from './BarDetails/BarContact'
import BarSignatureMenus from './BarDetails/BarSignatureMenus/BarSignatureMenus'
import BackToListButton from './BarDetails/BackToListButton'
import BarFooter from './BarFooter/BarFooter'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getBarDetail } from '@/lib/supabase/api/bar/getBarDetail'
import { useBar } from '../_providers/BarProviders'
import { useEffect } from 'react'
import { useBarDetailStore } from '../_stores/bar-detail.store'

export default function BarDetailContent() {
  const { barId } = useBar()
  const { data: barDetail } = useSuspenseQuery({
    queryKey: ['bar', barId],
    queryFn: () => getBarDetail(barId),
  })

  const setBarDetail = useBarDetailStore((state) => state.setBarDetail)

  useEffect(() => {
    setBarDetail(barDetail.data)
  }, [barDetail])

  return (
    <>
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
          <BarSignatureMenus />
        </div>
      </div>
      <BarFooter />
    </>
  )
}

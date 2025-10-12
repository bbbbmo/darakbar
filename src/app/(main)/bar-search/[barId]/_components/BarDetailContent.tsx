'use client'

import BarImage from './BarDetails/BarImage'
import BarDescription from './BarDetails/BarDescription'
import BarBusinessHour from './BarDetails/BarBusinessHour'
import BarContact from './BarDetails/BarContact'
import BarSignatureMenus from './BarDetails/BarSignatureMenus'
import BackToListButton from './BarDetails/BackToListButton'
import BarFooter from './BarFooter/BarFooter'
import { useQuery } from '@tanstack/react-query'
import { getBarDetail } from '@/lib/supabase/api/bar/getBarDetail'

export default function BarDetailContent({ barId }: { barId: number }) {
  const { data: barDetail } = useQuery({
    queryKey: ['bar', barId],
    queryFn: () => getBarDetail(barId),
  })

  console.log('🔍 BarDetailContent query result:', barDetail)
  if (!barDetail?.data) return null

  return (
    <>
      <BackToListButton />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <BarImage barDetail={barDetail.data} />
        </div>
        <div className="flex flex-col gap-8">
          <BarDescription barDetail={barDetail.data} />
          <BarContact barDetail={barDetail.data} />
        </div>
        <div className="lg:col-span-2">
          <BarBusinessHour barDetail={barDetail.data} />
        </div>
        <div className="lg:col-span-2">
          <BarSignatureMenus barDetail={barDetail.data} />
        </div>
      </div>
      <BarFooter />
    </>
  )
}

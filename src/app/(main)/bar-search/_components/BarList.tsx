'use client'

import GridList from '@/components/ui/layout/GridList'
import BarCard from '../../../../components/bar/BarCard'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/api/queries'

export default function BarList() {
  const router = useRouter()

  // 필터 상태 가져오기
  // const filterState = useBarFilterStore()

  // 하이드레이션된 데이터 사용 + 필터링
  const { data: bars, isLoading } = useQuery(queries.bar.all)

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  return (
    <GridList items={bars?.data ?? []}>
      {(bar) => (
        <BarCard
          barInfo={bar}
          loading={isLoading}
          onClick={() => goToBarDetail(bar.id)}
        />
      )}
    </GridList>
  )
}

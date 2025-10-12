'use client'

import GridList from '@/components/GridList'
import BarCard from '../../_components/BarCard/BarCard'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBars } from '@/lib/supabase/api/bar/getBars'
import { useBarFilterStore } from '../_stores/bar-filter.store'
import { Bar } from '@/types/bar/bar.types'

export default function BarList() {
  const router = useRouter()

  // 필터 상태 가져오기
  const filterState = useBarFilterStore()

  // 하이드레이션된 데이터 사용 + 필터링
  const { data: bars, isLoading } = useQuery({
    queryKey: ['bars', filterState], // 필터 상태가 변경되면 쿼리 재실행
    queryFn: () => getBars(filterState), // 필터 파라미터 전달
  })

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    // 정렬 3개까지
    <GridList items={bars?.data ?? []}>
      {(bar: Bar) => (
        <BarCard
          barInfo={bar}
          loading={false}
          onClick={() => goToBarDetail(bar.id)}
        />
      )}
    </GridList>
  )
}

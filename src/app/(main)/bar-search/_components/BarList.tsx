'use client'

import GridList from '@/components/GridList'
import BarCard from '../../_components/BarCard/BarCard'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBars } from '@/lib/supabase/api/bar/getBars'

export default function BarList() {
  const router = useRouter()

  // 필터 상태 가져오기
  // const filterState = useBarFilterStore()

  // 하이드레이션된 데이터 사용 + 필터링
  const { data: bars, isLoading } = useQuery({
    queryKey: ['bars'], // 필터 상태가 변경되면 쿼리 재실행
    queryFn: () => getBars(), // 필터 파라미터 전달
  })

  console.log('🔍 BarList query result:', bars)

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  return (
    // 정렬 3개까지
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

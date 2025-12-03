'use client'

import GridList from '@/components/ui/layout/GridList'
import BarCard from '@/components/bar/BarCard'
import { useRouter } from 'next/navigation'
import { Bar } from '@/api/bar/getBars'

type BarListProps = {
  bars: Bar[]
  loading: boolean
}

export default function BarList({ bars, loading }: BarListProps) {
  const router = useRouter()

  const goToBarDetail = (barId: number) => {
    router.push(`/bar-search/${barId}`)
  }

  return (
    <GridList items={bars}>
      {(bar) => (
        <BarCard
          barInfo={bar}
          loading={loading}
          onClick={() => goToBarDetail(bar.id)}
        />
      )}
    </GridList>
  )
}

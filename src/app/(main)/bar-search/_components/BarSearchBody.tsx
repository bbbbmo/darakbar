'use client'

import { useQuery } from '@tanstack/react-query'
import BarFilter from './BarFilter'
import BarList from './BarList'
import BarMap from './BarMap'
import { queries } from '@/api/queries'

export default function BarSearchBody() {
  const { data: bars, isLoading } = useQuery(queries.bar.all)

  if (!bars?.data) {
    return null
  }

  return (
    <>
      <BarFilter bars={bars.data} />
      <BarMap />
      <BarList bars={bars.data} loading={isLoading} />
    </>
  )
}

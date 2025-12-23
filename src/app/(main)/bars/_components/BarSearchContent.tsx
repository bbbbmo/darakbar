'use client'

import { useQuery } from '@tanstack/react-query'
import BarFilter from './search/BarFilter'
import BarList from './search/BarList'
import { queries } from '@/api/queries'
import { BarFilterOption, BarSortOption } from '@/api/bar/getBars'
import { useState } from 'react'
import BarMap from './search/BarMap'
import { regionOptions } from '@/const/bar-options.const'

export default function BarSearchContent() {
  const [filterOption, setFilterOption] = useState<BarFilterOption>({
    region: regionOptions[0],
  })
  const [sortOption, setSortOption] = useState<BarSortOption | undefined>()

  const { data: bars, isLoading } = useQuery(
    queries.bar.all(filterOption, sortOption),
  )

  return (
    <>
      <BarFilter onChangeFilter={setFilterOption} onChangeSort={setSortOption}>
        <p className="mt-5 text-center text-gray-300">
          <span className="font-semibold">{bars?.data.length || 0}</span>개의
          바를 찾았어요.
        </p>
      </BarFilter>
      <BarMap bars={bars?.data || []} locationName={filterOption.region!} />
      {bars && bars?.data.length > 0 ? (
        <BarList bars={bars.data} loading={isLoading} />
      ) : (
        <p className="py-50 text-center text-gray-300">
          검색 결과가 없어요. 필터를 초기화하거나 다른 검색어를 시도해 보세요.
        </p>
      )}
    </>
  )
}

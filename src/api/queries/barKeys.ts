import { createQueryKeys } from '@lukemorales/query-key-factory'
import { BarFilterOption, BarSortOption, getBars } from '../bar/getBars'
import { getBarDetail } from '../bar/getBarDetail'

export const barKeys = createQueryKeys('bar', {
  all: (filterOption?: BarFilterOption, sortOption?: BarSortOption) => ({
    queryKey: ['all', filterOption, sortOption],
    queryFn: () => getBars({ filterOption, sortOption }),
  }),
  detail: (barId: number) => ({
    queryKey: [String(barId)],
    queryFn: () => getBarDetail(barId),
  }),
})

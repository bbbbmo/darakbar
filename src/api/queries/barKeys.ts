import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getBars } from '../bar/getBars'
import { getBarDetail } from '../bar/getBarDetail'

export const barKeys = createQueryKeys('bar', {
  all: {
    queryKey: null,
    queryFn: () => getBars(),
  },
  detail: (barId: number) => ({
    queryKey: [String(barId)],
    queryFn: () => getBarDetail(barId),
  }),
})

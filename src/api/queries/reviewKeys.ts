import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getBarReviews } from '../review/getBarReviews'

export const barReviewsKeys = createQueryKeys('bar-reviews', {
  all: (barId: number) => ({
    queryKey: [barId],
    queryFn: () => getBarReviews(barId),
  }),
})

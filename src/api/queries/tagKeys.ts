import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getReviewTags } from '../tag/getReviewTags'
import { getAtmosphereTags } from '../tag/getAtmosphereTags'

export const tagKeys = createQueryKeys('tag', {
  atmospheres: {
    queryKey: ['atmosphere-tags'],
    queryFn: () => getAtmosphereTags(),
  },
  reviews: {
    queryKey: ['review-tags'],
    queryFn: () => getReviewTags(),
  },
})

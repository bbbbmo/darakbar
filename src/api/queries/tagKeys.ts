import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getReviewTags } from '../tag/getReviewTags'
import { getAtmosphereTags } from '../tag/getAtmosphereTags'
import { getPostTags } from '../tag/getPostTags'
import { getAllTags } from '../tag/getAllTags'

export const tagKeys = createQueryKeys('tag', {
  all: {
    queryKey: ['all'],
    queryFn: () => getAllTags(),
  },
  atmospheres: {
    queryKey: ['atmosphere-tags'],
    queryFn: () => getAtmosphereTags(),
  },
  reviews: {
    queryKey: ['review-tags'],
    queryFn: () => getReviewTags(),
  },
  posts: {
    queryKey: ['post-tags'],
    queryFn: () => getPostTags(),
  },
})

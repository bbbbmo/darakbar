import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { barReviewsKeys } from './reviewKeys'
import { barKeys } from './barKeys'
import { tagKeys } from './tagKeys'
import { ingredientKeys } from './ingredientKey'
import { userKeys } from './userKeys'

export const queries = mergeQueryKeys(
  barKeys,
  barReviewsKeys,
  tagKeys,
  ingredientKeys,
  userKeys,
)

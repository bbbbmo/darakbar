import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { barReviewsKeys } from './reviewKeys'
import { barKeys } from './barKeys'
import { tagKeys } from './tagKeys'
import { ingredientKeys } from './ingredientKeys'
import { userKeys } from './userKeys'
import { signatureMenuKeys } from './signatureMenuKeys'
import { postKeys } from './postKeys'

export const queries = mergeQueryKeys(
  barKeys,
  barReviewsKeys,
  tagKeys,
  ingredientKeys,
  userKeys,
  signatureMenuKeys,
  postKeys,
)

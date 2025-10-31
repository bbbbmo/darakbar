import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { barReviewsKeys } from './reviewKeys'
import { barKeys } from './barKeys'

export const queries = mergeQueryKeys(barKeys, barReviewsKeys)

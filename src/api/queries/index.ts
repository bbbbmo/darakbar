import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { barReviewsKeys } from './reviewKeys'
import { barKeys } from './barKeys'
import { tagKeys } from './tagKeys'

export const queries = mergeQueryKeys(barKeys, barReviewsKeys, tagKeys)

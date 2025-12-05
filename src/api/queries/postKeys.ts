import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getPosts } from '../post/getPosts'

export const postKeys = createQueryKeys('post', {
  all: {
    queryKey: null,
    queryFn: () => getPosts(),
  },
})

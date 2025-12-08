import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getPosts, getPostsQueryParams } from '../post/getPosts'

export const postKeys = createQueryKeys('post', {
  all: (params?: getPostsQueryParams) => ({
    queryKey: ['all', params],
    queryFn: () => getPosts(params), // 클로저로 params 접근
  }),
})

import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getPost, getPosts, getPostsQueryParams } from '../post/getPosts'

export const postKeys = createQueryKeys('post', {
  all: (params?: getPostsQueryParams) => ({
    queryKey: ['all', params],
    queryFn: () => getPosts(params), // 클로저로 params 접근
  }),
  detail: (postId: number) => ({
    queryKey: [String(postId)],
    queryFn: () => getPost(postId),
  }),
})

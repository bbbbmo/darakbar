import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getCurrentUser, getUserProfile } from '../user'

export const userKeys = createQueryKeys('user', {
  currentUser: {
    queryKey: null,
    queryFn: () => getCurrentUser(),
  },
  profile: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => getUserProfile(userId),
  }),
})

import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getUser } from '../user/user'
import { getUserAvatarUrl } from '../user/userAvatar'

export const userKeys = createQueryKeys('user', {
  currentUser: {
    queryKey: null,
    queryFn: () => getUser(),
  },
  avatar: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => getUserAvatarUrl(userId),
  }),
})

import { useQuery } from '@tanstack/react-query'
import { userKeys } from '@/api/queries/userKeys'

export const useCurrentUser = () => {
  const { data: userData, isLoading, error } = useQuery(userKeys.currentUser)

  const userId = userData?.user?.id
  const userEmail = userData?.user?.email
  const userName = userData?.user?.user_metadata?.name

  return { userId, userEmail, userName, userData, isLoading, error }
}

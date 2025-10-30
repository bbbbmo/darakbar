import { useCurrentUser } from '@/hooks/tanstack-query/useCurrentUserQuery'
import { getUserRecipesWithIngredients } from '@lib/supabase/api/recipe/recipe'
import { useQuery } from '@tanstack/react-query'

// TODO: userInfo 못가져옴
export const useUserRecipe = () => {
  const { userId } = useCurrentUser()
  const readQuery = useQuery({
    queryKey: ['user-recipe', userId],
    queryFn: () => getUserRecipesWithIngredients(userId ?? ''),
    enabled: !!userId,
  })

  return {
    readQuery,
  }
}

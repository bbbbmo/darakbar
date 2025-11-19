import { getUser } from '@/api/user/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateRecipeForm } from '../RecipeCreateModal.schemes'
import { createValidatedUserRecipe } from '@api/recipe/recipe'

export const useCreateUserRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: CreateRecipeForm) => {
      const user = await getUser()

      await createValidatedUserRecipe(formData, user.user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-recipe'] })
    },
    onError: (error) => {
      console.error('레시피 등록 실패', error)
    },
  })
}

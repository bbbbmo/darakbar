import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getIngredients } from '../ingredients/getIngredients'

export const ingredientKeys = createQueryKeys('ingredient', {
  all: {
    queryKey: null,
    queryFn: () => getIngredients(),
  },
})

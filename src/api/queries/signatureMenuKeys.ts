import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getSignatureCocktails } from '../signature-menu/getSignatureCocktails'

export const signatureMenuKeys = createQueryKeys('signatureMenu', {
  all: {
    queryKey: null,
    queryFn: () => getSignatureCocktails(),
  },
})

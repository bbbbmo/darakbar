import { QueryKey, useQueryClient } from '@tanstack/react-query'

/**
 * @description 쿼리 캐시 무효화 컴포저블
 */
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  const invalidateQueries = async (keys: QueryKey[]) => {
    await Promise.all(
      keys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
    )
  }

  return { invalidateQueries }
}

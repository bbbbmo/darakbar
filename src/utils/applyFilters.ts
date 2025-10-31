// src/lib/supabase/utils/queryBuilder.ts
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

/**
 * @description 필터 적용
 * @param query
 * @param filters
 */
export const applyFilters = <T>(
  query: PostgrestFilterBuilder<any, any, any, T>,
  filters: Record<string, any>,
) => {
  let filteredQuery = query

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      filteredQuery = filteredQuery.eq(key, value)
    }
  })

  return filteredQuery
}

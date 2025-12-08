import { PostgrestError } from '@supabase/supabase-js'

/**
 * RPC 함수의 JSONB 응답에서 에러를 확인하고, 에러가 있으면 PostgrestError를 throw합니다.
 * @param data RPC 함수의 응답 데이터
 * @param defaultErrorMessage 기본 에러 메시지 (기본값: '등록 중 오류가 발생했습니다.')
 * @throws PostgrestError 에러가 있는 경우
 */
export const handleRpcError = (
  data: unknown,
  defaultErrorMessage: string = '등록 중 오류가 발생했습니다.',
): void => {
  if (data && typeof data === 'object' && 'success' in data && !data.success) {
    const errorMessage =
      (data as { error?: string }).error || defaultErrorMessage
    const postgrestError: PostgrestError = {
      message: errorMessage,
      details: '',
      hint: '',
      code: 'PGRST301',
      name: 'PostgrestError',
    } as const
    throw postgrestError
  }
}

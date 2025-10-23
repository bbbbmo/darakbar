import { snackBar } from '@/components/Providers/SnackBarProvider'
import { getPublicUrl } from '@/lib/supabase/api/storage'
import { useEffect, useState } from 'react'

export function useParseFile(filePaths: string): { publicUrls: string }
export function useParseFile(filePaths: string[]): { publicUrls: string[] }
export function useParseFile(filePaths: string | string[]) {
  const [publicUrls, setPublicUrls] = useState<string | string[]>([])

  useEffect(() => {
    const loadPublicUrls = async () => {
      try {
        if (Array.isArray(filePaths)) {
          // 배열인 경우
          const urls = await Promise.all(
            filePaths.map((filePath) => getPublicUrl(filePath)),
          )
          setPublicUrls(urls as string[])
        } else {
          // 단일 문자열인 경우 - 빈 문자열이나 null 체크
          if (!filePaths || filePaths.trim() === '') {
            setPublicUrls('')
            return
          }
          const url = await getPublicUrl(filePaths)
          setPublicUrls(url as string)
        }
      } catch (error) {
        snackBar.showError(
          '이미지 로드 실패',
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
        )
        setPublicUrls(Array.isArray(filePaths) ? [] : '')
      }
    }
    loadPublicUrls()
  }, [filePaths])

  return {
    publicUrls,
  }
}

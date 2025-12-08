import { snackBar } from '@/app/_providers/SnackBarProvider'
import { getPublicUrl } from '@/api/file/storage'
import { useEffect, useState, useMemo } from 'react'

export function useParseFile(filePaths: string | null | undefined): {
  publicUrls: string | null
  isLoading: boolean
}
export function useParseFile(filePaths: string[] | null | undefined): {
  publicUrls: string[] | null
  isLoading: boolean
}
export function useParseFile(filePaths: string | string[] | null | undefined) {
  const [publicUrls, setPublicUrls] = useState<string | string[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 깊은 비교를 위한 안정적인 키 생성
  const filePathsKey = useMemo(() => {
    if (Array.isArray(filePaths)) {
      return JSON.stringify(filePaths)
    }
    return filePaths || ''
  }, [filePaths])

  useEffect(() => {
    setIsLoading(true)

    const loadPublicUrls = async () => {
      try {
        if (!filePaths) {
          setPublicUrls(null)
          return
        }
        if (Array.isArray(filePaths)) {
          // 배열인 경우
          const urls = await Promise.all(
            filePaths.map((filePath) => getPublicUrl(filePath)),
          )
          setPublicUrls(urls)
        } else {
          // 단일 문자열인 경우 - 빈 문자열이나 null 체크
          const url = await getPublicUrl(filePaths)
          setPublicUrls(url)
        }
      } catch (error) {
        snackBar.showError(
          '이미지 로드 실패',
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
        )
        setPublicUrls(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadPublicUrls()
  }, [filePathsKey]) // 안정적인 키 사용

  return {
    publicUrls,
    isLoading,
  }
}

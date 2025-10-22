import { getPublicUrl } from '@/lib/supabase/api/storage'
import { useEffect, useState } from 'react'

export function useParseFile(filePaths: string): { publicUrls: string }
export function useParseFile(filePaths: string[]): { publicUrls: string[] }
export function useParseFile(filePaths: string | string[]) {
  const [publicUrls, setPublicUrls] = useState<string | string[]>([])

  useEffect(() => {
    const loadPublicUrls = async () => {
      if (Array.isArray(filePaths)) {
        // 배열인 경우
        const urls = await Promise.all(
          filePaths.map((filePath) => getPublicUrl(filePath)),
        )
        setPublicUrls(urls as string[])
      } else {
        // 단일 문자열인 경우
        const url = await getPublicUrl(filePaths)
        setPublicUrls(url as string)
      }
    }
    loadPublicUrls()
  }, [filePaths])

  return {
    publicUrls,
  }
}

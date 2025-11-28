import supabase from '@lib/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'

export const STORAGE_NAME = 'darakbar-storage' as const

/**
 * @description supabase storage에 파일 업로드
 * @param file 업로드할 파일
 * @param filePath 업로드할 파일 경로
 * @returns 업로드된 파일 데이터와 에러
 */
export const uploadFile = async (
  file: File | null | undefined,
  basePath: string,
) => {
  if (!file) return null

  const fileExtension = file.name.split('.').pop()
  const safeFileName = `${uuidv4()}.${fileExtension}`
  const filePath = `${basePath}/${safeFileName}`
  const { data, error } = await supabase.storage
    .from(STORAGE_NAME)
    .upload(filePath, file, {
      cacheControl: '3600', // 파일 캐시 시간 (초 단위)
      upsert: false,
    })

  if (error) {
    throw error
  }

  return data
}

/**
 * @description 여러 파일을 병렬로 업로드
 * @param files 업로드할 파일 배열
 * @param filePath 업로드할 파일 경로
 * @returns 업로드 결과 배열
 */
export const uploadFiles = async (
  files: (File | null | undefined)[] | null | undefined,
  filePath: string,
) => {
  if (!files || files.length === 0) return []

  const validFiles = files.filter((file): file is File => file instanceof File)

  if (validFiles.length === 0) return []

  const uploadPromises = validFiles.map((file) => {
    return uploadFile(file, filePath)
  })

  const results = await Promise.all(uploadPromises)
  return results
}

export const getPublicUrl = async (filePath: string) => {
  const { data } = await supabase.storage
    .from(STORAGE_NAME)
    .getPublicUrl(filePath)

  return data.publicUrl
}

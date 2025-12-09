import z from 'zod'

export const FileInputSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, '이미지를 업로드하세요.')
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    '이미지 크기는 5MB 이하여야 합니다.',
  )

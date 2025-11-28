import z from 'zod'

export const EditProfileFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.email('이메일 형식이 올바르지 않습니다'),
  profileImage: z.instanceof(File).nullable().optional(),
})

export type EditProfileForm = z.input<typeof EditProfileFormSchema>

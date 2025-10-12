import z from 'zod'

export const TagCategorySchemes = z.enum(['atmosphere', 'review'])

export const AtmosphereTagSchemes = z.enum([
  '모든 분위기',
  '모던한',
  '레트로',
  '클래식',
  '바다뷰',
  '뷰맛집',
  '아늑한',
  '고급스러운',
  '힙한',
])

export type AtmosphereTag = z.infer<typeof AtmosphereTagSchemes>

export const ReviewTagSchemes = z.enum([
  '모든 리뷰',
  '친절해요',
  '분위기좋아요',
  '재방문의사있음',
  '조용한분위기',
  '가성비굿',
  '대기있음',
  '무난해요',
  '생일추천',
  '라이브좋아요',
  '인테리어예쁨',
  '시끄러움',
])

export type ReviewTag = z.infer<typeof ReviewTagSchemes>

export type TagCategory = z.infer<typeof TagCategorySchemes>

export const TagSchemes = z.object({
  id: z.number(),
  name: z.string(),
  category: TagCategorySchemes,
})

export type Tag = z.infer<typeof TagSchemes>

import z from 'zod'
import { create } from 'zustand'

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(['atmosphere', 'review', 'post']).optional().nullable(),
})

export type Tag = z.infer<typeof TagSchema>

export type TagStore = {
  allTags: Tag[]
  atmosphereTags: Tag[]
  reviewTags: Tag[]
  postTags: Tag[]
  setAllTags: (tags: Tag[]) => void
  setAtmosphereTags: (tags: Tag[]) => void
  setReviewTags: (tags: Tag[]) => void
  setPostTags: (tags: Tag[]) => void
}

export const useTagStore = create<TagStore>((set) => ({
  allTags: [],
  atmosphereTags: [],
  reviewTags: [],
  postTags: [],
  setAllTags: (tags) => set({ allTags: tags }),
  setAtmosphereTags: (tags) => set({ atmosphereTags: tags }),
  setReviewTags: (tags) => set({ reviewTags: tags }),
  setPostTags: (tags) => set({ postTags: tags }),
}))

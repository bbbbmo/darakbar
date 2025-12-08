import { create } from 'zustand'
import { PostType } from '../_types/post-type.types'

type PostTabStore = {
  selectedPostTab: PostType | '전체'
  setSelectedPostTab: (selectedPostTab: PostType | '전체') => void
}

export const usePostTabStore = create<PostTabStore>()((set) => ({
  selectedPostTab: '전체',
  setSelectedPostTab: (selectedPostTab) => set({ selectedPostTab }),
}))

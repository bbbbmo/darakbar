import { create } from 'zustand'

type PostTabStore = {
  selectedPostTypeId: number | null
  setSelectedPostTypeId: (selectedPostTypeId: number | null) => void
}

export const usePostTabStore = create<PostTabStore>()((set) => ({
  selectedPostTypeId: null,
  setSelectedPostTypeId: (selectedPostTypeId) => set({ selectedPostTypeId }),
}))

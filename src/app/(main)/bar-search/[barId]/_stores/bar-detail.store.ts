import { BarDetail } from '@api/bar/getBarDetail'
import { create } from 'zustand'

type BarDetailState = {
  barDetail: BarDetail | null
}

type BarDetailActions = {
  setBarDetail: (barDetail: BarDetail) => void
  reset: () => void
}

export const useBarDetailStore = create<BarDetailState & BarDetailActions>()(
  (set) => ({
    barDetail: null,
    setBarDetail: (barDetail) => set({ barDetail }),
    reset: () => set({ barDetail: null }),
  }),
)

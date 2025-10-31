import { getBarsQueryParams } from '@api/bar/getBars'
import { create } from 'zustand'

type BarFilterState = getBarsQueryParams & {
  sort: string
}

type BarFilterActions = {
  setName: (name: string) => void
  setRegion: (region: string) => void
  setPriceRange: (priceRange: string) => void
  setCategory: (category: string) => void
  setAtmosphere: (atmosphere: string) => void
  setSort: (sort: string) => void
  resetFilters: () => void
}

const initialFilterState: BarFilterState = {
  name: '',
  region: '모든 지역',
  priceRange: '모든 가격',
  category: '모든 유형',
  atmosphere: '모든 분위기',
  sort: '모든 정렬',
}

export const useBarFilterStore = create<BarFilterState & BarFilterActions>()(
  (set) => ({
    ...initialFilterState,
    setName: (name) => set({ name }),
    setRegion: (region) => set({ region }),
    setPriceRange: (priceRange) => set({ priceRange }),
    setCategory: (category) => set({ category }),
    setAtmosphere: (atmosphere) => set({ atmosphere }),
    setSort: (sort) => set({ sort }),
    resetFilters: () => set(initialFilterState),
  }),
)

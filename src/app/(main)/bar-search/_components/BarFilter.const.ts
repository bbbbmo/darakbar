import {
  atmosphereOptions,
  barCategoryOptions,
  priceRangeOptions,
  regionOptions,
  sortOptions,
} from '@/const/bar.const'

export const barFilterSelect: { key: string; options: string[] }[] = [
  { key: 'region', options: regionOptions },
  { key: 'priceRange', options: priceRangeOptions },
  { key: 'barCategory', options: barCategoryOptions },
  { key: 'atmosphere', options: atmosphereOptions },
  { key: 'sort', options: sortOptions },
]

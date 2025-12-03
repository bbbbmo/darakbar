import { BarSortOption } from '@/api/bar/getBars'

export const regionOptions: string[] = [
  '모든 지역',
  '서울',
  '경기',
  '인천',
  '강원',
  '충청',
  '전라',
  '경상',
  '제주',
] as const

export const priceRangeOptions: string[] = [
  '모든 가격',
  '10000원 이하',
  '20000원 이하',
  '30000원 이하',
] as const

export const barSortOptions: { label: string; value: BarSortOption }[] = [
  { label: '모든 정렬', value: 'all' },
  { label: '이름순', value: 'name_asc' },
  { label: '평점순', value: 'rating_asc' },
  { label: '평점역순', value: 'rating_desc' },
] as const

export const atmosphereOptions: string[] = [
  '모든 분위기',
  '모던한',
  '레트로',
  '클래식',
  '바다뷰',
  '뷰맛집',
  '아늑한',
  '고급스러운',
  '힙한',
] as const

export const barCategoryOptions: string[] = [
  '모든 유형',
  '클래식 바',
  '위스키 바/몰트 바',
  '스피크이지/시크릿 바',
  '모던 바',
  '라운지 바',
  '플레어 바',
  '웨스턴 바',
  '카페',
] as const

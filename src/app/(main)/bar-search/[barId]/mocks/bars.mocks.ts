import { Bar } from '@/types/bar/bar.types'

export const mockBars: Bar[] = [
  {
    id: 1,
    name: '루프탑 하이볼',
    rating: 4.5,
    address: '서울특별시 강남구 테헤란로 123',
    website_url: 'https://www.google.com',
    instagram_url: 'https://www.instagram.com',
    description: '시그니처 하이볼과 도심 야경이 유명한 루프탑 바',
    category: ['클래식 바', '모던 바', '라운지 바'],
    bar_tags: [
      { id: 1, name: '모던한' },
      { id: 2, name: '힙한' },
      { id: 3, name: '아늑한' },
      { id: 4, name: '레트로' },
    ],
    phone_number: '02-1234-5678',
    signature_menus: [
      {
        id: 1,
        name: '유자 하이볼',
        price: 14000,
      },
      {
        id: 2,
        name: '스모키 네그로니',
        price: 16000,
      },
      {
        id: 3,
        name: '바질 진토닉',
        price: 15000,
      },
    ],
    bar_images: [
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1600',
    ],
  },
  {
    id: 2,
    name: '바 틴더',
    rating: 4.5,
    address: '서울특별시 마포구 와우산로 45',
    website_url: 'https://www.google.com',
    instagram_url: 'https://www.instagram.com',
    description: '클래식 칵테일과 재즈 음악이 흐르는 아지트',
    category: ['클래식 바', '모던 바', '라운지 바'],
    bar_tags: [
      { id: 1, name: '클래식' },
      { id: 2, name: '레트로' },
      { id: 3, name: '아늑한' },
    ],
    phone_number: '010-2222-3333',
    signature_menus: [
      {
        id: 1,
        name: '올드 패션드',

        price: 17000,
      },
      {
        id: 2,
        name: '마티니',

        price: 18000,
      },
      {
        id: 3,
        name: '맨해튼',

        price: 18000,
      },
    ],
    bar_images: [
      'https://images.unsplash.com/photo-1542471130-5ebec0d4f0d6?q=80&w=1600',
    ],
  },
  {
    id: 3,
    name: '코지 스피키지',
    rating: 4.5,
    address: '서울특별시 용산구 이태원로 211 B1',
    website_url: 'https://www.google.com',
    instagram_url: 'https://www.instagram.com',
    description: '숨은 문 뒤 작은 스피키지, 바텐더 추천이 일품',
    category: ['스피크이지/시크릿 바'],
    bar_tags: [
      { id: 1, name: '모던한' },
      { id: 2, name: '힙한' },
      { id: 3, name: '아늑한' },
      { id: 4, name: '레트로' },
    ],
    phone_number: '070-7777-8888',
    signature_menus: [
      {
        id: 1,
        name: '바텐더 초이스',
        price: 19000,
      },
      {
        id: 2,
        name: '사워 계열',
        price: 16000,
      },
      {
        id: 3,
        name: '하우스 인퓨전',
        price: 20000,
      },
    ],
    bar_images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600',
    ],
  },
  {
    id: 4,
    name: '썬셋 칵테일 클럽',
    rating: 4.5,
    address: '부산광역시 해운대구 해운대해변로 270',
    website_url: 'https://www.google.com',
    instagram_url: 'https://www.instagram.com',
    description: '노을 보며 즐기는 과일 베이스 칵테일',
    category: ['클래식 바', '모던 바', '라운지 바'],
    bar_tags: [
      { id: 1, name: '고급스러운' },
      { id: 2, name: '뷰맛집' },
    ],
    phone_number: '051-555-9999',
    signature_menus: [
      {
        id: 1,
        name: '패션후르츠 모히또',
        price: 15000,
      },
      {
        id: 2,
        name: '피치 크러쉬',
        price: 14000,
      },
      {
        id: 3,
        name: '코코넛 다이키리',

        price: 16000,
      },
    ],
    bar_images: [
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1600',
    ],
  },
  {
    id: 5,
    name: '더 몰트 하우스',
    rating: 4.5,
    address: '대구광역시 중구 동성로 12',
    website_url: 'https://www.google.com',
    instagram_url: 'https://www.instagram.com',
    description: '몰트 위스키 셀렉션과 싱글오리진 아이스',
    category: ['위스키 바/몰트 바'],
    bar_tags: [
      { id: 1, name: '고급스러운' },
      { id: 2, name: '뷰맛집' },
    ],
    phone_number: '053-444-1212',
    signature_menus: [
      {
        id: 1,
        name: '시그니처 하이볼',
        price: 18000,
      },
      {
        id: 2,
        name: '블라인드 테이스팅 플라이트',
        price: 39000,
      },
    ],
    bar_images: [
      'https://images.unsplash.com/photo-1514361892635-6b07e31e75df?q=80&w=1600',
    ],
  },
]

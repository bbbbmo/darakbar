import { Tag } from '@/types/default.schemes'
import { faker } from '@faker-js/faker'

export type NewMenu = {
  id: number
  name: string
  type: string
  description: string
  price: number
  image_path: string
}

export type Post = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  image_paths?: string[]
  businessUserId: string // 유저로 대체 가능성
  postTag: Tag
  likeCount: number
  eventStartDate: string | null
  eventEndDate: string | null
  newMenu?: NewMenu[]
}

const postTags: Tag[] = [
  { id: 1, name: '신메뉴' },
  { id: 2, name: '이벤트' },
  { id: 3, name: '소식' },
]

export const createMockPost = (): Post => {
  const createdAt = faker.date.recent({ days: 30 })
  const updatedAt = faker.date.between({
    from: createdAt,
    to: new Date(),
  })

  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs({ min: 2, max: 5 }),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    businessUserId: faker.string.uuid(),
    postTag: faker.helpers.arrayElement(postTags),
    likeCount: faker.number.int({ min: 0, max: 500 }),
    eventStartDate: new Date().toISOString(),
    eventEndDate: new Date().toISOString(),
    newMenu: [
      {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.food.dish(),
        type: faker.helpers.arrayElement(['칵테일', '디저트', '음식']),
        description: faker.lorem.paragraph(),
        price: faker.number.int({ min: 1000, max: 100000 }),
        image_path: faker.image.url(),
      },
    ],
  }
}

export const createMockPosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, () => createMockPost())
}

// 기본 목 데이터
export const mockPosts: Post[] = createMockPosts(10)

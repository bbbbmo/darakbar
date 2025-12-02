import {
  BarRegisterForm,
  BusinessHourForm,
  SignatureCocktailForm,
} from './BarRegister.schemes'

export const barRegisterStepOrder = [
  '기본정보',
  '상세정보',
  '시그니처칵테일정보',
  '운영시간정보',
  '완료',
] as const

export type BarRegisterStepKey = (typeof barRegisterStepOrder)[number]

export const barRegisterSteps: Record<BarRegisterStepKey, string> = {
  기본정보: '기본 정보',
  상세정보: '상세 정보',
  시그니처칵테일정보: '시그니처 칵테일 정보',
  운영시간정보: '운영시간 정보',
  완료: '완료',
} as const

export const emptySignatureCocktail: SignatureCocktailForm = {
  name: '',
  description: '',
  image: null,
  price: 0,
  abv: 0,
  ingredients: [
    {
      ingredientId: 1,
    },
  ],
}

export const defaultBusinessHour = {
  openTime: '17:00',
  closeTime: '23:30',
  lastOrderTime: '23:00',
  isClosed: false,
  significant: null,
}

export const emptyBusinessHour: BusinessHourForm[] = [
  {
    ...defaultBusinessHour,
    dayOfWeek: 'mon',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'tue',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'wed',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'thu',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'fri',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'sat',
  },
  {
    ...defaultBusinessHour,
    dayOfWeek: 'sun',
  },
]

export const barRegisterDefaultValues: BarRegisterForm = {
  name: '',
  address: '',
  phoneNumber: '',
  description: '',
  barImages: null,
  atmosphereTagIds: [],
  instagramUrl: null,
  websiteUrl: null,
  signatureCocktails: [emptySignatureCocktail],
  businessHours: emptyBusinessHour,
}

export const isOpenOptions = ['운영', '휴무']

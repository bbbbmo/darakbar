import {
  BarRegisterForm,
  BusinessHourForm,
  SignatureCocktailForm,
} from './BarRegister.schemes'

export const barRegisterSteps: string[] = [
  '기본정보',
  '상세정보',
  '메뉴정보',
  '운영시간정보',
  '완료',
] as const

export const emptySignatureCocktail: SignatureCocktailForm = {
  name: '',
  description: '',
  image: null,
  price: 0,
  abv: 0,
  ingredients: [{ name: '' }],
}

export const emptyBusinessHour: BusinessHourForm[] = [
  {
    dayOfWeek: 'mon',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'tue',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'wed',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'thu',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'fri',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'sat',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
  {
    dayOfWeek: 'sun',
    openTime: '',
    closeTime: '',
    lastOrderTime: '',
    isClosed: false,
    significant: null,
  },
]

export const barRegisterDefaultValues: BarRegisterForm = {
  name: '',
  address: '',
  phoneNumber: '',
  description: '',
  barImages: null,
  category: null,
  atmosphereTagIds: [],
  instagramUrl: null,
  websiteUrl: null,
  signatureCocktails: [emptySignatureCocktail],
  businessHours: emptyBusinessHour,
}

import { BarRegisterForm, SignatureCocktailForm } from './BarRegister.schemes'

export const barRegisterSteps: string[] = [
  '기본정보',
  '상세정보',
  '메뉴정보',
  '완료',
] as const

export const emptySignatureCocktail: SignatureCocktailForm = {
  name: '',
  description: '',
  image: null,
  price: 0,
  abv: 0,
  ingredients: [],
}

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
}

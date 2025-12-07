import {
  NewMenuInput,
  PostCreateInput,
} from '../_types/post-create-form.schemes'
import { menuTypeOptions } from './menu-type.cont'

export const postCreateDefaultValues = (
  postTypeId: number,
): PostCreateInput => ({
  postTypeId: postTypeId,
  title: '',
  content: '',
  postImages: [],
  eventStartDate: new Date(),
  eventEndDate: new Date(),
  newMenus: [],
})

export const newMenuDefaultValues: NewMenuInput = {
  type: menuTypeOptions[0],
  name: '',
  description: '',
  price: 0,
  newMenuImage: null,
}

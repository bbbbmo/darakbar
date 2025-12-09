import { NewMenuForm } from '../_types/form.schemes'
import { menuTypeOptions } from './menu-type.cont'

export const newMenuDefaultValues: NewMenuForm = {
  type: menuTypeOptions[0],
  name: '',
  description: '',
  price: 0,
  newMenuImage: null,
}

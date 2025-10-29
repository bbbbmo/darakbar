import { UserRecipeWithIngredients } from '../(_temp)/personal-recipe/_hooks/useUserRecipe'
import { faker } from '@faker-js/faker'

export const mockCocktails: UserRecipeWithIngredients[] = [
  {
    id: 1,
    user_id: '1',
    name: faker.lorem.word(10),
    glass_type: '잔 타입',
    instructions: faker.lorem.sentence(),
    description: faker.food.description(),
    image_url: faker.image.url(),
    is_user_recipe: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    recipe_ingredients: [
      {
        amount: 1,
        unit: 'ml',
        is_base_liquor: true,
        ingredients: {
          id: 1,
          name: faker.food.ingredient(),
        },
      },
    ],
    userinfo: {
      name: faker.person.fullName(),
      profile_img_url: faker.image.url(),
    },
  },
  {
    id: 2,
    user_id: '1',
    name: faker.lorem.word(10),
    glass_type: '잔 타입',
    instructions: faker.lorem.sentence(),
    description: faker.food.description(),
    image_url: faker.image.url(),
    is_user_recipe: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    recipe_ingredients: [
      {
        amount: 1,
        unit: 'ml',
        is_base_liquor: true,
        ingredients: {
          id: 1,
          name: faker.food.ingredient(),
        },
      },
    ],
    userinfo: {
      name: faker.person.fullName(),
      profile_img_url: faker.image.url(),
    },
  },
  {
    id: 3,
    user_id: '1',
    name: faker.lorem.word(10),
    glass_type: '잔 타입',
    instructions: faker.lorem.sentence(),
    description: faker.food.description(),
    image_url: faker.image.url(),
    is_user_recipe: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    recipe_ingredients: [
      {
        amount: 1,
        unit: 'ml',
        is_base_liquor: true,
        ingredients: {
          id: 1,
          name: faker.food.ingredient(),
        },
      },
    ],
    userinfo: {
      name: faker.person.fullName(),
      profile_img_url: 'https://via.placeholder.com/150',
    },
  },
]

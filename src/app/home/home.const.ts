import { UserRecipeWithIngredients } from "../personal-recipe/_hooks/useUserRecipe";

export const mockCocktails: UserRecipeWithIngredients[] = [
    {
      id: 1,
      user_id: "1",
      name: "칵테일 1",
      glass_type: "잔 타입",
      instructions: "레시피 1",
      description: "설명 1",
      image_url: "https://via.placeholder.com/150",
      is_user_recipe: true,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
      recipe_ingredients: [
        {
          amount: 1,
          unit: "ml",
          is_base_liquor: true,
          ingredients: {
            id: 1,
            name: "재료1",
          },
        },
      ],
      userinfo: {
        name: "이름",
        profile_img_url: "https://via.placeholder.com/150",
      },
    },
    {
      id: 2,
      user_id: "1",
      name: "칵테일 2",
      glass_type: "잔 타입",
      instructions: "레시피 2",
      description: "설명 2",
      image_url: "https://via.placeholder.com/150",
      is_user_recipe: true,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
      recipe_ingredients: [
        {
          amount: 1,
          unit: "ml",
          is_base_liquor: true,
          ingredients: {
            id: 1,
            name: "재료2",
          },
        },
      ],
      userinfo: {
        name: "이름",
        profile_img_url: "https://via.placeholder.com/150",
      },
    },
    {
      id: 3,
      user_id: "1",
      name: "칵테일 3",
      glass_type: "잔 타입",
      instructions: "레시피 3",
      description: "설명 3",
      image_url: "https://via.placeholder.com/150",
      is_user_recipe: true,
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
      recipe_ingredients: [
        {
          amount: 1,
          unit: "ml",
          is_base_liquor: true,
          ingredients: {
            id: 1,
            name: "재료3",
          },
        },
      ],
      userinfo: {
        name: "이름",
        profile_img_url: "https://via.placeholder.com/150",
      },
    },
  ];
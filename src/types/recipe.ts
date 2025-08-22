export type Cocktail = {
  id?: number;
  name: string | null;
  base_liquor: string | null;
  ingredients: (string | null)[];
  glass_type: string | null;
  instructions: string | null;
  description: string | null;
  image_url: string | null;
  user_id?: string | null;
  userinfo?: { name: string };
};

export type Recipe = {
  user_id: string;
  name: string;
  glass_type: string | null;
  instructions: string;
  description: string;
  image_url: string | null;
  is_user_recipe: boolean;
};

export type Ingredient = {
  name: string;
};

export type RecipeIngredient = {
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  unit: string;
  is_base_liquor: boolean;
};


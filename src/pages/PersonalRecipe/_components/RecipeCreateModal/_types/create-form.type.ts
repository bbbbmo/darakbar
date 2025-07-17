export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type IngredientForm = {
  baseLiquor: Ingredient;
  ingredients: Ingredient[];
};

export type BasicInfoForm = {
  name: string;
  image: File;
  imageUrl: string;
  glassType: string;
};

export type DescriptionForm = {
  instructions: string;
  description: string;
};

export type CreateRecipeForm = IngredientForm & BasicInfoForm & DescriptionForm;

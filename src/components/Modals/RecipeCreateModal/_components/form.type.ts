export type IngredientForm = {
  baseLiquor: Ingredient;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type BasicInfoForm = {
  name: string;
  image: string;
  glassType: string;
};

export type DescriptionForm = {
  instructions: string;
  description: string;
};

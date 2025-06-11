export type IngredientForm = {
  baseLiquor: string;
  baseLiquorAmount: number;
  baseLiquorUnit: string;
  ingredients: string[];
  ingredientAmounts: number[];
  ingredientUnits: string[];
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

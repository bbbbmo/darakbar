export type Cocktail_T = {
  id: number;
  name: string;
  base_liquor: string;
  ingredients: string[];
  glass_type: string;
  instructions: string;
  description: string;
  image_url: string | null;
};

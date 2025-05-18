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

import { useCurrentUser } from "@hooks/useCurrentUserQuery";
import { getUserRecipesWithIngredients } from "@lib/supabase/api/recipe";
import { useQuery } from "@tanstack/react-query";

export type UserRecipeWithIngredients = {
  id: number;
  user_id: string;
  name: string;
  glass_type: string | null;
  instructions: string ;
  description: string;
  image_url: string | null;
  is_user_recipe: boolean;
  created_at: string;
  updated_at: string;
  recipe_ingredients: {
    amount: number;
    unit: string;
    is_base_liquor: boolean;
    ingredients: {
      id: number;
      name: string;
    };
  }[] | null;
  userinfo: {
    name: string;
    profile_img_url: string | null;
  } | null;
};

export const useUserRecipe = () => {
  const { userId } = useCurrentUser();
  const readQuery = useQuery({
    queryKey: ["user-recipe", userId],
    queryFn: () => getUserRecipesWithIngredients(userId ?? ""),
    enabled: !!userId,
  });

  return {
    readQuery,
  };
};

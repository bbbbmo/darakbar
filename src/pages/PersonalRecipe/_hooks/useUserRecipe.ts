import { getRecipes } from "@/supabase/api/recipe";
import { useQuery } from "@tanstack/react-query";

export const useUserRecipe = (userId: number) => {
  const readQuery = useQuery({
    queryKey: ["user-recipe", userId],
    queryFn: () => getRecipes(userId),
    enabled: !!userId,
  });

  return {
    readQuery,
  };
};

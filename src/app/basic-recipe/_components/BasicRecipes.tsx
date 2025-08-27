"use client";

import GridList from "@components/GridList";
import RecipeCard from "@components/Cards/RecipeCard/RecipeCard";
import {
  UserRecipeWithIngredients,
  useUserRecipe,
} from "@/app/personal-recipe/_hooks/useUserRecipe";

export default function BasicRecipes() {
  // TODO: 추후 기본 레시피 가져오도록 변경
  const { readQuery } = useUserRecipe();

  return (
    <GridList items={readQuery.data?.data ?? []}>
      {(recipe: any) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe as UserRecipeWithIngredients}
          loading={readQuery.isLoading}
        />
      )}
    </GridList>
  );
}

"use client";

import RecipeCard from "@/components/Cards/RecipeCard/RecipeCard";
import GridList from "@/components/GridList";
import {
  UserRecipeWithIngredients,
  useUserRecipe,
} from "../_hooks/useUserRecipe";

export default function UserRecipes() {
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

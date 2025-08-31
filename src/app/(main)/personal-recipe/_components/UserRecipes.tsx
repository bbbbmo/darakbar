"use client";

import RecipeCard from "@/app/(main)/_components/RecipeCard/RecipeCard";
import GridList from "@/components/GridList";
import { UserRecipe } from "@/types/recipe.types";
import { useUserRecipe } from "../_hooks/useUserRecipe";

export default function UserRecipes() {
  const { readQuery } = useUserRecipe();
  return (
    <GridList items={readQuery.data?.data ?? []}>
      {(recipe: any) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe as UserRecipe}
          loading={readQuery.isLoading}
        />
      )}
    </GridList>
  );
}

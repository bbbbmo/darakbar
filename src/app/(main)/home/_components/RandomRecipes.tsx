"use client";

import { UserRecipeWithIngredients } from "@/app/(main)/personal-recipe/_hooks/useUserRecipe";
import RecipeCard from "@/components/Cards/RecipeCard/RecipeCard";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { mockCocktails } from "../home.const";

export default function RandomRecipes() {
  const [randomCocktails, setRandomCocktails] = useState<
    UserRecipeWithIngredients[]
  >([]);

  useEffect(() => {
    setRandomCocktails(mockCocktails);
    // getRandomCocktails();
  }, []);
  return (
    <Card className="bg-primary w-full">
      <div className="grid w-full grid-cols-3 gap-20">
        {randomCocktails.map((cocktail) => (
          <RecipeCard key={cocktail.id} recipe={cocktail} loading={true} />
        ))}
      </div>
    </Card>
  );
}

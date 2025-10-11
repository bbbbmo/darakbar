"use client";

import RecipeCard from "@/app/(main)/_components/RecipeCard/RecipeCard";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { mockCocktails } from "../home.const";
import { UserRecipe } from "@/types/recipe/recipe.types";

export default function RandomRecipes() {
  const [randomCocktails, setRandomCocktails] = useState<UserRecipe[]>([]);

  useEffect(() => {
    setRandomCocktails(mockCocktails);
    // getRandomCocktails();
  }, []);
  return (
    <Card className="bg-primary w-full">
      <div className="grid w-full grid-cols-3 gap-20">
        {randomCocktails.map((cocktail) => (
          <RecipeCard key={cocktail.id} recipe={cocktail} loading={false} />
        ))}
      </div>
    </Card>
  );
}

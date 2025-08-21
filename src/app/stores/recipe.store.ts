import { UserRecipeWithIngredients } from "@/pages/PersonalRecipe/_hooks/useUserRecipe";
import { create } from "zustand";

type RecipeStore = {
  clickedRecipe: UserRecipeWithIngredients | null;
  setClickedRecipe: (recipe: UserRecipeWithIngredients) => void;
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  clickedRecipe: null,
  setClickedRecipe: (recipe: UserRecipeWithIngredients) => set({ clickedRecipe: recipe }),
}));
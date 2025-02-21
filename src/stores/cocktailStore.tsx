import { create } from "zustand";
import { Cocktail_T } from "../types/cocktailTypes";

interface CocktailStore {
  allCocktails: Cocktail_T[] | null;
  filteredCocktails: Cocktail_T[] | null;
  clickedCardData: Cocktail_T[] | null;
  setAllCocktails: (cocktails: Cocktail_T[] | null) => void;
  setFilteredCocktails: (cocktails: Cocktail_T[] | null) => void;
  setClickedCardData: (cocktails: Cocktail_T[] | null) => void;
}

export default useCocktailStore = create<CocktailStore>((set) => ({
  allCocktails: null,
  filteredCocktails: null,
  clickedCardData: null,
  setAllCocktails: (cocktails) => set({ allCocktails: cocktails }),
  setFilteredCocktails: (cocktails) => set({ filteredCocktails: cocktails }),
  setClickedCardData: (cocktail) => set({ clickedCardData: cocktail }),
}));

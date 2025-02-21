import { create } from "zustand";
import { Cocktail_T } from "../types/cocktailTypes";

interface CocktailStore {
  allCocktails: Cocktail_T[] | null;
  filteredCocktails: Cocktail_T[] | null;
  clickedCardData: Cocktail_T | null;
  setAllCocktails: (cocktails: Cocktail_T[] | null) => void;
  setFilteredCocktails: (cocktails: Cocktail_T[] | null) => void;
  setClickedCardData: (cocktails: Cocktail_T | null) => void;
}

const useCocktailStore = create<CocktailStore>((set) => ({
  allCocktails: null,
  filteredCocktails: null, // 초기값을 null로 설정
  clickedCardData: null,

  // allCocktails 설정 시, filteredCocktails도 allCocktails로 동기화
  setAllCocktails: (cocktails) => {
    set({ allCocktails: cocktails, filteredCocktails: cocktails }); // allCocktails와 filteredCocktails를 동일하게 설정
  },

  setFilteredCocktails: (cocktails) => set({ filteredCocktails: cocktails }),
  setClickedCardData: (cocktail) => set({ clickedCardData: cocktail }),
}));

export default useCocktailStore;

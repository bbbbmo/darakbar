import { create } from "zustand";
import { Cocktail } from "../../../types/recipe";

type CocktailStore = {
  allCocktails: Cocktail[] | null;
  filteredCocktails: Cocktail[] | null;
  clickedCardData: Cocktail | null;
  setAllCocktails: (cocktails: Cocktail[] | null) => void;
  setFilteredCocktails: (cocktails: Cocktail[] | null) => void;
  setClickedCardData: (cocktails: Cocktail | null) => void;
};

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

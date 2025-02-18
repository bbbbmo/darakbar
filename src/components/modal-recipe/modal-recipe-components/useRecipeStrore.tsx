import { create } from "zustand";

interface RecipeStore {
  isOpen: boolean;
  toggleOpen: () => void;
}
// RecipeDetailCard 열고 닫기
const useRecipeStore = create<RecipeStore>((set) => ({
  isOpen: true,
  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));

export default useRecipeStore;

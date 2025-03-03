import { create } from "zustand";

interface RegisterStore {
  baseLiquor: string;
  ingredients: string[];
  ingredientUnits: string[];
  image: File | null;
  name: string;
  instructions: string;
  description: string;
  glassType: string;
  setBaseLiquor: (baseLiquor: string) => void;
  setIngredients: (ingredients: string[]) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (index: number) => void;
  setIngredientUnit: (index: number, unit: string) => void; // 단위 설정
  setImage: (image: File) => void;
  setName: (name: string) => void;
  setInstructions: (instructions: string) => void;
  setDescription: (description: string) => void;
  setGlassType: (glassType: string) => void;
}

const useRegisterStore = create<RegisterStore>((set) => ({
  baseLiquor: "",
  ingredients: [],
  ingredientUnits: [], // 단위 초기화
  image: null,
  name: "",
  instructions: "",
  description: "",
  glassType: "",

  setBaseLiquor: (baseLiquor) => set({ baseLiquor }),

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
      ingredientUnits: [...state.ingredientUnits, ""], // 각 재료에 대응하는 단위 추가
    })),

  removeIngredient: (index) =>
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== index), // 재료 삭제
    })),

  setIngredients: (ingredients) => set({ ingredients }), // 상태를 배열로 직접 설정

  setIngredientUnit: (index, unit) =>
    set((state) => {
      const updatedUnits = [...state.ingredientUnits];
      updatedUnits[index] = unit;
      return { ingredientUnits: updatedUnits };
    }),

  setImage: (image) => set({ image }),

  setName: (name) => set({ name }),

  setInstructions: (instructions) => set({ instructions }),

  setDescription: (description) => set({ description }),

  setGlassType: (glassType) => set({ glassType }),
}));

export default useRegisterStore;

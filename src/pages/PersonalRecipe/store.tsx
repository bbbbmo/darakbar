import { create } from "zustand";

interface RegisterStore {
  baseLiquor: string | null;
  baseLiquorAmount: number | null;
  baseLiquorUnit: string | null;
  ingredients: (string | null)[];
  ingredientAmounts: (number | null)[];
  ingredientUnits: (string | null)[];
  name: string | null;
  image: File | null;
  imagePreview: string | null;
  instructions: string | null;
  description: string | null;
  glassType: string | null;
  setBaseLiquor: (baseLiquor: string | null) => void;
  setBaseLiquorAmount: (amount: number | null) => void;
  setBaseLiquorUnit: (unit: string | null) => void;
  setIngredients: (ingredients: (string | null)[]) => void;
  setIngredientAmounts: (amounts: (number | null)[]) => void;
  setIngredientUnits: (units: (string | null)[]) => void;
  setName: (name: string | null) => void;
  setImage: (image: File | null) => void;
  setImagePreview: (imagePreview: string | null) => void;
  setInstructions: (instructions: string | null) => void;
  setDescription: (description: string | null) => void;
  setGlassType: (glassType: string | null) => void;
}

const useRegisterStore = create<RegisterStore>((set) => ({
  baseLiquor: null, // null 허용
  baseLiquorAmount: null,
  baseLiquorUnit: null,
  ingredients: [], // null 허용
  ingredientAmounts: [],
  ingredientUnits: [],
  name: null, // null 허용
  image: null, // File | null
  imagePreview: null, // string | null
  instructions: null, // null 허용
  description: null, // null 허용
  glassType: null, // null 허용

  setBaseLiquor: (baseLiquor) => set({ baseLiquor }),
  setBaseLiquorAmount: (amount) => set({ baseLiquorAmount: amount }),
  setBaseLiquorUnit: (unit) => set({ baseLiquorUnit: unit }),

  setIngredients: (ingredients) => set({ ingredients }), // 상태를 배열로 직접 설정
  setIngredientAmounts: (amounts) => set({ ingredientAmounts: amounts }),
  setIngredientUnits: (units) => set({ ingredientUnits: units }),

  setName: (name) => set({ name }),

  setImage: (image) => set({ image }),
  setImagePreview: (imagePreview) => set({ imagePreview }),

  setInstructions: (instructions) => set({ instructions }),

  setDescription: (description) => set({ description }),

  setGlassType: (glassType) => set({ glassType }),
}));

export default useRegisterStore;

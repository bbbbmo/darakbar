import { create } from "zustand";
import type {
  BasicInfoForm,
  CreateRecipeForm,
  IngredientForm,
} from "../_types/create-form.type";
import type { DescriptionForm } from "../_types/create-form.type";

type RecipeFormStore = {
  basicInfo: Partial<BasicInfoForm>;
  ingredients: Partial<IngredientForm>;
  description: Partial<DescriptionForm>;
  updateBasicInfo: (data: Partial<BasicInfoForm>) => void;
  updateIngredients: (data: Partial<IngredientForm>) => void;
  updateDescription: (data: Partial<DescriptionForm>) => void;
  resetForm: () => void;
  getAllForm: () => CreateRecipeForm;
};

export const useRecipeCreateStore = create<RecipeFormStore>((set, get) => ({
  basicInfo: {},
  ingredients: {},
  description: {},
  updateBasicInfo: (data) =>
    set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),
  updateIngredients: (data) =>
    set((state) => ({ ingredients: { ...state.ingredients, ...data } })),
  updateDescription: (data) =>
    set((state) => ({ description: { ...state.description, ...data } })),
  resetForm: () => set({ basicInfo: {}, ingredients: {}, description: {} }),
  getAllForm: () => ({
    ...(get().basicInfo as BasicInfoForm),
    ...(get().ingredients as IngredientForm),
    ...(get().description as DescriptionForm),
  }),
}));

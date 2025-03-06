import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
}));

export default useLoadingStore;

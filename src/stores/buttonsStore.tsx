import { create } from "zustand";

interface ButtonsStore {
  starBtn: boolean;
  shareBtn: boolean;
  chatBtn: boolean;
  detailBtn: boolean;
  setStarBtn: () => void;
  setShareBtn: () => void;
  setChatBtn: () => void;
  setDetailBtn: () => void;
}

const useButtonsStore = create<ButtonsStore>((set) => ({
  starBtn: false,
  shareBtn: false,
  chatBtn: false,
  detailBtn: false,

  setStarBtn: () => set({ starBtn: true }),
  setShareBtn: () => set({ shareBtn: true }),
  setChatBtn: () => set({ chatBtn: true }),
  setDetailBtn: () => set({ detailBtn: true }),
}));

export default useButtonsStore;

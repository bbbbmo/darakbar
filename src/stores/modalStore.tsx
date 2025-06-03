import { create } from "zustand";

type ModalKey = "recipe" | "register" | "alert";

type ModalStore = {
  modals: Record<ModalKey, boolean>;
  open: (key: ModalKey) => void;
  close: (key: ModalKey) => void;
  isOpen: (key: ModalKey) => boolean;
};

const useModalStore = create<ModalStore>((set, get) => ({
  modals: {
    recipe: false,
    register: false,
    alert: false,
  },
  open: (key: ModalKey) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true },
    })),
  close: (key: ModalKey) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false },
    })),
  isOpen: (key: ModalKey) => get().modals[key] || false,
}));

export default useModalStore;

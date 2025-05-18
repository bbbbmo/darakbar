import { create } from "zustand";

type ModalType = "detail" | "register";

// type ModalPropsMap = {
//   detail: { id: number };
//   register:
// };

type ModalStore = {
  modal: ModalType | null;
  open: <K extends ModalType>(modal: K) => void;
  close: () => void;
};
// RecipeDetailCard 열고 닫기
const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: (modal) => set({ modal }),
  close: () => set({ modal: null }),
}));

export default useModalStore;

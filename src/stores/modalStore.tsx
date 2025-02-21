import { create } from "zustand";

interface ModalStore {
  isDetailOpen: boolean;
  isChatOpen: boolean;
  closeDetail: () => void;
  closeChat: () => void;
  toggleDetailOpen: () => void;
  toggleChatOpen: () => void;
}
// RecipeDetailCard 열고 닫기
const useModalStore = create<ModalStore>((set) => ({
  isDetailOpen: true,
  isChatOpen: false,

  closeDetail: () =>
    set(() => ({
      isDetailOpen: false,
    })),

  closeChat: () =>
    set(() => ({
      isChatOpen: false,
    })),

  toggleDetailOpen: () =>
    set((state) => {
      state.closeChat();
      return { isDetailOpen: !state.isDetailOpen };
    }),

  toggleChatOpen: () =>
    set((state) => {
      state.closeDetail();
      return { isChatOpen: !state.isChatOpen };
    }),
}));

export default useModalStore;

import { useState } from "react";
import GlobalFooter from "../../components/layout/GlobalFooter";
import GlobalNav from "../../components/layout/GlobalNav";
import Modal from "../../components/modal/Modal";
import SearchBar from "../../components/SearchBar";
import useModalStore from "../../stores/modalStore";
import RecipeRegisterIngredients from "./components/RecipeRegisterIngredients";

export default function RecipeRegister() {
  const { isDetailOpen, isChatOpen } = useModalStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 모달 여닫기 함수
  const openRecipeCardModal = () => {
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15">
        {/* <SearchBar /> */}
        <div className="mt-10 mb-10 flex h-full w-full flex-col">
          <p className="flex flex-col text-xl text-amber-400">
            <span>자신만의 칵테일을 만들어 다락바에 보관해 보세요!</span>
            <button
              className="rounded-2xl bg-amber-400 p-2 text-xl text-neutral-900 hover:bg-amber-500 sm:w-30 xl:w-50"
              onClick={openRecipeCardModal}
            >
              레시피 등록하기
            </button>
          </p>
        </div>
        <div className="grid justify-center md:grid-cols-3 xl:grid-cols-4"></div>
        {/* 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeRecipeModal}>
          <RecipeRegisterIngredients />
        </Modal>
      </div>
      <GlobalFooter />
    </>
  );
}

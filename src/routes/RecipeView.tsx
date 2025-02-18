import { useState } from "react";
// 컴포넌트
import GlobalNav from "../components/layout/GlobalNav";
import Modal from "../components/layout/Modal";
import RecipeViewCard from "../components/modal-recipe/modal-recipe-components/RecipeViewCard";
import RecipeDetailCard from "../components/modal-recipe/modal-recipe-components/RecipeDetailCard";
import GlobalFooter from "../components/layout/GlobalFooter";
import useRecipeStore from "../components/modal-recipe/modal-recipe-components/useRecipeStrore";

export default function RecipeView() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isOpen } = useRecipeStore();

  const openRecipeModal = () => {
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15">
        {/* 닫기버튼 */}
        <button
          className="modal-open-btn h-10 w-30 cursor-pointer rounded-full bg-red-500"
          onClick={openRecipeModal}
        >
          모달 OPEN
        </button>
        {/* 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeRecipeModal}>
          <div className="modal-components-container mt-3 flex h-full w-auto gap-5">
            <div className="w-200">
              <RecipeViewCard />
            </div>
            <div className={`${isOpen ? "w-100" : "hidden"}`}>
              <RecipeDetailCard />
            </div>
          </div>
        </Modal>
      </div>
      <GlobalFooter />
    </>
  );
}

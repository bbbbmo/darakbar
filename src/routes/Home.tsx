import { useState } from "react";
// 컴포넌트
import GlobalNav from "../components/layout/GlobalNav";
import Modal from "../components/layout/Modal";
import RecipeViewCard from "../components/modal-recipe/modal-recipe-components/RecipeViewCard";
import RecipeDetailCard from "../components/modal-recipe/modal-recipe-components/RecipeDetailCard";
import GlobalFooter from "../components/layout/GlobalFooter";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRecipeDetailOpen, setIsRecipeOpen] = useState<boolean>(true);

  const openRecipeModal = () => {
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
  };

  // [TODO] RecipeDetailCard 닫기 버튼 구현
  const closeRecipeDetail = () => {
    setIsRecipeOpen(false);
  };

  return (
    <>
      {/* Nav 바 */}
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
            <div className="w-100">
              <RecipeDetailCard onClose={closeRecipeDetail} />
            </div>
          </div>
        </Modal>
      </div>
      <GlobalFooter />
    </>
  );
}

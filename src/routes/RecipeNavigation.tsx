import { useState } from "react";
// 컴포넌트
import GlobalNav from "../components/layout/GlobalNav";
import Modal from "../components/layout/Modal";
import RecipeViewCard from "../components/recipe-modal/components/RecipeViewCard";
import RecipeDetailCard from "../components/recipe-modal/components/RecipeDetailCard";
import GlobalFooter from "../components/layout/GlobalFooter";
import useRecipeStore from "../components/recipe-modal/components/useRecipeStrore";
import RecipeChatCard from "../components/recipe-modal/components/RecipeChatCard";
import RecipeCard from "../components/recipe-card/RecipeCard";

export default function RecipeNavigation() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isDetailOpen, isChatOpen } = useRecipeStore();

  const openRecipeModal = () => {
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* Nav 바 */}
      <GlobalNav />
      <div className="wrapper h-full w-full px-15 pt-15">
        {/* 레시피 카드 */}
        <div onClick={openRecipeModal}>
          <RecipeCard />
        </div>
        {/* 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeRecipeModal}>
          <div className="modal-components-container mt-3 flex h-full w-auto gap-5">
            <div className="w-200">
              <RecipeViewCard />
            </div>
            <div
              className={`${isDetailOpen && !isChatOpen ? "w-100" : "hidden"}`}
            >
              <RecipeDetailCard />
            </div>
            <div
              className={`${!isDetailOpen && isChatOpen ? "w-100" : "hidden"}`}
            >
              <RecipeChatCard />
            </div>
          </div>
        </Modal>
      </div>
      {/* Footer */}
      <GlobalFooter />
    </>
  );
}

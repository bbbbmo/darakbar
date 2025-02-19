import { useState } from "react";
// 컴포넌트
import GlobalNav from "../../components/layout/GlobalNav";
import Modal from "../../components/modal/Modal";
import RecipeViewCard from "./components/modal/RecipeViewCard";
import RecipeDetailCard from "./components/modal/RecipeDetailCard";
import GlobalFooter from "../../components/layout/GlobalFooter";
import useRecipeStore from "./useRecipeStore";
import RecipeChatCard from "./components/modal/RecipeChatCard";
import RecipeCard from "./components/RecipeCard";
import recipes from "./recipes";
import SearchBar from "../../components/SearchBar";

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
      {/* [TODO] 모달창 안닫히는 오류 수정하기, RecipeDetailCard 내용 헤당 카드에 맞게 수정하기 */}
      <div className="wrapper h-full w-full px-15 pt-15">
        <SearchBar />
        {/* 레시피 카드 */}
        <div className="grid justify-center md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((cocktail) => (
            <div className="flex justify-center" onClick={openRecipeModal}>
              <RecipeCard key={cocktail.name} title={cocktail.name} />

              {/* 모달 */}
              <Modal
                key={cocktail.name}
                isOpen={isModalOpen}
                onClose={closeRecipeModal}
              >
                <div className="modal-components-container mt-3 flex h-full w-auto gap-5">
                  <div className="w-200">
                    {/* 모달 좌측 카드 */}
                    <RecipeViewCard />
                  </div>
                  <div
                    className={`${isDetailOpen && !isChatOpen ? "w-100" : "hidden"}`}
                  >
                    {/* 모달 우측 설명 카드 */}
                    <RecipeDetailCard
                      ingredients={cocktail.ingredients}
                      description={cocktail.description}
                      instructions={cocktail.instructions}
                    />
                  </div>
                  <div
                    className={`${!isDetailOpen && isChatOpen ? "w-100" : "hidden"}`}
                  >
                    {/* 모달 우측 채팅 카드 */}
                    <RecipeChatCard />
                  </div>
                </div>
              </Modal>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <GlobalFooter />
    </>
  );
}

import SearchBar from "@components/SearchBar";
import RecipeModal from "@components/Modals/RecipeModal/RecipeModal";
// Zustand

import BasicRecipes from "./_components/BasicRecipes";
import BasicRecipeHeader from "./_components/BasicRecipeHeader";

export default function RecipeNavigation() {
  return (
    <div className="flex w-full flex-col">
      <>
        {/* [TODO] 배경 클릭 시 모달창 안닫히는 오류 수정하기 */}
        <div className="wrapper h-full w-full px-15">
          <BasicRecipeHeader />
          <SearchBar />
          {/* 레시피 카드 */}
          <BasicRecipes />
        </div>
        {/* Recipe Modal */}
        <RecipeModal />
      </>
    </div>
  );
}

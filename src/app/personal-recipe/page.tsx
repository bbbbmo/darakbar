import RecipeModal from "@components/Modals/RecipeModal/RecipeModal";
import PersonalRecipeHeader from "./_components/PersonalRecipeHeader";
import UserRecipes from "./_components/UserRecipes";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  return (
    <>
      <div className="wrapper w-full px-15">
        <PersonalRecipeHeader />
        {/* 레시피 카드 */}
        <UserRecipes />
      </div>
      <RecipeModal />
    </>
  );
}

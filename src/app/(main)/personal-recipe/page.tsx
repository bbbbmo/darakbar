import PersonalRecipeHeader from "./_components/PersonalRecipeHeader";
import UserRecipes from "./_components/UserRecipes";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  return (
    <section className="w-full">
      <PersonalRecipeHeader />
      {/* 레시피 카드 */}
      <UserRecipes />
    </section>
  );
}

// 컴포넌트
import GridList from "@/components/GridList";
import RecipeCard from "@/components/Cards/RecipeCard/RecipeCard";
import RecipeModal from "@/components/Modals/RecipeModal/RecipeModal";
import PersonalRecipeHeader from "./_components/PersonalRecipeHeader";
import {
  UserRecipeWithIngredients,
  useUserRecipe,
} from "./_hooks/useUserRecipe";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  const { readQuery } = useUserRecipe();

  return (
    <>
      <div className="wrapper w-full px-15">
        <PersonalRecipeHeader />
        {/* 레시피 카드 */}
        <GridList items={readQuery.data?.data ?? []}>
          {(recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe as UserRecipeWithIngredients}
              loading={readQuery.isLoading}
            />
          )}
        </GridList>
      </div>
      <RecipeModal />
    </>
  );
}

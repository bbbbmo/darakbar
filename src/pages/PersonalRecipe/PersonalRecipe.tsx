import { useEffect, useState } from "react";
// 컴포넌트
import GridList from "@/components/GridList";
import RecipeCard from "@/components/Cards/RecipeCard/RecipeCard";
import RecipeModal from "@/components/Modals/RecipeModal/RecipeModal";
import useCocktailStore from "@/components/Modals/RecipeModal/recipe-modal.store";
import PersonalRecipeHeader from "./_components/PersonalRecipeHeader";
import { useUserRecipe } from "./_hooks/useUserRecipe";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  const { filteredCocktails, setAllCocktails } = useCocktailStore();
  const [loading, setLoading] = useState(true);
  const { userId } = useCurrentUser();
  const { readQuery } = useUserRecipe(Number(userId));

  // 3) 전역 스토어에 리스트 반영
  useEffect(() => {
    if (readQuery.data) {
      setAllCocktails(readQuery.data.data);
      setLoading(false);
    }
  }, [readQuery.data, setAllCocktails]);
  return (
    <>
      <div className="wrapper w-full px-15">
        <PersonalRecipeHeader />
        {/* 레시피 카드 */}
        <GridList items={filteredCocktails ?? []}>
          {(cocktail) => (
            <RecipeCard
              key={cocktail.id}
              title={cocktail.name || ""}
              image={
                typeof cocktail.image_url === "string"
                  ? cocktail.image_url
                  : null
              }
              cocktail={cocktail}
              loading={loading}
            />
          )}
        </GridList>
      </div>
      <RecipeModal />
    </>
  );
}

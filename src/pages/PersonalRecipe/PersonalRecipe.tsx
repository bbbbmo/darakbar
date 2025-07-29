import { useEffect } from "react";
import supabase from "@/supabase/supabase";
// 컴포넌트
import GridList from "@/components/GridList";
import RecipeCard from "@/components/Cards/RecipeCard/RecipeCard";
import RecipeModal from "@/components/Modals/RecipeModal/RecipeModal";
import useCocktailStore from "@/components/Modals/RecipeModal/recipe-modal.store";
import PersonalRecipeHeader from "./_components/PersonalRecipeHeader";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  const { filteredCocktails, setAllCocktails } = useCocktailStore();

  /** user_cocktails 테이블로부터 유저가 등록한 전체 칵테일 데이터 가져오는 함수 */
  const getUserCocktails = async () => {
    try {
      const { data } = await supabase
        .from("user_cocktails")
        .select(`*, userinfo(name)`) // user_cocktail 테이블의 모든 데이터를 가져오면서, 연관된 userinfo 테이블에서 name 컬럼만 함께 조회
        .order("id", { ascending: true }); // id를 기준으로 오름차순 정렬, 객체 배열 반환
      setAllCocktails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCocktails();
  }, []);
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
            />
          )}
        </GridList>
      </div>
      <RecipeModal />
    </>
  );
}

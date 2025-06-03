import { useEffect, useState } from "react";
import supabase from "../../supabase";
// 컴포넌트
import GlobalNav from "../../components/App/AppNavBar/AppNavBar";
import GlobalFooter from "../../components/App/AppFooter";
import SearchBar from "../../components/SearchBar";
import RecipeCard from "../../components/Cards/RecipeCard";
import LoadingScreen from "../../components/LoadingScreen";
import { RecipeModal } from "../../components/Modals/RecipeModal/RecipeModal";
// Zustand
import useCocktailStore from "../../components/Modals/RecipeModal/recipe-modal.store";
import GridList from "../../components/GridList";

export default function RecipeNavigation() {
  const { filteredCocktails, setAllCocktails } = useCocktailStore();
  const [loading, setLoading] = useState<boolean>(true);

  // 칵테일 데이터 마운트
  useEffect(() => {
    getOriginalCocktails();
  }, []);

  // 칵테일 전체 데이터 가져오는 함수
  const getOriginalCocktails = async () => {
    const { data, error } = await supabase
      .from("cocktails")
      .select()
      .order("id", { ascending: true }); // id를 기준으로 오름차순 정렬, 객체 배열 반환

    if (error) {
      console.log("Error Fetching data", error);
      return;
    } else if (!data) {
      console.log("Miss Fetching data");
    }
    setAllCocktails(data);
    setLoading(false);
  };

  // 모달 여닫기 함수
  // const openRecipeCardModal = (cocktail: Cocktail_T) => {
  //   setClickedCardData(cocktail);
  //   setIsModalOpen(true);
  // };

  // const closeRecipeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="flex w-full flex-col">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Nav 바 */}
          <GlobalNav />
          {/* [TODO] 배경 클릭 시 모달창 안닫히는 오류 수정하기 */}
          <div className="wrapper h-full w-full px-15 pt-15">
            <SearchBar />
            {/* 레시피 카드 */}
            <GridList items={filteredCocktails ?? []}>
              {(cocktail, index) => (
                <RecipeCard
                  key={index}
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
          {/* Footer */}
          <GlobalFooter />
          {/* Recipe Modal */}
          <RecipeModal />
        </>
      )}
    </div>
  );
}

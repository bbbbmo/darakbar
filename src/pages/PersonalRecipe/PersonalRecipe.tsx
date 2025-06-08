import { useEffect } from "react";
import supabase from "../../supabase";
// 컴포넌트
import SearchBar from "../../components/SearchBar";
import RecipeCreateModal from "../../components/Modals/RecipeCreateModal/RecipeCreateModal";
import GridList from "../../components/GridList";
import RecipeCard from "../../components/Cards/RecipeCard/RecipeCard";
import RecipeModal from "../../components/Modals/RecipeModal/RecipeModal";
import useModalStore from "../../components/Modals/modalStore";
import useCocktailStore from "../../components/Modals/RecipeModal/recipe-modal.store";

// 클릭 시 모달 내용 수정해야함
export default function PersonalRecipe() {
  const { filteredCocktails, setAllCocktails } = useCocktailStore();
  const { open } = useModalStore();
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
      <div className="wrapper w-full px-10">
        <div className="mt-10 mb-10 flex w-full flex-col">
          <p className="flex items-center justify-center gap-5 text-xl text-amber-400">
            <span className="text-2xl">
              나만의 칵테일을 만들어 다락바에 보관해 보세요!
            </span>
            <button
              className="btn-secondary sm:w-30 xl:w-50"
              onClick={() => open("create")}
            >
              레시피 등록하기
            </button>
          </p>
        </div>
        <SearchBar />
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

      <RecipeCreateModal />
      <RecipeModal />
    </>
  );
}

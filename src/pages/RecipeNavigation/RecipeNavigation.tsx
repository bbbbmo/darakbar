import { useEffect, useState } from "react";
import { supabase, supabaseUrl } from "../../supabase";
// 컴포넌트
import GlobalNav from "../../components/layout/GlobalNav";
import Modal from "../../components/modal/Modal";
import RecipeViewCard from "./components/modal/RecipeViewCard";
import RecipeDetailCard from "./components/modal/RecipeDetailCard";
import GlobalFooter from "../../components/layout/GlobalFooter";
import SearchBar from "../../components/SearchBar";
import RecipeChatCard from "./components/modal/RecipeChatCard";
import RecipeCard from "./components/RecipeCard";
// 타입
import { Cocktail_T } from "../../types/cocktailTypes";
// Zustand
import useModalStore from "../../stores/modalStore";

export default function RecipeNavigation() {
  const { isDetailOpen, isChatOpen } = useModalStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [originalCocktails, setOriginalCocktails] = useState<
    Cocktail_T[] | null
  >(null);
  const [clickedCardData, setClickedCardData] = useState<Cocktail_T | null>(
    null,
  );

  // 칵테일 데이터 마운트
  useEffect(() => {
    getOriginalCocktails();
  }, []);

  // cocktailsData가 변경될 때마다 콘솔 출력
  useEffect(() => {
    if (originalCocktails) {
      console.log("Cocktails Data:", originalCocktails);
    }
  }, [originalCocktails]);

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
    setOriginalCocktails(data);
  };

  // 모달 여닫기 함수
  const openRecipeModal = (cocktail: Cocktail_T) => {
    setClickedCardData(cocktail);
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
          {originalCocktails &&
            originalCocktails.map((cocktail) => (
              <div
                className="flex justify-center"
                onClick={() => openRecipeModal(cocktail)}
              >
                <RecipeCard
                  key={cocktail.id}
                  title={cocktail.name}
                  image={cocktail.image_url}
                />
              </div>
            ))}
        </div>

        {/* 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeRecipeModal}>
          <div className="modal-components-container mt-3 flex h-full w-auto gap-5">
            <div className="w-200">
              {/* 모달 좌측 카드 */}
              <RecipeViewCard cocktail={clickedCardData} />
            </div>
            <div
              className={`${isDetailOpen && !isChatOpen ? "w-100" : "hidden"}`}
            >
              {/* 모달 우측 설명 카드 */}
              <RecipeDetailCard cocktail={clickedCardData} />
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
      {/* Footer */}
      <GlobalFooter />
    </>
  );
}

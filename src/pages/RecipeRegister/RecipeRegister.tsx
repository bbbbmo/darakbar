import { useEffect, useState } from "react";
import supabase from "../../supabase";
// 컴포넌트
import GlobalFooter from "../../components/layout/GlobalFooter";
import GlobalNav from "../../components/layout/GlobalNav";
import Modal from "../../components/modal/Modal";
import SearchBar from "../../components/SearchBar";
import RecipeRegisterIngredients from "./components/RecipeRegisterModal/RecipeRegisterIngredients";
import RecipeRegisterBasicInfo from "./components/RecipeRegisterModal/RecipeRegisterBasicInfo";
import RecipeRegisterIntroduce from "./components/RecipeRegisterModal/RecipeRegisterIntroduce";
import RecipeRegisterComplete from "./components/RecipeRegisterModal/RecipeRegisterComplete";
import RecipeCard from "../../components/RecipeCard";
import UserRecipePreview from "./components/RecipeCardModal/UserRecipePreview";
import UserRecipeDetail from "./components/RecipeCardModal/UserRecipeDetail";
import RecipeChatCard from "../RecipeNavigation/RecipeCardModal/modal/PreRecipeChat";
// Zustand
import useModalStore from "../../stores/modalStore";
import useCocktailStore from "../../stores/cocktailStore";
import useLoadingStore from "../../stores/loadingStore";
// 타입
import { Cocktail_T } from "../../types/cocktailTypes";

// [TODO] Footer 레이아웃 수정, 클릭 시 모달 내용 수정해야함
export default function RecipeRegister() {
  const { filteredCocktails, setAllCocktails, setClickedCardData } =
    useCocktailStore();
  const { setIsLoading } = useLoadingStore();
  const { isDetailOpen, isChatOpen } = useModalStore(); // 레시피 모달 Open 시 우측 카드의 상태
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState<boolean>(false); // 레시피 모달 Open, Close
  const [isRegisterModalOpen, setIsRegisterModalOpen] = // 레시피 등록 모달 Open, Close
    useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    getUserCocktails();
  }, []);

  /** user_cocktails 테이블로부터 유저가 등록한 전체 칵테일 데이터 가져오는 함수 */
  const getUserCocktails = async () => {
    const { data, error } = await supabase
      .from("user_cocktails")
      .select()
      .order("id", { ascending: true }); // id를 기준으로 오름차순 정렬, 객체 배열 반환

    if (error) {
      console.log("Error Fetching data", error);
      return;
    } else if (!data) {
      console.log("Miss Fetching data");
    }
    setAllCocktails(data);
    setIsLoading(false);
  };

  // 레시피 등록 모달 열기
  const openRegisterModal = () => {
    setCurrentStep(1);
    setIsRegisterModalOpen(true);
  };

  // 레시피 등록 모달 닫기
  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // 레시피 카드 모달 열기
  const openRecipeCardModal = (cocktail: Cocktail_T) => {
    setClickedCardData(cocktail);
    setIsRecipeModalOpen(true);
  };

  // 레시피 카드 모달 닫기
  const closeRecipeModal = () => {
    setIsRecipeModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 현재 step 확인 용
  // useEffect(() => {
  //   console.log(currentStep);
  // }, [currentStep]);
  return (
    <>
      <div className="flex h-screen flex-col">
        {/* Nav 바 */}
        <GlobalNav />
        <div className="wrapper w-full flex-1 px-15 pt-15">
          <div className="mt-10 mb-10 flex w-full flex-col">
            <p className="flex items-center justify-center gap-5 text-xl text-amber-400">
              <span className="text-2xl">
                나만의 칵테일을 만들어 다락바에 보관해 보세요!
              </span>
              <button
                className="btn-secondary sm:w-30 xl:w-50"
                onClick={openRegisterModal}
              >
                레시피 등록하기
              </button>
            </p>
          </div>
          <SearchBar />
          {/* 레시피 카드 */}
          <div className="grid justify-center md:grid-cols-3 xl:grid-cols-4">
            {filteredCocktails &&
              filteredCocktails.map((cocktail) => (
                <div
                  className="flex justify-center"
                  onClick={() => openRecipeCardModal(cocktail)}
                  key={cocktail.id}
                >
                  <RecipeCard
                    title={cocktail.name || ""}
                    image={
                      typeof cocktail.image_url === "string"
                        ? cocktail.image_url
                        : null
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        {/* Footer */}
        <GlobalFooter />
      </div>
      {/* 레시피 등록 모달 */}
      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        {(() => {
          switch (currentStep) {
            case 1:
              return <RecipeRegisterIngredients nextStep={nextStep} />;
            case 2:
              return (
                <RecipeRegisterBasicInfo
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              );
            case 3:
              return (
                <RecipeRegisterIntroduce
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              );
            default:
              return <RecipeRegisterComplete onClose={closeRegisterModal} />;
          }
        })()}
      </Modal>
      {/* 레시피 카드 모달 */}
      <Modal isOpen={isRecipeModalOpen} onClose={closeRecipeModal}>
        <div className="modal-components-container mt-3 flex h-full w-auto gap-5">
          <div className="w-150">
            {/* 모달 좌측 카드 */}
            <UserRecipePreview />
          </div>
          <div
            className={`${isDetailOpen && !isChatOpen ? "w-100" : "hidden"}`}
          >
            {/* 모달 우측 설명 카드 */}
            <UserRecipeDetail />
          </div>
          <div
            className={`${!isDetailOpen && isChatOpen ? "w-100" : "hidden"}`}
          >
            {/* 모달 우측 채팅 카드 */}
            <RecipeChatCard />
          </div>
        </div>
      </Modal>
    </>
  );
}

import { useEffect, useState } from "react";
import supabase from "../../supabase";
// 컴포넌트

import GlobalNav from "../../components/App/AppNavBar/AppNavBar";
import SearchBar from "../../components/SearchBar";
import RecipeRegisterIngredients from "./components/RecipeRegisterModal/RecipeRegisterIngredients";
import RecipeRegisterBasicInfo from "./components/RecipeRegisterModal/RecipeRegisterBasicInfo";
import RecipeRegisterIntroduce from "./components/RecipeRegisterModal/RecipeRegisterIntroduce";
import RecipeRegisterComplete from "./components/RecipeRegisterModal/RecipeRegisterComplete";
import RecipeCard from "../../components/Recipe/RecipeCard";

import useCocktailStore from "../../stores/cocktailStore";
// 타입

import GridList from "../../components/GridList";

// 클릭 시 모달 내용 수정해야함
export default function RecipeRegister() {
  const { filteredCocktails, setAllCocktails } = useCocktailStore();
  // const [loading, setLoading] = useState(true);
  useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    getUserCocktails();
  }, []);

  /** user_cocktails 테이블로부터 유저가 등록한 전체 칵테일 데이터 가져오는 함수 */
  const getUserCocktails = async () => {
    const { data, error } = await supabase
      .from("user_cocktails")
      .select(`*, userinfo(name)`) // user_cocktail 테이블의 모든 데이터를 가져오면서, 연관된 userinfo 테이블에서 name 컬럼만 함께 조회
      .order("id", { ascending: true }); // id를 기준으로 오름차순 정렬, 객체 배열 반환

    if (error) {
      console.log("Error Fetching data", error);
      return;
    } else if (!data) {
      console.log("Miss Fetching data");
    }
    setAllCocktails(data);
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
              <button className="btn-secondary sm:w-30 xl:w-50">
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
              />
            )}
          </GridList>
        </div>
        {/* Footer */}
      </div>

      {/* 레시피 등록 모달 */}

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
            return <RecipeRegisterComplete />;
        }
      })()}
    </>
  );
}

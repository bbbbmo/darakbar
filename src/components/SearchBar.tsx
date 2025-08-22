import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import useCocktailStore from "./Modals/RecipeModal/recipe-modal.store";
import { Button, TextInput } from "flowbite-react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { allCocktails, setFilteredCocktails } = useCocktailStore();

  // 버튼 클릭 시
  const onClickSearchBtn = (): void => {
    // 사용자 입력이 있다면 -> 검색된 데이터를 store에 전달
    console.log("사용자 입력 발생!");
    if (inputRef.current) {
      const cocktailNameOrIngredients = inputRef.current.value.trim();
      // 사용자 입력이 없다면 전체 데이터를 필터링
      if (cocktailNameOrIngredients === "") {
        setFilteredCocktails(allCocktails); // 전체 데이터를 설정
      } else {
        // 사용자가 입력한 값으로 필터링
        filterCocktails(cocktailNameOrIngredients);
        inputRef.current.value = "";
      }
    }
  };

  /** 사용자가 입력한 값을 부모 컴포넌트에서 받아온 칵테일 데이터와 비교 */
  const filterCocktails = (cocktailNameOrIngredients: string): void => {
    const filteredData = allCocktails?.filter((cocktail) => {
      return (
        cocktail?.name
          .toLowerCase()
          .includes(cocktailNameOrIngredients.toLowerCase()) ||
        cocktail.ingredients
          .join(" ")
          .toLowerCase()
          .includes(cocktailNameOrIngredients.toLowerCase())
      );
    });
    // 입력 값이 있고 일치하는 값 있으면 -> 해당 데이터 반환
    if (filteredData && filteredData?.length > 0) {
      setFilteredCocktails(filteredData);
      console.log("검색 결과 : ", filteredData);
    } else {
      // 입력 값이 있는데 일치하는 값이 없으면 null 반환?
      setFilteredCocktails(null);
      console.log("검색 결과 없음");
    }
  };
  return (
    <div className="flex justify-center gap-3">
      <TextInput
        ref={inputRef}
        type="text"
        icon={MagnifyingGlassIcon}
        placeholder="이름 또는 재료 검색"
      />
      <Button
        className="btn-primary flex w-20 items-center justify-center gap-1 rounded-xl font-bold"
        onClick={onClickSearchBtn}
      >
        검색
      </Button>
    </div>
  );
}

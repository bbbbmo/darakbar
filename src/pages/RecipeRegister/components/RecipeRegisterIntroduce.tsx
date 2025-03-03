import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import useRegisterStore from "../registerStore";
import React from "react";
import supabase from "../../../supabase";

interface RecipeRegisterIntroduceProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterIntroduce({
  nextStep,
  prevStep,
}: RecipeRegisterIntroduceProps) {
  const {
    baseLiquor,
    ingredients,
    name,
    glassType,
    instructions,
    description,
    setInstructions,
    setDescription,
  } = useRegisterStore();

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInstructions(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
  };

  // [TODO] 이미지도 추가, 재료와 재료 단위 합치기
  /** 유저가 입력한 값을 supabase 데이터 테이블에 삽입 */
  const uploadNewCocktail = async () => {
    if (
      !name ||
      !baseLiquor ||
      !ingredients.length ||
      !instructions ||
      !description
    ) {
      alert("모든 항목을 작성해주세요!");
    }

    const { data, error } = await supabase.from("user_cocktails").insert([
      {
        name: name,
        base_liquor: baseLiquor,
        ingredients: ingredients,
        glass_type: glassType,
        instructions: instructions,
        description: description,
      },
    ]);
    if (error) {
      console.error("칵테일 등록 중 오류 발생:", error.message);
      alert("칵테일 등록에 실패했습니다.");
    } else {
      console.log("칵테일 등록 성공:", data);
      alert("칵테일 등록이 완료되었습니다!");
      nextStep(); // 다음 단계로 진행
    }
  };
  return (
    <>
      <form
        className="register-container flex h-full min-w-100 flex-col pb-5"
        onSubmit={handleSubmit}
      >
        <p className="mt-2 mb-5 text-lg">
          <span>만들어진 나만의 칵테일 제조법을 설명해 주세요!</span>
        </p>
        <div className="flex grow flex-col gap-3 overflow-y-auto rounded-lg bg-slate-100 p-2 text-stone-700">
          <label htmlFor="" className="font-bold">
            제조법
          </label>
          <textarea
            value={instructions}
            placeholder="ex) 1. 라임과 레몬을 반으로 슬라이스 한다."
            className="h-full rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
            onChange={handleInstructionsChange}
          />
        </div>
        <p className="mt-2 mb-5 text-lg">
          <span>전체적인 맛과 향을 설명해 주세요🤔</span>
        </p>
        <div className="flex grow flex-col gap-3 overflow-y-auto rounded-lg bg-slate-100 p-2 text-stone-700">
          <label htmlFor="" className="font-bold">
            맛과 향 설명
          </label>
          <textarea
            value={description}
            placeholder="ex) 열대과일의 상큼한 맛과 오렌지 향"
            className="h-full rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
            onChange={handleDescriptionChange}
          />
        </div>
      </form>
      <div className="footer mt-auto flex w-full justify-between">
        <button
          className="flex items-center gap-1 hover:text-amber-400"
          onClick={prevStep}
        >
          <ArrowLeftIcon className="size-4" /> 이전 단계로
        </button>
        <button
          className="mt-auto flex items-center gap-1 hover:text-amber-400"
          onClick={uploadNewCocktail}
        >
          칵테일 등록하기 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

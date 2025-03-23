import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import useRegisterStore from "../../registerStore";
import React from "react";
import supabase from "../../../../supabase";
import { Cocktail_T } from "../../../../types/cocktailTypes";
import useAuth from "../../../../hooks/useAuth";

interface RecipeRegisterIntroduceProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterIntroduce({
  nextStep,
  prevStep,
}: RecipeRegisterIntroduceProps) {
  // useRegisterStore에서 상태 불러옴
  const {
    baseLiquor,
    baseLiquorAmount,
    baseLiquorUnit,
    ingredients,
    ingredientAmounts,
    ingredientUnits,
    name,
    image,
    glassType,
    instructions,
    description,
    setBaseLiquor,
    setBaseLiquorAmount,
    setBaseLiquorUnit,
    setIngredients,
    setInstructions,
    setIngredientAmounts,
    setIngredientUnits,
    setName,
    setImage,
    setImagePreview,
    setDescription,
    setGlassType,
  } = useRegisterStore();
  const { session } = useAuth();
  const filePath = `user_cocktail_image/${image?.name}`; // 파일 경로 설정 (예: images/파일이름)

  // 제조법 입력 이벤트 함수
  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInstructions(e.target.value);
  };

  // 설명 입력 이벤트 함수
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  // 폼 기본 제출 방지
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  /** 사용자가 첫번째 페이지에서 입력한 값을 하나의 문자열(베이스 + 용량 + 단위, 재료 + 용량 + 단위)로 합치는 함수 */
  const mergeInputElements = (): void => {
    if (baseLiquor && ingredients) {
      const fullBaseLiquor = `${baseLiquor} ${baseLiquorAmount}${baseLiquorUnit}`;
      const fullIngredients = ingredients.map((ingredient, index) => {
        return `${ingredient} ${ingredientAmounts[index]}${ingredientUnits[index]}`;
      });
      setBaseLiquor(fullBaseLiquor);
      setIngredients(fullIngredients);
      console.log(fullIngredients);
    }
  };

  /** 이미지 Storage에 업로드 후 해당 이미지 URL 반환하는 함수 */
  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    // 비동기 함수는 항상 Promise 반환
    const { error } = await supabase.storage
      .from("darakbar-storage") // 'images'는 저장소 버킷 이름
      .upload(filePath, file, {
        cacheControl: "3600", // 파일 캐시 시간 (초 단위)
        upsert: true, // 파일이 이미 존재하면 덮어쓰도록 설정
      });

    if (error) {
      console.error("Error uploading file:", error);
      alert("파일 업로드에 실패했습니다.");
      return null;
    }

    // 업로드가 성공하면, 파일의 URL을 반환
    const { data } = await supabase.storage
      .from("darakbar-storage")
      .getPublicUrl(filePath);

    if (data.publicUrl === undefined) {
      return null;
    } else {
      console.log("File uploaded successfully:", data.publicUrl);
      return data.publicUrl;
    }
  };

  /** 유저가 입력한 값을 supabase 데이터 테이블에 삽입 */
  const uploadNewUserCocktail = async () => {
    if (
      !name ||
      !baseLiquor ||
      !ingredients?.length ||
      !instructions ||
      !description
    ) {
      alert(
        "필수 항목(베이스 + 최소 하나의 재료, 이름, 제조법, 맛과 향)을 작성해주세요!",
      );
      return;
    }

    // 재료명, 단위, 용량 합치기
    mergeInputElements();

    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImageToStorage(image); // 유저가 이미지 삽입했다면 해당 이미지 업로드, 이때 state는 비동기적이므로 state 업데이트 전 데이터베이스에 삽입해버림
    }

    const userCocktail: Cocktail_T = {
      name: name,
      base_liquor: baseLiquor,
      ingredients: ingredients,
      glass_type: glassType,
      instructions: instructions,
      description: description,
      image_url: imageUrl,
      user_id: session?.user.id,
    };

    const { data, error } = await supabase
      .from("user_cocktails")
      .insert([userCocktail]);

    console.log(userCocktail);

    if (error) {
      console.error("칵테일 등록 중 오류 발생:", error.message);
      alert("칵테일 등록에 실패했습니다.");
      return;
    } else {
      console.log("칵테일 등록 성공:", data);
      alert("칵테일 등록이 완료되었습니다!");
      setBaseLiquor(null);
      setBaseLiquorAmount(null);
      setBaseLiquorUnit(null);
      setIngredients([]);
      setIngredientAmounts([]);
      setIngredientUnits([]);
      setName(null);
      setImage(null);
      setImagePreview(null);
      setInstructions(null);
      setDescription(null);
      setGlassType(null);
      nextStep(); // 다음 단계로 진행
    }
  };

  /** 입력 잘 제출되는지 확인용 */
  // const check = () => {
  //   console.log(`
  //     베이스: ${baseLiquor},
  //     재료: ${ingredients},
  //     이름: ${name},
  //     이미지: ${image},
  //     잔: ${glassType},
  //     제조법: ${instructions},
  //     설명: ${description}
  //    `);
  // };
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
            value={instructions || ""}
            placeholder="ex) 1. 라임과 레몬을 반으로 슬라이스 한다."
            className="h-full rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
            required
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
            value={description || ""}
            placeholder="ex) 열대과일의 상큼한 맛과 오렌지 향"
            className="h-full rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
            required
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
          onClick={uploadNewUserCocktail}
        >
          칵테일 등록하기 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

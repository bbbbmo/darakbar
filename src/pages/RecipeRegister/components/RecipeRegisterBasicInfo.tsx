import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import useRegisterStore from "../registerStore";

interface RecipeRegisterBasicInfoProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterBasicInfo({
  nextStep,
  prevStep,
}: RecipeRegisterBasicInfoProps) {
  const { name, glassType, setImage, setName, setGlassType } =
    useRegisterStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGlassTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlassType(e.target.value);
  };

  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      return;
    }
    alert("잘못된 파일입니다.");
  };

  /** 이미지를 클릭하면 file 선택 창이 나타나게 함 */
  const onClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // input의 click() 메서드를 호출하여 파일 선택 창 열기
    }
  };

  return (
    <>
      <form className="register-container min-w-100" onSubmit={handleSubmit}>
        <p className="mt-2 mb-5 text-lg">
          <span>나만의 칵테일의 이름과 사진을 올려주세요!</span>
        </p>
        <div className="flex max-h-100 flex-col gap-5 text-stone-700">
          {/* 칵테일 이미지 입력 */}
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              나만의 칵테일 이름
            </label>
            <input
              type="text"
              value={name}
              placeholder="ex) 초코 바나나 펀치, 레인보우 샤베트 등"
              className="input-primary h-10 grow"
              required
              onChange={handleNameChange}
            />
          </div>
          {/* 칵테일 이미지 입력 */}
          <div className="image-container flex w-full justify-center">
            <img
              className="w-full rounded-lg bg-zinc-300 md:h-56 xl:h-64"
              alt="Choose your cocktail image"
              onClick={onClickImage}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={updateImage}
            />
          </div>
          {/* 칵테일 잔 유형 입력 */}
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              잔 유형 (선택)
            </label>
            <input
              type="text"
              value={glassType}
              placeholder="ex) 허리케인 글라스, 칵테일 글라스 등"
              className="input-primary h-10 grow"
              required
              onChange={handleGlassTypeChange}
            />
          </div>
        </div>
      </form>
      {/* 하단 버튼 */}
      <div className="footer mt-auto flex w-full justify-between">
        <button
          className="flex items-center gap-1 hover:text-amber-400"
          onClick={prevStep}
        >
          <ArrowLeftIcon className="size-4" /> 이전 단계로
        </button>
        <button
          className="flex items-center gap-1 hover:text-amber-400"
          onClick={nextStep}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";

interface RecipeRegisterBasicInfoProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterBasicInfo({
  nextStep,
  prevStep,
}: RecipeRegisterBasicInfoProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      return;
    }
  };

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
          <div className="image-container flex w-full justify-center">
            <img
              className="rounded-lg bg-zinc-300 md:h-56 md:w-56 xl:h-64 xl:w-80"
              onClick={onClickImage}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={updateImage}
            />
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              나만의 칵테일 이름
            </label>
            <input
              type="text"
              placeholder="ex) 초코 바나나 펀치, 레인보우 샤베트 등"
              className="h-10 grow rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
              required
            />
          </div>
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
          className="flex items-center gap-1 hover:text-amber-400"
          onClick={nextStep}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

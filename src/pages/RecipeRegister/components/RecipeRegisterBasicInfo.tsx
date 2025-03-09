import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
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
  const {
    name,
    image,
    imagePreview,
    glassType,
    setName,
    setImage,
    setImagePreview,
    setGlassType,
  } = useRegisterStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이름 입력 이벤트 함수
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 잔 유형 입력 이벤트 함수
  const handleGlassTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlassType(e.target.value);
  };

  /** 이미지를 클릭하면 file 선택 창이 나타나게 함 */
  const onClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // input의 click() 메서드를 호출하여 파일 선택 창 열기
    }
  };

  /** 파일 유형과 용량을 확인하고 저장하는 함수 */
  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 유형 체크 (이미지 파일인지 확인)
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 체크 (1MB 이하), 1MB = 1024KB = 1024 * 1024 Bytes
      if (file.size > 1024 * 1024) {
        alert("파일 크기는 1MB를 넘을 수 없습니다.");
        return;
      }
      // 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 파일을 읽은 후 미리보기 이미지로 설정
      };
      reader.readAsDataURL(file); // 파일을 base64로 읽어들임
      setImage(file); // 상태에 이미지 파일 저장
    } else {
      alert("잘못된 파일입니다.");
    }
  };

  // 폼 기본 제출 방지
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
  };

  /** 입력 잘 저장되는지 확인용 */
  const check = () => {
    console.log(`
      칵테일 이름: ${name},
      이미지: ${image},
      이미지 미리보기: ${imagePreview},
      잔: ${glassType}
     `);
  };
  return (
    <>
      <form className="register-container min-w-100" onSubmit={handleSubmit}>
        <p className="mt-2 mb-5 text-lg">
          <span>나만의 칵테일의 이름과 사진을 올려주세요!</span>
        </p>
        <div className="flex max-h-100 flex-col gap-5 text-stone-700">
          {/* 칵테일 이름 입력 */}
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              나만의 칵테일 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name || ""}
              placeholder="ex) 초코 바나나 펀치, 레인보우 샤베트 등"
              className="input-primary h-10 grow"
              required
              onChange={handleNameChange}
            />
          </div>

          {/* 칵테일 이미지 입력 */}
          <div
            className="image-container relative flex w-full justify-center"
            onClick={onClickImage}
          >
            {!imagePreview && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-xl whitespace-nowrap text-gray-500">
                <div className="flex items-center gap-2">
                  <ArrowUpTrayIcon className="size-6" />
                  이미지를 클릭하여 업로드
                </div>
              </span>
            )}
            {/* 이미지 미리보기 */}
            {imagePreview ? (
              <img
                className="w-full rounded-lg bg-zinc-300 md:h-56 xl:h-64"
                alt="Uploaded preview"
                src={imagePreview} // 미리보기 이미지를 화면에 표시
                onClick={onClickImage}
              />
            ) : (
              <div className="w-full rounded-lg bg-zinc-300 md:h-56 xl:h-64">
                {/* 기본 스타일을 추가 */}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={updateImage}
            />
          </div>

          {/* 칵테일 잔 유형 입력 */}
          <p className="text-lg text-white">
            <span>나만의 칵테일에 꼭 필요한 잔🍷이 있을까요?</span>
          </p>
          <div className="flex flex-col gap-3 rounded-lg bg-slate-100 p-2">
            <label htmlFor="" className="font-bold">
              잔 유형 (선택)
            </label>
            <input
              type="text"
              value={glassType || ""}
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
          onClick={() => {
            check();
            nextStep();
          }}
        >
          다음 단계로 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

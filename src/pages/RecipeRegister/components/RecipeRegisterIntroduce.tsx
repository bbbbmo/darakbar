import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface RecipeRegisterIntroduceProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterIntroduce({
  nextStep,
  prevStep,
}: RecipeRegisterIntroduceProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
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
            placeholder="ex) 1. 라임과 레몬을 반으로 슬라이스 한다."
            className="h-full rounded-sm border-2 pl-2 focus:outline focus:outline-stone-800"
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
          onClick={nextStep}
        >
          칵테일 등록하기 <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}

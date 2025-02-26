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
      <form className="register-container" onSubmit={handleSubmit}>
        <p>
          <span>만들어진 나만의 칵테일 제조법을 설명해 주세요!</span>
        </p>
        <div>
          <label htmlFor="">베이스(주재료)</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">재료 1</label>
          <input type="text" />
        </div>
        <button>+</button>
      </form>
      <div className="footer flex w-full justify-between">
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

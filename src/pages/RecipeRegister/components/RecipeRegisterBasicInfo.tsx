import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface RecipeRegisterBasicInfoProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function RecipeRegisterBasicInfo({
  nextStep,
  prevStep,
}: RecipeRegisterBasicInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 막기
  };

  return (
    <form className="register-container" onSubmit={handleSubmit}>
      <p>
        <span>만들어진 칵테일의 이름과 사진을 올려주세요!</span>
      </p>
      <div>
        <img />
        <input />
      </div>
      <div>
        <label htmlFor="">재료 1</label>
        <input type="text" />
      </div>
      <button>+</button>
      <div className="footer flex w-full justify-between">
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
    </form>
  );
}

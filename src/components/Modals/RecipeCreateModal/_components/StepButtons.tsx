import { Button } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type StepButtonsProps = {
  currentStep: number;
  maxStep: number;
  prevStep: () => void;
  submitHandler: () => void;
};

export default function StepButtons({
  currentStep,
  maxStep,
  prevStep,
  submitHandler,
}: StepButtonsProps) {
  // TODO: 확인하러 가기 버튼 클릭 시 페이지 새로고침, 더 좋은 방안이 있다면 변경하자
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      {currentStep > 0 && currentStep < maxStep ? (
        <Button color="gray" onClick={prevStep} className="flex gap-1">
          <ArrowLeftIcon className="size-4" /> 이전 단계
        </Button>
      ) : (
        <div></div>
      )}

      {currentStep === maxStep ? (
        <Button onClick={reloadPage} className="flex gap-1">
          확인하러 가기
        </Button>
      ) : (
        <Button color="gray" onClick={submitHandler} className="flex gap-1">
          다음 단계 <ArrowRightIcon className="size-4" />
        </Button>
      )}
    </>
  );
}

import { Button } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FunnelStep } from "./create-form.const";

type StepButtonsProps = {
  currentStep: FunnelStep;
  handlePrevStep: () => void;
  submitHandler: () => void;
};

export default function StepButtons({
  currentStep,
  handlePrevStep,
  submitHandler,
}: StepButtonsProps) {
  // TODO: 확인하러 가기 버튼 클릭 시 페이지 새로고침, 더 좋은 방안이 있다면 변경하자
  // const reloadPage = () => {
  //   window.location.reload();
  // };
  return (
    <>
      <Button color="gray" onClick={handlePrevStep} className="flex gap-1">
        <ArrowLeftIcon className="size-4" /> {currentStep.prevText}
      </Button>

      <Button color="gray" onClick={submitHandler} className="flex gap-1">
        {currentStep.nextText} <ArrowRightIcon className="size-4" />
      </Button>
    </>
  );
}

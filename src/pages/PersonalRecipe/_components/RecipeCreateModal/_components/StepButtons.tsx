import { Button, ThemeProvider } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FunnelStep } from "../RecipeCreateModal.const";
import { buttonTheme } from "@/flowbite/themes/button.theme";

type StepButtonsProps = {
  currentStep: FunnelStep;
  handlePrevStep: () => void;
  handleNextStep: () => void;
};

export default function StepButtons({
  currentStep,
  handlePrevStep,
  handleNextStep,
}: StepButtonsProps) {
  // TODO: 확인하러 가기 버튼 클릭 시 페이지 새로고침, 더 좋은 방안이 있다면 변경하자
  // const reloadPage = () => {
  //   window.location.reload();
  // };
  return (
    <ThemeProvider theme={buttonTheme}>
      <Button
        theme={buttonTheme.button}
        onClick={handlePrevStep}
        className="flex gap-1"
      >
        <ArrowLeftIcon className="size-4" /> {currentStep.prevText}
      </Button>

      <Button
        theme={buttonTheme.button}
        onClick={handleNextStep}
        className="flex gap-1"
      >
        {currentStep.nextText} <ArrowRightIcon className="size-4" />
      </Button>
    </ThemeProvider>
  );
}

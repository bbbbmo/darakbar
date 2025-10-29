import { Button } from "flowbite-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FunnelStep } from "../RecipeCreateModal.const";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

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
  return (
    <>
      {currentStep.prevText ? (
        <Button
          theme={basicTheme.button}
          onClick={handlePrevStep}
          className="flex gap-1"
        >
          <ArrowLeftIcon className="size-4" /> {currentStep.prevText}
        </Button>
      ) : (
        <div></div>
      )}

      <Button
        theme={basicTheme.button}
        onClick={handleNextStep}
        className="flex gap-1"
      >
        {currentStep.nextText} <ArrowRightIcon className="size-4" />
      </Button>
    </>
  );
}

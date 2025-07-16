import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "flowbite-react";
import useModalStore from "../../../../components/Modals/modalStore";
import { useEffect, useState } from "react";
import StepButtons from "./_components/StepButtons";
import useFunnelStep from "./hooks/useFunnelStep";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const { currentStep, maxStep, stepIndex, handleNextStep, handlePrevStep } =
    useFunnelStep();
  const [progress, setProgress] = useState<number>(0);
  const [submitHandler, setSubmitHandler] = useState<() => void>(
    () => () => {},
  );

  useEffect(() => {
    setProgress(Math.round(((stepIndex + 1) / maxStep) * 100));
  }, [stepIndex]);
  return (
    <Modal show={modals.create} onClose={() => close("create")} size="2xl">
      <ModalHeader className="w-full">칵테일 등록하기</ModalHeader>
      <ModalBody>
        <currentStep.component
          onNext={handleNextStep}
          setSubmitHandler={setSubmitHandler}
        />
      </ModalBody>
      <Progress
        progress={progress}
        className="my-2"
        size="sm"
        textLabel="진행률"
      />
      <ModalFooter className="flex justify-between">
        <StepButtons
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          submitHandler={submitHandler}
        />
      </ModalFooter>
    </Modal>
  );
}

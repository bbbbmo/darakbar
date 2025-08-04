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
import useFunnelStep from "./_hooks/useFunnelStep";

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
      <ModalHeader className="bg-primary w-full">칵테일 등록하기</ModalHeader>
      <ModalBody className="bg-primary">
        <currentStep.component
          onNext={handleNextStep}
          setSubmitHandler={setSubmitHandler}
        />
      </ModalBody>
      <Progress
        progress={progress}
        color="yellow"
        className="bg-primary"
        size="sm"
        textLabel="진행률"
      />
      <ModalFooter className="bg-primary">
        <div className="flex w-full justify-between">
          <StepButtons
            currentStep={currentStep}
            handlePrevStep={handlePrevStep}
            submitHandler={submitHandler}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
}

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "flowbite-react";
import useModalStore from "../modalStore";
import IngredientForm from "./_components/IngredientForm";
import BasicInfoForm from "./_components/BasicInfoForm";
import DescriptionForm from "./_components/DescriptionForm";
import { useEffect, useState } from "react";
import SuccessCreate from "./_components/SuccessCreate";
import StepButtons from "./_components/StepButtons";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [submitHandler, setSubmitHandler] = useState<() => void>(
    () => () => {},
  );
  const nextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    // NOTE: Reconciliation 처리를 위해 key 추가
    <IngredientForm
      key="ingredient"
      onNext={nextStep}
      setSubmitHandler={setSubmitHandler}
    />,
    <BasicInfoForm
      key="basicInfo"
      onNext={nextStep}
      setSubmitHandler={setSubmitHandler}
    />,
    <DescriptionForm
      key="description"
      onNext={nextStep}
      setSubmitHandler={setSubmitHandler}
    />,
    <SuccessCreate key="success" />,
  ];
  const maxStep = steps.length - 1;

  useEffect(() => {
    setProgress(Math.round(((currentStep + 1) / steps.length) * 100));
  }, [currentStep]);
  return (
    <Modal show={modals.create} onClose={() => close("create")} size="2xl">
      <ModalHeader className="w-full">칵테일 등록하기</ModalHeader>
      <ModalBody>{steps[currentStep]}</ModalBody>
      <Progress
        progress={progress}
        className="my-2"
        size="sm"
        textLabel="진행률"
      />
      <ModalFooter className="flex justify-between">
        <StepButtons
          currentStep={currentStep}
          maxStep={maxStep}
          prevStep={prevStep}
          submitHandler={submitHandler}
        />
      </ModalFooter>
    </Modal>
  );
}

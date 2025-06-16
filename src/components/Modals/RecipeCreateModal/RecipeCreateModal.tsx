import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ArrowRightIcon,
  ArrowLeftIcon,
  Progress,
} from "flowbite-react";
import useModalStore from "../modalStore";
import IngredientForm from "./_components/IngredientForm";
import BasicInfoForm from "./_components/BasicInfoForm";
import DescriptionForm from "./_components/DescriptionForm";
import { useEffect, useState } from "react";
import SuccessCreate from "./_components/SuccessCreate";

const steps = [
  // NOTE: Reconciliation 처리를 위해 key 추가
  <IngredientForm key="ingredient" />,
  <BasicInfoForm key="basicInfo" />,
  <DescriptionForm key="description" />,
  <SuccessCreate key="success" />,
];

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
        <Button color="gray" onClick={prevStep} className="flex gap-1">
          <ArrowLeftIcon className="size-4" /> 이전 단계
        </Button>
        <Button color="gray" onClick={nextStep} className="flex gap-1">
          다음 단계 <ArrowRightIcon className="size-4" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

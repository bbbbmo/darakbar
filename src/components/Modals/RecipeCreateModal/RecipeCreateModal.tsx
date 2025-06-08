import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";
import useModalStore from "../modalStore";
import IngredientForm from "./_components/IngredientForm";
import BasicInfoForm from "./_components/BasicInfoForm";
import DescriptionForm from "./_components/DescriptionForm";
import { useState } from "react";
import SuccessCreate from "./_components/SuccessCreate";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <Modal show={modals.create} onClose={() => close("create")} size="2xl">
      <ModalHeader>칵테일 등록하기</ModalHeader>
      <ModalBody>
        {(() => {
          switch (currentStep) {
            case 1:
              return <IngredientForm />;
            case 2:
              return <BasicInfoForm />;
            case 3:
              return <DescriptionForm />;
            default:
              return <SuccessCreate />;
          }
        })()}
      </ModalBody>
      <ModalFooter className="flex justify-between">
        <Button color="gray" onClick={prevStep}>
          이전 단계
        </Button>
        <Button color="gray" onClick={nextStep}>
          다음 단계
        </Button>
      </ModalFooter>
    </Modal>
  );
}

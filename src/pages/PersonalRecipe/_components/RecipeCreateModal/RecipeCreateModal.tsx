import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "flowbite-react";
import useModalStore from "@/components/Modals/modalStore";
import { useEffect, useState } from "react";
import StepButtons from "./_components/StepButtons";
import useFunnelStep from "./_hooks/useFunnelStep";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateRecipeForm,
  CreateRecipeFormSchema,
} from "./RecipeCreateModal.schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserRecipe } from "./_hooks/useCreateUserRecipe";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [progress, setProgress] = useState<number>(0);
  const {
    currentStep,
    Step,
    maxStep,
    stepIndex,
    handleNextStep,
    handlePrevStep,
  } = useFunnelStep();
  const { mutate } = useCreateUserRecipe();

  const methods = useForm<CreateRecipeForm>({
    resolver: zodResolver(CreateRecipeFormSchema),
    mode: "onSubmit", // 필요시 "onChange" / "onBlur"
    shouldUnregister: false, // 스텝 UI 전환 시 값 유지
  });

  const createUserRecipe = () => {
    const finalData = methods.getValues();
    mutate(finalData);
  };

  const onClickNext = async () => {
    // 마지막이면 제출
    if (currentStep.isFinal) {
      methods.handleSubmit(createUserRecipe)();
      return;
    }
    // 현재 스텝 필드만 부분 검증
    const ok = await methods.trigger(currentStep.fieldsToValidate, {
      shouldFocus: true,
    });
    if (ok) handleNextStep();
  };

  useEffect(() => {
    setProgress(Math.round(((stepIndex + 1) / maxStep) * 100));
  }, [stepIndex]);
  return (
    <Modal show={modals.create} onClose={() => close("create")} size="2xl">
      <ModalHeader className="bg-primary w-full">칵테일 등록하기</ModalHeader>
      <ModalBody className="bg-primary">
        <FormProvider {...methods}>
          <form>
            <Step />
          </form>
        </FormProvider>
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
            handleNextStep={onClickNext}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
}

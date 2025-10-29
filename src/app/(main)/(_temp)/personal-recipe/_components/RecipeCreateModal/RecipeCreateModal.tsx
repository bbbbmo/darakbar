"use client";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "flowbite-react";
import useModalStore from "@components/Modals/modalStore";
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
import { emptyIngredient, funnelSteps } from "./RecipeCreateModal.const";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [progress, setProgress] = useState<number>(0);
  const { currentStep, maxStep, stepIndex, handleNextStep, handlePrevStep } =
    useFunnelStep();
  const { mutate } = useCreateUserRecipe();

  const methods = useForm<CreateRecipeForm>({
    resolver: zodResolver(CreateRecipeFormSchema),
    mode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      ingredients: [
        { ...emptyIngredient, is_base_liquor: true },
        emptyIngredient,
      ],
    },
  });

  const createUserRecipe = () => {
    const finalData = methods.getValues();
    mutate(finalData);
  };

  const onClickNext = async () => {
    // 현재 스텝 필드만 부분 검증
    const ok = await methods.trigger(currentStep.fieldsToValidate, {
      shouldFocus: true,
    });
    if (ok) handleNextStep();
    // 마지막이면 제출
    if (currentStep === funnelSteps.설명입력) {
      methods.handleSubmit(createUserRecipe)();
      methods.reset();
    }

    if (currentStep === funnelSteps.레시피등록완료) {
      close("create");
    }
  };

  useEffect(() => {
    setProgress(Math.round(((stepIndex + 1) / maxStep) * 100));
  }, [stepIndex]);
  return (
    <Modal
      show={modals.create}
      theme={basicTheme.modal}
      size="2xl"
      onClose={() => close("create")}
    >
      <ModalHeader className="bg-primary w-full text-gray-300">
        칵테일 등록하기
      </ModalHeader>
      <ModalBody className="bg-primary">
        <FormProvider {...methods}>
          <form>
            <currentStep.component />
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

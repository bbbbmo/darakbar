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
import supabase from "@/supabase/supabase";
import { uploadToStorage } from "@/supabase/api/storage";
import { getCurrentUser } from "@/supabase/api/user";
import { useQueryClient } from "@tanstack/react-query";

export default function RecipeCreateModal() {
  const { modals, close } = useModalStore();
  const [progress, setProgress] = useState<number>(0);
  const { currentStep, maxStep, stepIndex, handleNextStep, handlePrevStep } =
    useFunnelStep();
  const queryClient = useQueryClient();

  const methods = useForm<CreateRecipeForm>({
    resolver: zodResolver(CreateRecipeFormSchema),
    mode: "onSubmit", // 필요시 "onChange" / "onBlur"
    shouldUnregister: false, // 스텝 UI 전환 시 값 유지
  });

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

  const createUserRecipe = async () => {
    try {
      const finalData = methods.getValues();
      const user = await getCurrentUser();
      let path: string | null = null;
      if (finalData.image) {
        const filePath = `${user?.user?.id}/cocktail/${finalData.image.name}`;
        const { path: uploadedPath } = await uploadToStorage(
          finalData.image,
          filePath,
        );
        path = uploadedPath ?? null;
      }
      await supabase
        .from("recipes")
        .insert({
          name: finalData.name,
          image_url: path,
          user_id: user?.user?.id,
          base_liquor: finalData.baseLiquor.name,
          ingredients: finalData.ingredients.map(
            (ingredient) => ingredient.name,
          ),
          instructions: finalData.instructions,
          description: finalData.description,
          glass_type: finalData.glassType,
          is_user_recipe: true, // 사용자 생성 레시피
        } as unknown as CreateRecipeForm)
        .select();

      console.log(finalData);
      queryClient.invalidateQueries({ queryKey: ["user-recipe"] });
    } catch (error) {
      console.error("레시피 등록 실패", error);
      alert("레시피 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    setProgress(Math.round(((stepIndex + 1) / maxStep) * 100));
  }, [stepIndex]);
  return (
    <Modal show={modals.create} onClose={() => close("create")} size="2xl">
      <ModalHeader className="bg-primary w-full">칵테일 등록하기</ModalHeader>
      <ModalBody className="bg-primary">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(createUserRecipe)}>
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

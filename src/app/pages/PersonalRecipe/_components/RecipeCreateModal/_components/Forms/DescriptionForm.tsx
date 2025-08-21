import { Textarea } from "flowbite-react";
import FormItem from "@/app/components/Forms/FormItem";
import FormDescription from "@/app/components/Forms/FormDescription";
import { useFormContext } from "react-hook-form";
import { CreateRecipeForm } from "../../RecipeCreateModal.schemes";
import FormErrorMessage from "@/app/components/Forms/FormErrorMessage";

export default function DescriptionForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeForm>();

  return (
    <>
      <FormDescription>
        만들어진 나만의 칵테일 제조법과 전반적인 맛, 향을 설명해 주세요🤔
      </FormDescription>
      <div className="flex flex-col gap-2">
        <FormItem label="제조법" required>
          <Textarea
            placeholder="ex) 1. 라임과 레몬을 반으로 슬라이스 한다."
            {...register("instructions")}
            aria-invalid={!!errors.instructions}
          />
          <FormErrorMessage error={errors.instructions} />
        </FormItem>
        <FormItem label="맛과 향 설명">
          <Textarea
            placeholder="ex) 열대과일의 상큼한 맛과 오렌지 향"
            {...register("description")}
            aria-invalid={!!errors.description}
          />
          <FormErrorMessage error={errors.description} />
        </FormItem>
      </div>
    </>
  );
}

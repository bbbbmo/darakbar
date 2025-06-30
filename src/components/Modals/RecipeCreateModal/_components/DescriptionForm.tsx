import { SubmitHandler, useForm } from "react-hook-form";
import type { DescriptionForm } from "../types/create-form.type";
import { Textarea } from "flowbite-react";
import FormItem from "../../../Form/FormItem";
import FormDescription from "../../../Form/FormDescription";
import { useEffect } from "react";
import { useRecipeCreateStore } from "../_stores/recipeCreateStore";

type DescriptionFormProps = {
  onNext: () => void;
  setSubmitHandler: (handler: () => void) => void;
};

export default function DescriptionForm({
  onNext,
  setSubmitHandler,
}: DescriptionFormProps) {
  const { register, handleSubmit } = useForm<DescriptionForm>();

  const { updateDescription } = useRecipeCreateStore();

  const onSubmit: SubmitHandler<DescriptionForm> = (data) => {
    console.log(data);
    updateDescription(data);
    onNext();
  };

  useEffect(() => {
    setSubmitHandler(() => handleSubmit(onSubmit));
  }, [handleSubmit]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormDescription>
          만들어진 나만의 칵테일 제조법과 전반적인 맛, 향을 설명해 주세요🤔
        </FormDescription>
        <div className="flex flex-col gap-2">
          <FormItem label="제조법" required>
            <Textarea
              placeholder="ex) 1. 라임과 레몬을 반으로 슬라이스 한다."
              {...register("instructions", {
                required: true,
                maxLength: { value: 200, message: "200자 이하로 입력해주세요" },
              })}
            />
          </FormItem>
          <FormItem label="맛과 향 설명">
            <Textarea
              placeholder="ex) 열대과일의 상큼한 맛과 오렌지 향"
              {...register("description", {
                required: true,
                maxLength: { value: 200, message: "200자 이하로 입력해주세요" },
              })}
            />
          </FormItem>
        </div>
      </form>
    </>
  );
}

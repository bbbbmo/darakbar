import { TextInput } from "flowbite-react";
import FormDescription from "../../../../../components/Form/FormDescription";
import { SubmitHandler, useForm } from "react-hook-form";
import type { BasicInfoForm } from "../types/create-form.type";
import FormItem from "../../../../../components/Form/FormItem";
import FormFileInput from "../../../../../components/Form/FormFileInput";
import { useEffect } from "react";
import { useRecipeCreateStore } from "../_stores/recipeCreateStore";

type BasicInfoFormProps = {
  onNext: () => void;
  setSubmitHandler: (handler: () => void) => void;
};

export default function BasicInfoForm({
  onNext,
  setSubmitHandler,
}: BasicInfoFormProps) {
  const { register, handleSubmit } = useForm<BasicInfoForm>();

  const { updateBasicInfo } = useRecipeCreateStore();

  const onSubmit: SubmitHandler<BasicInfoForm> = (data) => {
    updateBasicInfo(data);
    onNext();
  };

  useEffect(() => {
    setSubmitHandler(() => handleSubmit(onSubmit));
  }, [handleSubmit]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormDescription>
          나만의 칵테일의 이름과 사진을 올려주세요!
        </FormDescription>
        <div className="flex flex-col gap-2">
          {/* 칵테일 이름 입력 */}
          <FormItem label="나만의 칵테일 이름" required>
            <TextInput
              type="text"
              className="grow"
              placeholder="ex) 초코 바나나 펀치, 레인보우 샤베트 등"
              {...register("name", {
                required: true,
                maxLength: {
                  value: 15,
                  message: "필수 입력입니다.",
                },
              })}
            />
          </FormItem>

          {/* 칵테일 이미지 등록 */}
          <FormItem label="칵테일 이미지 등록" required>
            <FormFileInput />
          </FormItem>

          {/* 칵테일 잔 유형 입력 */}

          <FormItem label="잔 유형 (선택)">
            <TextInput
              type="text"
              className="grow"
              placeholder="ex) 허리케인 글라스, 칵테일 글라스 등"
              {...register("glassType")}
            />
          </FormItem>
        </div>
      </form>
    </>
  );
}

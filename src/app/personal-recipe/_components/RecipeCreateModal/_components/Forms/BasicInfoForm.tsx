import { TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import type { BasicInfoForm } from "../../RecipeCreateModal.schemes";
import FormItem from "@components/Forms/FormItem";
import FormFileInput from "@components/Forms/FormFileInput";
import { CreateRecipeForm } from "../../RecipeCreateModal.schemes";
import FormDescription from "@components/Forms/FormDescription";
import FormErrorMessage from "@components/Forms/FormErrorMessage";

// TODO: 칵테일 이미지 미리보기 추가
export default function BasicInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeForm>();

  return (
    <>
      <FormDescription>
        나만의 칵테일의 이름과 사진을 올려주세요!
      </FormDescription>
      <div className="flex flex-col gap-2">
        {/* 칵테일 이름 입력 */}
        <FormItem label="나만의 칵테일 이름" required>
          <TextInput
            type="text"
            placeholder="ex) 초코 바나나 펀치, 레인보우 샤베트 등"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          <FormErrorMessage error={errors.name} />
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
            aria-invalid={!!errors.glassType}
          />
          <FormErrorMessage error={errors.glassType} />
        </FormItem>
      </div>
    </>
  );
}

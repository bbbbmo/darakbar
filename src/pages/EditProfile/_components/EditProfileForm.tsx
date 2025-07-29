import { useForm } from "react-hook-form";
import { EditProfileFormData } from "./EditProfileForm.types";
import FormItem from "@/components/Forms/FormItem";
import { Button, HelperText, TextInput } from "flowbite-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import EditProfileCard from "./EditProfileCard";

export default function EditProfileForm() {
  //   const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { session } = useAuth();

  console.log(setIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>();

  const updateUserProfile = async () => {
    console.log("updateUserProfile");
  };
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(updateUserProfile)}
    >
      <EditProfileCard session={session} />

      <FormItem label="비밀번호 변경">
        <TextInput
          type="password"
          className="input-primary"
          placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
      </FormItem>
      {errors.password && (
        <HelperText className="font-medium">
          {errors.password.message}
        </HelperText>
      )}

      <FormItem label="비밀번호 재입력">
        <TextInput
          type="password"
          className="input-primary"
          placeholder="비밀번호 확인을 위해 재입력해주세요"
          {...register("confirmPassword", {
            required: "비밀번호 재입력을 입력해주세요",
          })}
        />
      </FormItem>
      {errors.confirmPassword && (
        <HelperText className="font-medium">
          {errors.confirmPassword.message}
        </HelperText>
      )}
      <div className="flex justify-end gap-3">
        <Button className="btn-primary">회원 탈퇴</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </form>
  );
}

import { useForm } from "react-hook-form";
import { EditProfileFormData } from "./EditProfileForm.types";
import FormItem from "@/components/Forms/FormItem";
import { Avatar, Button, HelperText, TextInput } from "flowbite-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function EditProfileForm() {
  //   const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { session, userName } = useAuth();

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
      <div className="flex flex-col gap-4">
        <Avatar
          src={session?.user.user_metadata.avatar_url}
          alt="User Profile"
          className="h-28 w-28 rounded-full bg-zinc-300"
        />
        <h3 className="text-2xl font-medium">{userName}</h3>
        {/* <TextInput
          type="text"
          placeholder="닉네임"
          {...register("name", {
            required: "닉네임을 입력해주세요",
          })}
        /> */}
        {errors.name && (
          <HelperText className="font-medium">{errors.name.message}</HelperText>
        )}
        <h5 className="text-md text-gray-500 dark:text-gray-400">
          {session?.user.user_metadata.email}
        </h5>
        {/* <TextInput type="email" placeholder="이메일" disabled /> */}
      </div>

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

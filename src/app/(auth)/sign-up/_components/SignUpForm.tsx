"use client";

import AppSnackBar from "@/components/SnackBar/SnackBar";
import { AppSnackBarColor } from "@/components/SnackBar/SnackBar.types";
import FormItem from "@components/Forms/FormItem";
import { Button, HelperText, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "./SignUpForm.types";
import supabase from "@lib/supabase/supabase";
import FormPasswordInput from "@components/Forms/FormPasswordInput";
import { useRouter } from "next/navigation";
import GoToButton from "@/components/Buttons/GoToButton";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpFormData>();

  const goSignInPage = () => {
    router.push("/sign-in");
    reset();
  };

  const signUpNewUser = async ({ name, email, password }: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name, // 사용자 이름 설정
          },
        },
      });
      if (signUpError) {
        throw signUpError;
      }
      goSignInPage();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(signUpNewUser)}
      >
        <FormItem label="닉네임" required>
          <TextInput
            {...register("name", { required: "닉네임을 입력해주세요" })}
            placeholder="다락바에서 활동할 이름을 정해주세요🍸"
          />
          {errors.name && (
            <HelperText className="font-medium">
              {errors.name.message}
            </HelperText>
          )}
        </FormItem>
        <FormItem label="이메일" required>
          <TextInput
            {...register("email", { required: "이메일을 입력해주세요" })}
            type="email"
            placeholder="example@naver.com"
            color={errors.email ? "failure" : "gray"}
          />
          {errors.email && (
            <HelperText className="font-medium">
              {errors.email.message}
            </HelperText>
          )}
        </FormItem>
        <FormPasswordInput register={register} errors={errors} watch={watch} />
        {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
        <Button theme={basicTheme.button} type="submit" disabled={isLoading}>
          {isLoading ? "가입중..." : "회원가입"}
        </Button>
        {error && (
          <AppSnackBar
            color={AppSnackBarColor.FAILURE}
            subject="회원가입 실패"
            message={error}
            position="bottom"
          />
        )}
      </form>
      <GoToButton text="회원이신가요?" onClick={goSignInPage} />
    </>
  );
}

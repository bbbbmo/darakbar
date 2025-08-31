"use client";

import FormItem from "@components/Forms/FormItem";
import { Button, HelperText, TextInput, ThemeProvider } from "flowbite-react";
import { SignInFormData } from "./SignInForm.types";
import { useForm } from "react-hook-form";
import supabase from "@lib/supabase/supabase";
import { useState } from "react";
import AppSnackBar from "@/components/SnackBar/SnackBar";
import { AppSnackBarColor } from "@/components/SnackBar/SnackBar.types";
import { buttonTheme } from "@lib/flowbite/themes/button.theme";
import { useRouter } from "next/navigation";
import GoToButton from "@/components/Buttons/GoToButton";

export default function SignForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goHomePage = () => {
    router.push("/home");
    reset();
  };

  const goSignUpPage = () => {
    router.push("/sign-up");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  const router = useRouter();

  const signInWithEmail = async ({ email, password }: SignInFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        throw signInError;
      }
      goHomePage();
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
        onSubmit={handleSubmit(signInWithEmail)}
      >
        <FormItem label="이메일">
          <TextInput
            color={errors.email ? "failure" : "gray"}
            type="email"
            placeholder="example@naver.com"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.email && (
            <HelperText className="font-medium">
              {errors.email.message}
            </HelperText>
          )}
        </FormItem>
        <FormItem label="비밀번호">
          <TextInput
            color={errors.password ? "failure" : "gray"}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <HelperText className="font-medium">
              {errors.password.message}
            </HelperText>
          )}
        </FormItem>
        <ThemeProvider theme={buttonTheme}>
          <Button theme={buttonTheme.button} type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </ThemeProvider>
        {error && (
          <AppSnackBar
            color={AppSnackBarColor.FAILURE}
            subject="로그인 실패"
            message={error}
          />
        )}
      </form>
      <GoToButton text="회원이 아니신가요?" onClick={goSignUpPage} />
    </>
  );
}

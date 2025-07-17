import FormItem from "@/components/Forms/FormItem";
import { Button, TextInput } from "flowbite-react";
import { SignInFormData } from "./SignIn.types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import supabase from "@/supabase";
import { useState } from "react";
import AppSnackBar from "@/components/App/AppSnackBar/AppSnackBar";
import { AppSnackBarColor } from "@/components/App/AppSnackBar/AppSnackBar.types";

export default function SignForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goHomePage = () => {
    navigate("/");
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  const navigate = useNavigate();

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
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(signInWithEmail)}
    >
      <FormItem label="이메일">
        <TextInput
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
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </FormItem>
      <FormItem label="비밀번호">
        <TextInput
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
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </FormItem>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "loading..." : "로그인"}
      </Button>
      {error && (
        <AppSnackBar
          color={AppSnackBarColor.FAILURE}
          subject="로그인 실패"
          message={error}
        />
      )}
    </form>
  );
}

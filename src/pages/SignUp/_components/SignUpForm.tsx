import AppSnackBar from "@/components/App/AppSnackBar/AppSnackBar";
import { AppSnackBarColor } from "@/components/App/AppSnackBar/AppSnackBar.types";
import FormItem from "@/components/Forms/FormItem";
import { Button, HelperText, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "./SignUpForm.types";
import supabase from "@/supabase/supabase";
import { useNavigate } from "react-router-dom";
import FormPasswordInput from "@/components/Forms/FormPasswordInput";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpFormData>();

  const goLoginPage = () => {
    navigate("/signin");
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
      goLoginPage();
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
      onSubmit={handleSubmit(signUpNewUser)}
    >
      <FormItem label="닉네임" required>
        <TextInput
          {...register("name", { required: "닉네임을 입력해주세요" })}
          placeholder="다락바에서 활동할 이름을 정해주세요🍸"
        />
        {errors.name && (
          <HelperText className="font-medium">{errors.name.message}</HelperText>
        )}
      </FormItem>
      <FormItem label="이메일" required>
        <TextInput
          {...register("email", { required: "이메일을 입력해주세요" })}
          type="email"
          placeholder="example@naver.com"
          color={errors.email ? "failure" : "default"}
        />
        {errors.email && (
          <HelperText className="font-medium">
            {errors.email.message}
          </HelperText>
        )}
      </FormItem>
      <FormPasswordInput register={register} errors={errors} watch={watch} />
      {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "가입중..." : "회원가입"}
      </Button>
      {error && (
        <AppSnackBar
          color={AppSnackBarColor.FAILURE}
          subject="회원가입 실패"
          message={error}
        />
      )}
    </form>
  );
}

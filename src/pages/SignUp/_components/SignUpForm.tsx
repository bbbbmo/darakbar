import AppSnackBar from "@/components/App/AppSnackBar/AppSnackBar";
import { AppSnackBarColor } from "@/components/App/AppSnackBar/AppSnackBar.types";
import FormItem from "@/components/Forms/FormItem";
import { Button, HelperText, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "./SignUpForm.types";
import supabase from "@/supabase/supabase";
import { useNavigate } from "react-router-dom";

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

  const password = watch("password");

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
      <FormItem label="비밀번호" required>
        <TextInput
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 10,
              message: "비밀번호는 10자 이상이어야 합니다.",
            },
          })}
          color={errors.password ? "failure" : "default"}
          type="password"
          placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
        />
        {errors.password && (
          <HelperText className="font-medium">
            {errors.password.message}
          </HelperText>
        )}
      </FormItem>
      {/* <select className="h-8 w-30 rounded-sm">
      <option value="">직접 입력</option>
      <option value="naver.com">naver.com</option>
      <option value="daum.com">daum.com</option>
      <option value="github.com">github.com</option>
      <option value="gmail.com">gmail.com</option>
    </select> */}
      <FormItem label="비밀번호 재입력" required>
        <TextInput
          {...register("confirmPassword", {
            required: "비밀번호 재입력을 입력해주세요",
            validate: (value) => {
              return value === password || "비밀번호가 일치하지 않습니다.";
            },
          })}
          color={errors.confirmPassword ? "failure" : "default"}
          type="password"
          placeholder="비밀번호 확인을 위해 재입력해주세요"
        />
        {errors.confirmPassword && (
          <HelperText className="font-medium">
            {errors.confirmPassword.message}
          </HelperText>
        )}
      </FormItem>
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

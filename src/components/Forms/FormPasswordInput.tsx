import { HelperText, TextInput } from "flowbite-react";
import FormItem from "./FormItem";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type FormPasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  required?: boolean;
};

export default function FormPasswordInput<T extends FieldValues>({
  register,
  errors,
  watch,
  required = true,
}: FormPasswordInputProps<T>) {
  const watchedPassword = watch("password" as Path<T>);

  return (
    <>
      <FormItem label="비밀번호">
        <TextInput
          type="password"
          className="input-primary"
          placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
          {...register("password" as Path<T>, {
            required: required ? "비밀번호를 입력해주세요" : false,
            minLength: {
              value: 10,
              message: "비밀번호는 10자 이상이어야 합니다.",
            },
          })}
          color={errors.password ? "failure" : "default"}
        />
        {errors.password && (
          <HelperText className="font-medium">
            {errors.password.message as string}
          </HelperText>
        )}
      </FormItem>

      <FormItem label="비밀번호 재입력">
        <TextInput
          type="password"
          className="input-primary"
          placeholder="비밀번호 확인을 위해 재입력해주세요"
          {...register("confirmPassword" as Path<T>, {
            required: required ? "비밀번호 재입력을 입력해주세요" : false,
            validate: (value) => {
              return (
                value === watchedPassword || "비밀번호가 일치하지 않습니다."
              );
            },
          })}
          color={errors.confirmPassword ? "failure" : "default"}
        />
        {errors.confirmPassword && (
          <HelperText className="font-medium">
            {errors.confirmPassword.message as string}
          </HelperText>
        )}
      </FormItem>
    </>
  );
}

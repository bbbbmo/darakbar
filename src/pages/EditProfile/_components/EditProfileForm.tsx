import { useForm } from "react-hook-form";
import { EditProfileFormData } from "./EditProfileForm.types";
import { Button } from "flowbite-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import EditProfileCard from "./EditProfileCard";
import FormPasswordInput from "@/components/Forms/FormPasswordInput";

export default function EditProfileForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { session } = useAuth();

  console.log(setIsLoading);

  const {
    register,
    handleSubmit,
    watch,
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
      <EditProfileCard
        session={session}
        register={register}
        watch={watch}
        errors={errors}
      />

      <FormPasswordInput register={register} errors={errors} watch={watch} />
      <div className="flex justify-end gap-3">
        <Button className="btn-primary">회원 탈퇴</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </form>
  );
}

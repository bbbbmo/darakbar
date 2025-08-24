import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import FormHeader from "@components/Forms/FormHeader";
import { Card } from "flowbite-react";
import EditProfileForm from "./_components/EditProfileForm";

// [TODO] 유저 프로필 이미지 기능 추가하기
export default function EditProfile() {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1); // 뒤로가기
  };
  return (
    <>
      <div className="wrapper mt-20 flex h-full w-full flex-col items-center justify-center">
        <Card className="bg-primary relative w-lg p-8">
          <ArrowLeftIcon
            className="absolute top-6 left-6 size-7 cursor-pointer fill-zinc-600"
            onClick={goToBack}
          />
          <FormHeader title="프로필 수정" />
          <EditProfileForm />
        </Card>
      </div>
    </>
  );
}

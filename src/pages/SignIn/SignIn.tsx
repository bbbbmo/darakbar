import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import SignForm from "./_components/SignForm";
import FormHeader from "@/components/Forms/FormHeader";

export default function SignIn() {
  const navigate = useNavigate();
  const goSignUpPage = () => {
    navigate("/signup");
  };
  return (
    <div className="wrapper flex w-full flex-col items-center">
      <img src="/images/logo/logo-whole.png" alt="logo" className="size-50" />
      <Card className="bg-primary w-lg p-8">
        <FormHeader title="로그인" />
        <SignForm />
        <div className="text-s ml-auto flex gap-2">
          <span
            className="flex cursor-pointer items-center gap-1 text-sm hover:text-amber-400"
            onClick={goSignUpPage}
          >
            회원이 아니신가요?
            <ArrowRightIcon className="size-4" />
          </span>
        </div>
      </Card>
    </div>
  );
}

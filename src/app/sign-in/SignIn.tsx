import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import SignForm from "./_components/SignInForm";
import FormHeader from "@/app/components/Forms/FormHeader";
import GoToButton from "@/app/components/Buttons/GoToButton";

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
        <GoToButton text="회원이 아니신가요?" onClick={goSignUpPage} />
      </Card>
    </div>
  );
}

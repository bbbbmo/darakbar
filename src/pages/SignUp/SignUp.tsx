import { useNavigate } from "react-router-dom";

import { Card } from "flowbite-react";
import SignUpForm from "./_components/SignUpForm";
import FormHeader from "@/components/Forms/FormHeader";
import GoToButton from "@/components/Buttons/GoToButton";

export default function SignUp() {
  const navigate = useNavigate();

  const goSignInPage = () => {
    navigate("/signin");
  };

  return (
    <div className="wrapper flex w-full flex-col items-center">
      <Card className="bg-primary w-lg p-8">
        <FormHeader title="회원가입" />
        <SignUpForm />
        <GoToButton text="회원이신가요?" onClick={goSignInPage} />
      </Card>
    </div>
  );
}

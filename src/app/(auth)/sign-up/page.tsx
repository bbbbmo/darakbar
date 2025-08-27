import { Card } from "flowbite-react";
import SignUpForm from "./_components/SignUpForm";
import FormHeader from "@components/Forms/FormHeader";

export default function SignUp() {
  return (
    <Card className="bg-primary w-lg p-8">
      <FormHeader title="회원가입" />
      <SignUpForm />
    </Card>
  );
}

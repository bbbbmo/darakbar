import { Card } from "flowbite-react";
import SignUpForm from "./_components/SignUpForm";
import FormHeader from "@components/Forms/FormHeader";
import BackButton from "@/components/Buttons/BackButton";

export default function SignUp() {
  return (
    <Card className="bg-primary relative w-lg p-8">
      <BackButton />
      <FormHeader title="회원가입" />
      <SignUpForm />
    </Card>
  );
}

import { Card } from "flowbite-react";
import SignForm from "./_components/SignInForm";
import FormHeader from "@components/Forms/FormHeader";
import BackButton from "@/components/Buttons/BackButton";

export default function SignIn() {
  return (
    <Card className="bg-primary relative w-lg p-8">
      <BackButton />
      <FormHeader title="로그인" />
      <SignForm />
    </Card>
  );
}

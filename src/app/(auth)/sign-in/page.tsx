import { Card } from "flowbite-react";
import SignForm from "./_components/SignInForm";
import FormHeader from "@components/Forms/FormHeader";

export default function SignIn() {
  return (
    <Card className="bg-primary w-lg p-8">
      <FormHeader title="로그인" />
      <SignForm />
    </Card>
  );
}

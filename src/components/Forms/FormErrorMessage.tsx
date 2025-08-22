import { HelperText } from "flowbite-react";
import { FieldError } from "react-hook-form";

type FormErrorMessageProps = {
  error: FieldError | undefined;
};

export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  return (
    error && <HelperText className="!font-medium">{error?.message}</HelperText>
  );
}

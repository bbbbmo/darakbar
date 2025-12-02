import { HelperText } from 'flowbite-react'
import { FieldError } from 'react-hook-form'

type FormErrorMessageProps = {
  error: FieldError | (FieldError | undefined)[] | undefined
}

export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  const message = Array.isArray(error)
    ? error.find((e) => e?.message)?.message
    : error?.message

  return message ? (
    <HelperText className="!font-medium">{message}</HelperText>
  ) : null
}

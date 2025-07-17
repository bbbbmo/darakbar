import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { AppSnackBarProps } from "./AppSnackBar.types";

export default function AppSnackBar({
  color,
  subject,
  message,
  icon,
}: AppSnackBarProps) {
  return (
    <Alert
      color={color ? color : "info"}
      icon={icon ? icon : HiInformationCircle}
    >
      <span className="font-medium">{subject}</span> {message}
    </Alert>
  );
}

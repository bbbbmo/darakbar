import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { AppSnackBarColor } from "./AppSnackBar.types";

export type AppSnackBarProps = {
  color?: AppSnackBarColor;
  subject: string;
  message: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  position?: "top" | "bottom";
};

export default function AppSnackBar({
  color,
  subject,
  message,
  icon,
  position,
}: AppSnackBarProps) {
  const positionClasses = {
    top: "top-4 left-1/2 transform -translate-x-1/2",
    bottom: "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  return (
    <Alert
      color={color ? color : "info"}
      icon={icon ? icon : HiInformationCircle}
      className={position ? `fixed z-50${positionClasses[position]}` : ""}
    >
      <span className="font-medium">{subject}</span> {message}
    </Alert>
  );
}

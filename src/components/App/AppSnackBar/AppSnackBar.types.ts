export enum AppSnackBarColor {
  FAILURE = "failure",
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
}

export type AppSnackBarProps = {
  color?: AppSnackBarColor;
  subject: string;
  message: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

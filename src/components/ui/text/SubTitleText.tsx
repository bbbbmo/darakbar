import clsx from "clsx";

export type SubTitleTextProps = {
  icon?: React.ReactNode;
  title: string;
  className?: string;
};

export default function SubTitleText({
  icon,
  title,
  className,
}: SubTitleTextProps) {
  return (
    <h3
      className={clsx(
        "flex items-center gap-2 text-xl font-semibold tracking-tight dark:text-white",
        className,
      )}
    >
      {icon}
      {title}
    </h3>
  );
}

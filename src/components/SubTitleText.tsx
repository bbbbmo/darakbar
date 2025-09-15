export type SubTitleTextProps = {
  icon?: React.ReactNode;
  title: string;
};

export default function SubTitleText({ icon, title }: SubTitleTextProps) {
  return (
    <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-tight dark:text-white">
      {icon}
      {title}
    </h3>
  );
}

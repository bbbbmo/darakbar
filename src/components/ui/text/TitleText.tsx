export type TitleTextProps = {
  icon?: React.ReactNode;
  title: string;
};

export default function TitleText({ icon, title }: TitleTextProps) {
  return (
    <h3 className="flex items-center gap-2 text-4xl font-semibold tracking-tight dark:text-white">
      {icon}
      {title}
    </h3>
  );
}

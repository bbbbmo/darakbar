import { Card } from "flowbite-react";
import BlurText from "../Reactbits/BlurText";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

type HeaderCardProps = {
  title: string;
  message: string;
  children?: React.ReactNode;
  className?: string;
};

export default function HeaderCard({
  title,
  message,
  children,
  className,
}: HeaderCardProps) {
  return (
    <Card theme={basicTheme.card} className={className}>
      <BlurText
        text={title}
        delay={150}
        animateBy="words"
        direction="top"
        className="mb-8 text-4xl font-bold tracking-tight text-gray-300 dark:text-white"
      />
      <p className="text-primary">
        <span>{message}</span>
        {children}
      </p>
    </Card>
  );
}

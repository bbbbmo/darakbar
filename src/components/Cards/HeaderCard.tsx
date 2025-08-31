import { cardTheme } from "@/lib/flowbite/themes/card.theme";
import { Card, ThemeProvider } from "flowbite-react";
import BlurText from "../Reactbits/BlurText";

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
    <ThemeProvider theme={cardTheme}>
      <Card theme={cardTheme.card} className={className}>
        <BlurText
          text={title}
          delay={150}
          animateBy="words"
          direction="top"
          className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
        />
        <p className="text-primary">
          <span>{message}</span>
          {children}
        </p>
      </Card>
    </ThemeProvider>
  );
}

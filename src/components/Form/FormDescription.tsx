type FormDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

export default function FormDescription({
  className,
  children,
}: FormDescriptionProps) {
  return (
    <p className={`mb-5 text-lg ${className}`}>
      <span>{children}</span>
    </p>
  );
}

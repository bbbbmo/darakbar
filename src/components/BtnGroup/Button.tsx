type ButtonProps = {
  show: boolean;
  text: string;
  children: React.ReactNode;
};

export default function Button({ show, text, children }: ButtonProps) {
  const toggleButton = () => {};
  return (
    <>
      {show && (
        <span
          className="btn-primary m in-w-20 flex cursor-pointer items-center justify-center"
          onClick={toggleButton}
        >
          {text}
          {children}
        </span>
      )}
    </>
  );
}

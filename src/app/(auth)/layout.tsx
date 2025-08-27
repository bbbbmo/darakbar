import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrapper flex w-full flex-col items-center">
      <Image src="/images/logo/logo-whole.png" alt="logo" className="size-50" />
      {children}
    </div>
  );
}

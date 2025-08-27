import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="wrapper flex w-full flex-col items-center">
      <Image
        src="/images/logo/logo-whole.png"
        alt="logo"
        width={200}
        height={200}
      />
      {children}
    </main>
  );
}

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        src="/images/logo/logo-whole.png"
        alt="logo"
        width={200}
        height={200}
        priority={true}
        className="h-auto w-auto"
      />
      {children}
    </main>
  );
}

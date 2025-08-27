export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-10 flex h-full flex-col justify-center gap-10">
      {children}
    </main>
  );
}
